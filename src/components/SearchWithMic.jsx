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

  const handleVoiceResult = (text) => {
      
    const lowerText = text.toLowerCase();

    console.log(lowerText);

    const match = lowerText.match(
/(?:i\s+)?(?:want|need|would\s+like|wanna)?\sto\s(next|student|upgrade|promote|add|create|upload|remove|update|get|view|register|edit|insert|new|admit|modify|show)\s+(?:a|an|the)?\s*(student|teacher|user|course|record|details|reports|students|report?)/i          );
          console.log(match);
    if (!match) {
      console.warn("No regex match. Trying fallback intent match...");
      return; // You can choose to skip or continue fallback here
    }

    const [, action, target] = match;
    const intent = `${action} ${target}`.toLowerCase();
    console.log(intent);
    // ✅ Step 2: Use keyword match from voiceCommandIntents
    for (const mainModule of voiceCommandIntents) {
      for (const subModule of mainModule.sub_modules) {
        const matched = subModule.keywords.find((keyword) =>
          intent.includes(keyword)
        );

        if (matched) {
          const matchedModuleUrl = subModule.url;
          const mainModuleKey = mainModule.module;

          navigate(matchedModuleUrl); 
          return;

        }
      }
    }

    console.warn("Intent matched but URL not found.");
  }
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
      />
    </>
  )
}
