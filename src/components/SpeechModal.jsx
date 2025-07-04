import { useEffect, useRef, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


export function SpeechModal({ open, onOpenChange, onResult }) {
  const [status, setStatus] = useState("idle") // idle | listening | error | result
  const [error, setError] = useState("")
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setStatus("error")
      setError("Your browser doesn't support speech recognition.")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setStatus("listening")
      setTranscript("")
      setError("")
    }

    recognition.onerror = (event) => {
      setStatus("error")
        if (event.error === "not-allowed") {
            setError("Please enable microphone permission in your browser settings.");
        } else if (event.error === "no-speech") {
            setError("No speech detected. Try again.");
            setStatus("result")
        } else {
            setError(`Error occurred: ${event.error}`);
        }
      
    }

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript
      setTranscript(result)
      setStatus("result")

      onResult(result) 
    }

    recognition.onend = () => {
      if (status === "listening") setStatus("idle")
    }

    return () => recognition.stop()
  }, [open])

  const handleStart = () => {
    try {
      recognitionRef.current && recognitionRef.current.start()
    } catch (err) {
      setStatus("error")
      setError("Unable to start recognition.")
    }
  }

  
  const handleRestart = () => {
    setTranscript("")
    setStatus("idle")
    handleStart()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} onResult={onResult}>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Voice Search</DialogTitle>
        </DialogHeader>
          <div >
            {transcript && status === "result" && (
          <div className="text-center  text-gray-800 mt-2 font-medium text-lg" >
             {transcript}
          </div>
        )}
          </div>
        <div className="flex justify-center py-6 ">
          
          <div className="w-48 h-48 rounded-full border-4 border-gray-300 flex items-center justify-center relative shadow-md">
            {status === "idle" && !error && (
              <button
                onClick={handleStart}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600 px-3 py-1"
              >
                Start
              </button>
            )}
            {status === "listening" && (
              <div className="flex flex-col items-center text-center">
                <div className="text-3xl animate-pulse mb-2">၊၊||၊</div>
                <div className="text-sm text-gray-600">Listening...</div>
              </div>
            )}
            
            {status === "result" && (
              
              <div className="flex justify-center items-center flex-col">
                  <p className="text-red-500">
                    {error==="No speech detected. Try again." &&(
                      <div>
                        No speech Detected.
                      </div>
                    )}
                  </p>
                <button
                onClick={handleRestart}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600 px-3 py-1"
              >
                Try Again
              </button>
              </div>
            )}
            {status === "error" && (
              <div className="text-center text-red-500 text-sm">{error}</div>
            )}
          </div>
        </div>

        
        
        

        
      </DialogContent>
    </Dialog>
  )
}
