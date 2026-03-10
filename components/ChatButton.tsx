"use client"

import { useState } from "react"
import ChatInterface from "./ChatInterface"
import Image from "next/image"

export default function ChatButton() {

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-lg z-50 hover:scale-110 transition"
      >
        <Image
          src="/AI_chatbox.png"
          alt="AI Chat"
          width={28}
          height={28}
        />
      </button>

      {/* CHAT BOX */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50">

          {/* HEADER */}
          <div className="flex justify-between items-center p-3 border-b bg-red-600 text-white rounded-t-xl">
            <span className="font-bold">AI Support</span>

            <button
              onClick={() => setOpen(false)}
              className="hover:scale-110"
            >
              ✖
            </button>
          </div>

          {/* CHAT */}
          <div className="flex-1">
            <ChatInterface />
          </div>

        </div>
      )}
    </>
  )
}