import { useState, useContext, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import { StudentContext } from "@/context/StudentContext";
import mockStudents from "@/data/Students";
import { Mic, Pencil } from "lucide-react"; // Pencil icon imported
import { useAuth } from "@/Context/AuthContext.jsx";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

// Helper function to parse more flexible number inputs
const parseNumberInput = (input) => {
  const trimmed = input.trim().toLowerCase();
  const wordToNumber = {
    one: 1,
    first: 1,
    two: 2,
    second: 2,
    do: 2,
    three: 3,
    third: 3,
    four: 4,
    fourth: 4,
    for: 4,
    five: 5,
    fifth: 5,
    six: 6,
    sixth: 6,
    seven: 7,
    seventh: 7,
    eight: 8,
    eighth: 8,
    nine: 9,
    ninth: 9,
    ten: 10,
    tenth: 10,
  };
  if (wordToNumber[trimmed]) return wordToNumber[trimmed];
  const match = trimmed.match(/\d+/);
  if (match) {
    const num = parseInt(match[0], 10);
    if (!isNaN(num)) return num;
  }
  return NaN;
};

// ✨ NEW: Mock function to fetch teacher subjects asynchronously
const fetchTeacherSubjects = () => {
  return new Promise((resolve) => {
    console.log("Fetching teacher subjects...");
    setTimeout(() => {
      const subjects = [
        "Mathematics",
        "Science",
        "History",
        "English",
        "Physics",
        "Chemistry",
      ];
      console.log("Fetched subjects:", subjects);
      resolve(subjects);
    }, 500); // Simulate a 0.5-second network delay
  });
};

const ChatPopup = () => {
  const { user, token, logout } = useAuth();
  const { addStudent } = useContext(StudentContext);
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formMode, setFormMode] = useState(null);
  const [selectMode, setSelectMode] = useState(false);
  const [studentMatches, setStudentMatches] = useState([]);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [awaitingActionConfirmation, setAwaitingActionConfirmation] =
    useState(null);
  const [pendingApiConfirmation, setPendingApiConfirmation] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingActionToConfirm, setPendingActionToConfirm] = useState(null);
  const [lastInputWasSpeech, setLastInputWasSpeech] = useState(false);

  const [reviewMode, setReviewMode] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState(null);

  // ✨ NEW: State for subject selection buttons
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const translateUserInput = async (text) => {
    if (!text || !text.trim() || i18n.language === "en") return text;
    const ollamaApiUrl = "http://localhost:11434/api/generate";
    const prompt = `You are an expert command translator for a software application. Your task is to translate user commands from Hindi to English. IMPORTANT: You must not translate proper nouns, especially people's names. Examples: "दिया वर्मा को ब्लॉक करो" -> "Block Diya Verma", "विकाश चाहर को जोड़ो" -> "Add Vikash Chahar", "आरव जोशी को संपादित करो" -> "Edit Aarav Joshi", "सान्वी शर्मा को प्रमोट करो" -> "Promote Saanvi Sharma", "अर्जुन पटेल के डिटेल्स दिखाओ" -> "Show details of Arjun Patel", "कृष्णा वर्मा की क्लास बदलो" -> "update field for Krishna Verma where field is class", "नए टीचर को जोड़ो" -> "Add new teacher". Provide ONLY the final English translation. Do not add any extra text or explanations. Translate the following command: "${text}"`;
    try {
      const res = await fetch(ollamaApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "qwen2:1.5b", prompt, stream: false }),
      });
      if (!res.ok) {
        console.error(
          `Ollama API error for hi-en translation:`,
          res.status,
          await res.text()
        );
        return text;
      }
      const data = await res.json();
      const cleanedResponse = data.response
        .trim()
        .replace(/^"|"$/g, "")
        .replace(/`/g, "");
      return cleanedResponse || text;
    } catch (err) {
      console.error(
        `Network error calling Ollama API for hi-en translation:`,
        err
      );
      setError(t("error_api_failed"));
      return text;
    }
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    const cleanedText = text
      .replace(/(\d+)️⃣/g, "Number $1.")
      .replace(/[\n*✅❌🚫✏️🚀🛑👤🇮🇳🇬🇧]/g, " ")
      .replace(/၊၊\|\|၊ Listening\.\.\./, "")
      .trim();
    if (cleanedText) {
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = i18n.language === "hi" ? "hi-IN" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const addAssistantMessage = (key, options = {}, forceSpeak = false) => {
    const finalContent = t(key, options);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: finalContent },
    ]);
    if (lastInputWasSpeech || forceSpeak) speakText(finalContent);
  };

  const getFormFieldsForRole = (role) => {
    const fields = ["name", "contact"];
    if (role === "student")
      fields.splice(1, 0, "fatherName", "className", "section", "rollNumber");
    if (role === "teacher") fields.splice(1, 0, "subject", "education");
    if (role === "admin") fields.splice(1, 0, "department");
    return fields.map((key) => ({ key, label: t(`form.${role}.${key}`) }));
  };

  const formatPersonDetails = (person) => {
    const displayableKeys = [
      "name",
      "fatherName",
      "contact",
      "className",
      "section",
      "rollNumber",
      "subject",
      "education",
      "department",
      "role",
    ];
    return Object.entries(person)
      .filter(([key, value]) => displayableKeys.includes(key) && value)
      .map(([key, value]) => `${t(`details_labels.${key}`)}: ${value}`)
      .join("\n");
  };

  const allStudents = mockStudents;
  const togglePopup = () => setIsOpen(!isOpen);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      addAssistantMessage("error_speech_unsupported");
      return;
    }
    setError("");
    setInput("");
    setMessages((prev) =>
      prev.filter(
        (msg) =>
          !msg.content.includes("Listening") &&
          !msg.content.includes("सुन रहा है")
      )
    );
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    const isInSpecificWorkflow =
      awaitingActionConfirmation ||
      pendingApiConfirmation ||
      formMode ||
      selectMode ||
      (pendingActionToConfirm &&
        pendingActionToConfirm.missingFields?.length > 0) ||
      reviewMode;
    recognitionRef.current.lang = isInSpecificWorkflow
      ? "en-US"
      : i18n.language === "hi"
      ? "hi-IN"
      : "en-US";
    recognitionRef.current.onstart = () => {
      setIsListening(true);
      addAssistantMessage("listening_indicator");
    };
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      recognitionRef.current.stop();
      processUserInput(transcript, { fromSpeech: true });
    };
    recognitionRef.current.onerror = (event) => {
      setIsListening(false);
      let errorKey = "error_speech_generic";
      if (event.error === "not-allowed") errorKey = "error_mic_permission";
      else if (event.error === "no-speech") errorKey = "error_no_speech";
      if (errorKey) addAssistantMessage(errorKey);
    };
    recognitionRef.current.onend = () => setIsListening(false);
    try {
      recognitionRef.current.start();
    } catch (e) {
      setIsListening(false);
      addAssistantMessage("error_listening_start");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setMessages((prev) =>
        prev.filter((msg) => !msg.content.includes(t("listening_indicator")))
      );
    }
  };

  // ✨ MODIFIED: Reset all modes including the new subject options state
  const resetAllModes = () => {
    stopListening();
    setLoading(false);
    setAwaitingActionConfirmation(null);
    setPendingApiConfirmation(null);
    setPendingActionToConfirm(null);
    setFormMode(null);
    setSelectMode(false);
    setStudentMatches([]);
    setPendingAction(null);
    setInput("");
    setError("");
    setReviewMode(false);
    setFieldToEdit(null);
    setSubjectOptions([]); // Clear subject buttons on any cancellation
  };

  const handleCancelAction = (options = {}) => {
    if (options.fromButtonClick) {
      setMessages((prev) => [...prev, { role: "user", content: t("cancel") }]);
    }
    resetAllModes();
    addAssistantMessage("action_cancelled", {}, options.fromSpeech);
  };

  const handleEditPreviousAnswerClick = (messageIndex = null) => {
    if (!pendingActionToConfirm) return;

    const { parameters, missingFields, totalSteps } = pendingActionToConfirm;
    const allFields = getFormFieldsForRole(parameters.role);

    const answeredFieldKeys = allFields
      .map((f) => f.key)
      .filter((key) => parameters[key] !== undefined);

    if (answeredFieldKeys.length === 0) return;

    let fieldKeyToEdit;

    if (messageIndex !== null) {
      const userMessages = messages
        .filter((m) => m.role === "user")
        .slice(-answeredFieldKeys.length);

      const userMessageIndex = messages
        .filter((m) => m.role === "user")
        .findIndex(
          (_, idx) =>
            messages.findIndex((msg) => msg === m && msg.role === "user") ===
            messageIndex
        );

      if (
        userMessageIndex >= 0 &&
        userMessageIndex < answeredFieldKeys.length
      ) {
        fieldKeyToEdit = answeredFieldKeys[userMessageIndex];
      } else {
        fieldKeyToEdit = answeredFieldKeys[answeredFieldKeys.length - 1];
      }
    } else {
      fieldKeyToEdit = answeredFieldKeys[answeredFieldKeys.length - 1];
    }

    const fieldToRewindTo = allFields.find((f) => f.key === fieldKeyToEdit);
    if (!fieldToRewindTo) return;

    const updatedParameters = { ...parameters };
    delete updatedParameters[fieldToRewindTo.key];

    const fieldIndex = answeredFieldKeys.indexOf(fieldKeyToEdit);
    const messagesToRemove = (answeredFieldKeys.length - fieldIndex) * 2;

    setMessages((prev) => prev.slice(0, -messagesToRemove));

    const currentMissingFields = missingFields || [];
    const fieldsToReAdd = allFields.filter((f) =>
      answeredFieldKeys.slice(fieldIndex).includes(f.key)
    );

    setSubjectOptions([]); // Clear subject buttons when editing

    setPendingActionToConfirm((prev) => ({
      ...prev,
      parameters: updatedParameters,
      missingFields: fieldsToReAdd.concat(currentMissingFields),
    }));

    const stepNumber = fieldIndex + 1;
    addAssistantMessage("form.step_label", {
      current: stepNumber,
      total: totalSteps,
      label: fieldToRewindTo.label,
    });
  };

  const enterReviewMode = async (parameters, wasSpeechInput) => {
    setReviewMode(true);
    setFieldToEdit(null);
    setAwaitingActionConfirmation(false);
    setFormMode(null);
    setPendingActionToConfirm((prev) => ({ ...prev, parameters }));
    const details = formatPersonDetails(parameters);
    addAssistantMessage(
      "form.review_details_prompt",
      { details },
      wasSpeechInput
    );
  };

  const handleEditDetailsClick = () => {
    setFieldToEdit("selecting");
    addAssistantMessage("form.which_field_to_edit", {});
  };

  const handleFieldSelectToEdit = (fieldKey) => {
    const { role } = pendingActionToConfirm.parameters;
    const allFieldsForRole = getFormFieldsForRole(role);
    const fieldToEditInfo = allFieldsForRole.find((f) => f.key === fieldKey);
    if (fieldToEditInfo) {
      setFieldToEdit(fieldKey);
      addAssistantMessage("form.step_label", {
        current: "✏️",
        total: "Edit",
        label: fieldToEditInfo.label,
      });
    }
  };

  const handleProceedClick = async () => {
    const text = t("proceed_button");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    await processActionConfirmation("yes");
  };

  const updatePersonField = async (confirmationData) => {
    const { person, fieldToEdit, newValue } = confirmationData;
    const studentIndex = allStudents.findIndex((s) => s.id === person.id);
    if (studentIndex > -1) {
      allStudents[studentIndex][fieldToEdit] = newValue;
      addAssistantMessage("action_results.edited", {
        name: person.name,
        field: t(`details_labels.${fieldToEdit}`).toLowerCase(),
        value: newValue,
      });
    } else {
      addAssistantMessage("error_no_person_found", { name: person.name });
    }
    resetAllModes();
  };

  const processActionConfirmation = async (response) => {
    setAwaitingActionConfirmation(null);
    setReviewMode(false);
    if (response === "yes" && pendingActionToConfirm) {
      const { action } = pendingActionToConfirm;
      if (action === "add_person") {
        await addPerson(pendingActionToConfirm.parameters);
      } else if (action === "update_person_field") {
        await updatePersonField(pendingActionToConfirm);
      } else {
        await processPersonAction(action, pendingActionToConfirm.parameters);
      }
      setPendingActionToConfirm(null);
    } else {
      handleCancelAction();
    }
  };

  const handleConfirmedPersonAction = async (action, person) => {
    if (
      typeof action === "object" &&
      action?.action === "update_person_field"
    ) {
      setPendingActionToConfirm({
        action: action.action,
        person,
        fieldToEdit: action.fieldToEdit,
        newValue: action.newValue,
      });
      setAwaitingActionConfirmation(true);
      addAssistantMessage("confirm_update_prompt", {
        name: person.name,
        field: t(`details_labels.${action.fieldToEdit}`).toLowerCase(),
        value: action.newValue,
      });
    } else if (action === "get_person_details") {
      addAssistantMessage("action_results.details_here", {
        details: formatPersonDetails(person),
      });
      resetAllModes();
    } else if (action === "edit_person") {
      addAssistantMessage("action_results.edited_with_details", {
        details: formatPersonDetails(person),
      });
      resetAllModes();
    } else {
      const actionKey =
        typeof action === "string" ? action.replace("_person", "") : "";
      if (["block", "promote"].includes(actionKey)) {
        addAssistantMessage(`action_results.${actionKey}ed`, {
          details: formatPersonDetails(person),
        });
      } else {
        addAssistantMessage("error_unknown_action", { action: actionKey });
      }
      resetAllModes();
    }
  };

  const handleApiConfirmation = async (response) => {
    const originalQuery = pendingApiConfirmation;
    setPendingApiConfirmation(null);
    if (response === "yes") {
      await sendQueryToApi(originalQuery);
    } else {
      resetAllModes();
    }
  };

  const handleSend = async () => {
    const userInput = input.trim();
    if (userInput) {
      await processUserInput(userInput);
    }
  };

  const handleSelectionClick = (index) => {
    const selectionText = t("selected_option_user_message", {
      option: index + 1,
    });
    setMessages((prev) => [...prev, { role: "user", content: selectionText }]);
    processUserInput(String(index + 1), { fromButtonClick: true });
  };

  const handleActionSelect = (selectedAction) => {
    if (pendingActionToConfirm) {
      const { parameters } = pendingActionToConfirm;
      setFormMode("select_role");
      const actionName = t(
        `action_buttons.${selectedAction.split("_")[0]}`
      ).toLowerCase();
      setPendingActionToConfirm({
        ...pendingActionToConfirm,
        action: selectedAction,
        missingFields: [{ key: "role", label: "Role?" }],
      });
      addAssistantMessage("clarify_role_prompt", {
        action: actionName,
        name: parameters.name,
      });
    }
  };

  const handleYesClick = async () => {
    const text = i18n.language === "hi" ? "हाँ" : "Yes";
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    await processUserInput(text, {
      fromSpeech: lastInputWasSpeech,
      fromButtonClick: true,
    });
  };

  const handleNoClick = async () => {
    const text = i18n.language === "hi" ? "नहीं" : "No";
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    await processUserInput(text, {
      fromSpeech: lastInputWasSpeech,
      fromButtonClick: true,
    });
  };

  const handleCancelClick = () => {
    handleCancelAction({ fromButtonClick: true });
  };

  // ✨ NEW: Handler for subject button clicks
  const handleSubjectSelect = async (subject) => {
    setMessages((prev) => [...prev, { role: "user", content: subject }]);
    // Process the selected subject as if the user typed it
    await processUserInput(subject, { fromButtonClick: true });
  };

  // ✨ MODIFIED: handleRoleSelect now checks if the first question is for a teacher's subject
  const handleRoleSelect = async (role) => {
    if (pendingActionToConfirm) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: t(`role_buttons.${role}`) },
      ]);
      const { action } = pendingActionToConfirm;
      let updatedParameters = { ...pendingActionToConfirm.parameters, role };
      if (
        [
          "block_person",
          "edit_person",
          "promote_person",
          "get_person_details",
        ].includes(action)
      ) {
        setFormMode(null);
        setPendingActionToConfirm(null);
        await processPersonAction(action, updatedParameters);
        return;
      }
      let fields = getFormFieldsForRole(role);
      const requiredFields = fields.filter((f) => !updatedParameters[f.key]);
      setPendingActionToConfirm({
        ...pendingActionToConfirm,
        parameters: updatedParameters,
        missingFields: requiredFields,
        totalSteps: requiredFields.length,
      });
      setFormMode(null);
      if (requiredFields.length > 0) {
        const firstField = requiredFields[0];
        addAssistantMessage("form.step_label", {
          current: 1,
          total: requiredFields.length,
          label: firstField.label,
        });

        // If the very first question is about the subject, fetch options.
        if (role === "teacher" && firstField.key === "subject") {
          setLoading(true);
          const subjects = await fetchTeacherSubjects();
          setSubjectOptions(subjects);
          setLoading(false);
        }
      } else {
        await enterReviewMode(updatedParameters);
      }
      setLoading(false);
    }
  };

  const addPerson = (parameters) => {
    let { className, section, ...rest } = parameters;
    if (className) {
      const match = className.match(/\d+/);
      if (match) className = match[0];
    }
    if (section) {
      section = section.split(" ")[0];
    }
    const sanitizedParams = { ...rest, className, section };
    addStudent(sanitizedParams);
    addAssistantMessage(`form.add_${sanitizedParams.role}_success`, {
      details: formatPersonDetails(sanitizedParams),
    });
    speakText(
      t(`form.add_${sanitizedParams.role}_success`, {
        details: formatPersonDetails(sanitizedParams),
      })
    );
    setLoading(false);
  };

  const processPersonAction = async (action, parameters) => {
    const { name, role } = parameters;
    const fuse = new Fuse(allStudents, { keys: ["name"], threshold: 0.3 });
    const nameMatches = name
      ? fuse.search(name).map((result) => result.item)
      : [...allStudents];
    if (nameMatches.length === 0) {
      addAssistantMessage("error_no_person_found", { name });
      setLoading(false);
      return;
    }
    let matches = nameMatches;
    if (role) {
      matches = nameMatches.filter(
        (s) => (s.role || "").toLowerCase() === role.toLowerCase()
      );
    }
    const uniqueRoles = [
      ...new Set(matches.map((p) => p.role).filter(Boolean)),
    ];
    if (matches.length > 1 && uniqueRoles.length > 1 && !role) {
      addAssistantMessage("multiple_roles_found", { name });
      setPendingActionToConfirm({
        action,
        parameters,
        missingFields: [{ key: "role", label: "Role?" }],
      });
      setFormMode("select_role");
      setLoading(false);
      return;
    }
    if (matches.length === 0) {
      addAssistantMessage("error_no_person_found", { name });
    } else if (matches.length === 1) {
      await handleConfirmedPersonAction(action, matches[0]);
    } else {
      setSelectMode(true);
      setStudentMatches(matches);
      setPendingAction(action);
      addAssistantMessage("multiple_matches_found");
    }
    setLoading(false);
  };

  const processFieldUpdate = async (parameters) => {
    const { name, fieldToEdit, newValue } = parameters;
    if (!name || !fieldToEdit || !newValue) {
      addAssistantMessage("error_missing_update_details");
      setLoading(false);
      return;
    }
    const fuse = new Fuse(allStudents, { keys: ["name"], threshold: 0.3 });
    const matches = fuse.search(name).map((r) => r.item);
    if (matches.length === 0) {
      addAssistantMessage("error_no_person_found", { name });
    } else if (matches.length === 1) {
      await handleConfirmedPersonAction(
        { action: "update_person_field", fieldToEdit, newValue },
        matches[0]
      );
    } else {
      setSelectMode(true);
      setStudentMatches(matches);
      setPendingAction({
        action: "update_person_field",
        fieldToEdit,
        newValue,
      });
      addAssistantMessage("multiple_matches_found");
    }
    setLoading(false);
  };

  const sendQueryToApi = async (query) => {
    if (!token) {
      addAssistantMessage("error_auth_failed");
      logout();
      return;
    }
    try {
      const res = await fetch("http://localhost:5005/api/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: query }),
      });
      if (res.status === 401) {
        addAssistantMessage("error_session_expired");
        logout();
        return;
      }
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const parsed = await res.json();
      console.log(parsed);
      const { action, parameters } = parsed;
      if (action === "update_person_field") {
        await processFieldUpdate(parameters);
        return;
      }
      if (action === "clarify_action") {
        addAssistantMessage("clarify_action_prompt", { name: parameters.name });
        setPendingActionToConfirm({ action, parameters, missingFields: [] });
        setFormMode("select_action");
        setLoading(false);
        return;
      }
      if (
        [
          "add_person",
          "block_person",
          "edit_person",
          "promote_person",
          "get_person_details",
        ].includes(action)
      ) {
        if (action !== "add_person" && parameters.name) {
          await processPersonAction(action, parameters);
          return;
        }
        let requiredFields = [];
        if (action === "add_person") {
          if (!parameters.role) {
            const key = parameters.name
              ? "add_person_clarify_role_prompt"
              : "add_person_clarify_role_prompt_no_name";
            addAssistantMessage(key, { name: parameters.name || "" });
            setPendingActionToConfirm({
              action,
              parameters,
              missingFields: [{ key: "role", label: "Role?" }],
            });
            setFormMode("select_role");
            setLoading(false);
            return;
          }
          let fields = getFormFieldsForRole(parameters.role);
          requiredFields = fields.filter((f) => !parameters[f.key]);
        } else {
          if (!parameters.name) {
            requiredFields = [
              {
                key: "name",
                label: t("form.name_for_role", { role: parameters.role }),
              },
              ...requiredFields,
            ];
          }
        }
        if (requiredFields.length > 0) {
          setPendingActionToConfirm({
            action,
            parameters,
            missingFields: requiredFields,
            totalSteps: requiredFields.length,
          });
          addAssistantMessage("form.step_label", {
            current: 1,
            total: requiredFields.length,
            label: requiredFields[0].label,
          });
          setLoading(false);
          return;
        }
      }
      setPendingActionToConfirm({ action, parameters, missingFields: [] });
      await enterReviewMode(parameters);
    } catch (err) {
      console.error("Local API Error:", err);
      addAssistantMessage("error_api_failed");
    } finally {
      setLoading(false);
    }
  };

  // ✨ MODIFIED: The main processUserInput function now contains the core logic for fetching and clearing subject options during form filling.
  const processUserInput = async (userInput, options = {}) => {
    window.speechSynthesis.cancel();
    const wasSpeechInput = !!options.fromSpeech;
    setLastInputWasSpeech(wasSpeechInput);
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;
    if (!options.fromButtonClick) {
      setMessages((prev) => [...prev, { role: "user", content: trimmedInput }]);
    }
    setInput("");
    setLoading(true);

    if (reviewMode) {
      if (fieldToEdit && fieldToEdit !== "selecting") {
        const updatedParameters = {
          ...pendingActionToConfirm.parameters,
          [fieldToEdit]: trimmedInput,
        };
        await enterReviewMode(updatedParameters, wasSpeechInput);
        setLoading(false);
        return;
      }
      addAssistantMessage("error_invalid_review_option", {}, wasSpeechInput);
      setLoading(false);
      return;
    }

    const lowerTrimmedInput = trimmedInput.toLowerCase();
    const firstWord = lowerTrimmedInput.split(" ")[0];
    const positiveResponses = [
      t("yes").toLowerCase(),
      "yes",
      "haan",
      "yeah",
      "yep",
      "han",
    ];
    const negativeResponses = [
      t("no").toLowerCase(),
      "no",
      "nahin",
      "na",
      "nope",
    ];

    if (pendingApiConfirmation) {
      if (positiveResponses.includes(firstWord))
        await handleApiConfirmation("yes");
      else if (negativeResponses.includes(firstWord))
        await handleApiConfirmation("no");
      else {
        addAssistantMessage("error_invalid_yes_no");
        setLoading(false);
      }
      return;
    }

    if (awaitingActionConfirmation) {
      if (positiveResponses.includes(firstWord))
        await processActionConfirmation("yes");
      else if (negativeResponses.includes(firstWord))
        await processActionConfirmation("no");
      else {
        addAssistantMessage("error_invalid_yes_no");
        setLoading(false);
      }
      return;
    }

    let processedInput = trimmedInput;
    const isFormFill =
      pendingActionToConfirm &&
      pendingActionToConfirm.missingFields?.length > 0;
    if (
      i18n.language === "hi" &&
      trimmedInput &&
      !isFormFill &&
      formMode === null &&
      !selectMode
    ) {
      processedInput = await translateUserInput(trimmedInput);
    }

    if (processedInput.toLowerCase().split(" ")[0] === "cancel") {
      await handleCancelAction({ fromSpeech: wasSpeechInput });
      return;
    }

    if (selectMode) {
      const selectedNumber = parseNumberInput(processedInput);
      const selectedIndex = selectedNumber - 1;
      if (
        isNaN(selectedNumber) ||
        selectedIndex < 0 ||
        selectedIndex >= studentMatches.length
      ) {
        addAssistantMessage("error_invalid_selection", {}, wasSpeechInput);
        setLoading(false);
        return;
      }
      const person = studentMatches[selectedIndex];
      const action = pendingAction;
      setSelectMode(false);
      setStudentMatches([]);
      setPendingAction(null);
      await handleConfirmedPersonAction(action, person);
      return;
    }

    if (formMode === "select_role") {
      const role = processedInput.toLowerCase();
      if (!["student", "teacher", "admin"].includes(role)) {
        addAssistantMessage("error_invalid_role", {}, wasSpeechInput);
        setLoading(false);
        return;
      }
      if (pendingActionToConfirm) {
        await handleRoleSelect(role);
        return;
      }
    }

    if (isFormFill) {
      const nextField = pendingActionToConfirm.missingFields[0];
      const remainingFields = pendingActionToConfirm.missingFields.slice(1);
      const totalSteps = pendingActionToConfirm.totalSteps;
      const completedStepNumber = totalSteps - remainingFields.length;

      const updatedParameters = {
        ...pendingActionToConfirm.parameters,
        [nextField.key]: trimmedInput,
      };

      setPendingActionToConfirm({
        ...pendingActionToConfirm,
        parameters: updatedParameters,
        missingFields: remainingFields,
      });

      // Since a value was provided, clear any existing subject options
      setSubjectOptions([]);

      if (remainingFields.length > 0) {
        const nextFieldToAsk = remainingFields[0];
        addAssistantMessage(
          "form.step_label",
          {
            current: completedStepNumber + 1,
            total: totalSteps,
            label: nextFieldToAsk.label,
          },
          wasSpeechInput
        );

        // After asking the next question, check if it's for a teacher's subject
        const role = updatedParameters.role;
        if (role === "teacher" && nextFieldToAsk.key === "subject") {
          const subjects = await fetchTeacherSubjects();
          setSubjectOptions(subjects);
        }
      } else {
        await enterReviewMode(updatedParameters, wasSpeechInput);
      }
      setLoading(false);
      return;
    }

    setPendingApiConfirmation(processedInput);
    addAssistantMessage("confirm_prompt", { query: trimmedInput });
    if (wasSpeechInput) speakText(t("confirm_prompt", { query: trimmedInput }));
    setLoading(false);
  };

  const isActionInProgress =
    awaitingActionConfirmation ||
    pendingApiConfirmation ||
    formMode ||
    selectMode ||
    reviewMode ||
    (pendingActionToConfirm &&
      pendingActionToConfirm.missingFields?.length > 0);

  return (
    <>
      <button
        onClick={togglePopup}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        💬
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-110 h-[460px] bg-white shadow-2xl rounded-lg border flex flex-col z-50">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
            <span className="font-bold">{t("title")}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")
                }
                className="border-2 border-white rounded px-2 py-0.5 text-sm"
              >
                {i18n.language === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
              </button>
              <button onClick={togglePopup} className="text-white font-bold">
                {t("close")}
              </button>
            </div>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-2"
          >
            {messages
              .filter((m) => m.role !== "system")
              .map((m, i) => {
                const isFormActive =
                  pendingActionToConfirm &&
                  pendingActionToConfirm.parameters?.role &&
                  pendingActionToConfirm.missingFields;

                const stepLabelTemplate = t("form.step_label");
                const stepPrefix = stepLabelTemplate.split("{{")[0];

                const isNextMessageAFormStep =
                  messages[i + 1]?.role === "assistant" &&
                  messages[i + 1]?.content.startsWith(stepPrefix) &&
                  stepPrefix.trim() !== "";

                const isLastUserMessageInFormFill =
                  m.role === "user" && isFormActive && isNextMessageAFormStep;

                const isCurrentFormStep =
                  isFormActive &&
                  i === messages.length - 1 &&
                  m.role === "user";

                const isPreviousFormStep =
                  isFormActive &&
                  i === messages.length - 3 &&
                  m.role === "user" &&
                  messages[messages.length - 2]?.role === "assistant";

                const shouldShowEditButton =
                  isLastUserMessageInFormFill ||
                  isCurrentFormStep ||
                  isPreviousFormStep;

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {shouldShowEditButton && m.role === "user" && (
                      <button
                        onClick={() => handleEditPreviousAnswerClick(i)}
                        title={t("edit_previous_answer_tooltip")}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                    )}
                    <div
                      className={`p-2 rounded-md whitespace-pre-wrap ${
                        m.role === "user" ? "bg-gray-200" : "bg-blue-100"
                      }`}
                      style={{ maxWidth: "90%" }}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
            {loading && <p className="text-sm text-gray-500">{t("typing")}</p>}

            {/* ✨ NEW: Render subject selection buttons */}
            {subjectOptions.length > 0 && !loading && (
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {subjectOptions.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectSelect(subject)}
                    className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 text-sm"
                  >
                    {subject}
                  </button>
                ))}
              </div>
            )}

            {selectMode && !loading && (
              <div className="space-y-2 self-start mr-auto w-full">
                {studentMatches.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectionClick(i)}
                    className="w-full text-left bg-blue-100 hover:bg-blue-200 p-2 rounded-md text-sm whitespace-pre-wrap"
                  >
                    {`${i + 1}️⃣ ${t(`person_summary.${s.role || "other"}`, {
                      ...s,
                    })}`}
                  </button>
                ))}
              </div>
            )}

            {(awaitingActionConfirmation || pendingApiConfirmation) &&
              !reviewMode && (
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={handleYesClick}
                    className="bg-green-500 text-white px-2 py-0.5 rounded-md hover:bg-green-600"
                  >
                    {t("yes")}
                  </button>
                  <button
                    onClick={handleNoClick}
                    className="bg-red-500 text-white px-2 py-0.5 rounded-md hover:bg-red-600"
                  >
                    {t("no")}
                  </button>
                </div>
              )}

            {reviewMode && !loading && (
              <>
                {fieldToEdit === "selecting" && (
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {getFormFieldsForRole(
                      pendingActionToConfirm.parameters.role
                    ).map((field) => (
                      <button
                        key={field.key}
                        onClick={() => handleFieldSelectToEdit(field.key)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                      >
                        {t(`details_labels.${field.key}`)}
                      </button>
                    ))}
                  </div>
                )}
                {!fieldToEdit && (
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={handleProceedClick}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      {t("proceed_button")}
                    </button>
                    <button
                      onClick={handleEditDetailsClick}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      {t("edit_button")}
                    </button>
                  </div>
                )}
              </>
            )}

            {formMode === "select_action" && !loading && (
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {[
                  "get_person_details",
                  "add_person",
                  "edit_person",
                  "block_person",
                  "promote_person",
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleActionSelect(action)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  >
                    {t(`action_buttons.${action.split("_")[0]}`)}
                  </button>
                ))}
              </div>
            )}

            {formMode === "select_role" && !loading && (
              <div className="flex justify-center space-x-2 mt-2">
                {["student", "teacher", "admin"].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    {t(`role_buttons.${role}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-2 border-t flex gap-1 items-center">
            <input
              type="text"
              className="flex-1 border px-2 py-1 rounded text-sm"
              placeholder={t(
                isActionInProgress
                  ? "placeholder_action"
                  : isListening
                  ? "placeholder_listening"
                  : "placeholder_default"
              )}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isListening || loading}
            />

            {pendingActionToConfirm &&
              pendingActionToConfirm.missingFields?.length > 0 &&
              Object.keys(pendingActionToConfirm.parameters).length > 1 && (
                <button
                  onClick={() => handleEditPreviousAnswerClick()}
                  className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 flex items-center gap-1"
                  title={t("edit_last_answer_tooltip")}
                >
                  <Pencil size={12} />
                  {t("edit_last")}
                </button>
              )}

            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-full ${
                isListening ? "bg-red-500 animate-pulse" : "bg-gray-200"
              }`}
              title={
                isListening
                  ? t("stop_listening_tooltip")
                  : t("start_listening_tooltip")
              }
            >
              <Mic className="h-5 w-5 text-gray-800" />
            </button>

            {isActionInProgress && !loading && (
              <button
                onClick={handleCancelClick}
                className="bg-yellow-500 text-white px-1 py-1 rounded hover:bg-yellow-600"
                title={t("cancel_tooltip")}
              >
                {t("cancel")}
              </button>
            )}

            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              disabled={isListening || loading || !input.trim()}
            >
              {t("send")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPopup;
