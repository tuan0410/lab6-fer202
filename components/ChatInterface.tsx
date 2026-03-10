"use client"

import { useState, useRef, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

type Message = {
  role: "user" | "ai"
  content: string
}

export default function ChatInterface() {

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // load chat history
  useEffect(() => {

    const loadMessages = async () => {

      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })

      if (data) {
        setMessages(
          data.map((m: any) => ({
            role: m.sender_type,
            content: m.content
          }))
        )
      }

    }

    loadMessages()

  }, [])

  const sendMessage = async () => {

    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input
    }

    setMessages(prev => [...prev, userMessage])

    // lưu tin nhắn user
    await supabase.from("messages").insert({
      content: input,
      sender_type: "user"
    })

    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    })

    const data = await res.json()

    const aiMessage: Message = {
      role: "ai",
      content: data.reply
    }

    setMessages(prev => [...prev, aiMessage])

    // lưu tin nhắn AI
    await supabase.from("messages").insert({
      content: data.reply,
      sender_type: "ai"
    })

    setLoading(false)

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto border rounded-xl shadow-lg flex flex-col h-[500px] bg-white">

      {/* Header */}
      <div className="p-3 border-b font-semibold bg-red-600 text-white rounded-t-xl">
        MU AI Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >

            <div
              className={`px-3 py-2 rounded-lg max-w-[70%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>

          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500">
            AI is typing...
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">

        <input
          type="text"
          placeholder="Ask about MU products..."
          className="flex-1 border rounded-lg px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={sendMessage}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>
  )
}