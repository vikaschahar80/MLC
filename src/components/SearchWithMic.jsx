import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { SpeechModal } from "./SpeechModal"
import { Mic } from "lucide-react"
import { voiceCommandIntents } from "@/data/voiceCommandIntents"
import { useNavigate } from "react-router-dom"

import { sidebarData } from "@/components/app-sidebar"; 

export function SearchWithMic() {
  const [micOpen, setMicOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const navigate = useNavigate()
  const [newtext,setnewText] = useState(searchText);
  const [unintent,setIntent] = useState("");

const handleVoiceResult = async (text) => {
  const lowerText = text.toLowerCase();
    setIntent("");
  try {
    const res = await fetch(`https://api.wit.ai/message?v=20240706&q=${encodeURIComponent(lowerText)}`, {
      headers: {
        Authorization: `Bearer Enter Your server Token`,
      }
    });

    const data = await res.json();
    const intent = data.intents?.[0]?.name || "unknown";
    console.log("Detected intent:", intent);
    if(intent==="unknown"){
      setIntent("Didn't understand that.")
      return;
    }
    

    // Match with voiceCommandIntents
    for (const mainModule of voiceCommandIntents) {
      for (const subModule of mainModule.sub_modules) {
        const matched = subModule.keywords.find((keyword) =>
          intent.includes(keyword)
        );

        if (matched) {
          navigate(subModule.url);
          return;
        }
      }
    }

    console.warn("Url Not found for this Intent ");
  } catch (error) {
    console.error("API error:", error);
  }
};

  useEffect(() => {
  if (newtext.trim() !== "") {
    console.log("handle function called");
    handleVoiceResult(newtext);
  }
  else{

    console.log("function not called")
  }
}, [newtext]);
  

  return (
    <>
      <div className="relative w-full flex items-center">
        <Input
          type="text"
          placeholder="Search in sidebar..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pr-10"
        />
        <Mic
          className="absolute right-2 h-5 w-5 text-gray-600 cursor-pointer"
          onClick={() => setMicOpen(true)}
        />
      </div>

      <SpeechModal
        open={micOpen}
        onOpenChange={setMicOpen}
        onResult={(text)=>setnewText(text)}
        unintent = {unintent}
        
      />
    </>
  )
}
