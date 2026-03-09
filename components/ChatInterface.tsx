"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatInterface({ user }) {

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  // load chat history
  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at")

    setMessages(data || [])
  }

  // realtime listener
  useEffect(() => {

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages"
        },
        (payload) => {
          if (payload.new.user_id === user.id) {
            setMessages((prev) => [...prev, payload.new])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  // AI response logic
  function generateAIResponse(message) {

    const msg = message.toLowerCase()

    if (msg.includes("iphone")) {
      return "We have iPhone 15. Price: $999."
    }

    if (msg.includes("laptop")) {
      return "We have MacBook and Dell laptops available."
    }

    if (msg.includes("price")) {
      return "You can check the price on the product page."
    }

    return "I can help you with product information."
  }

  async function sendMessage() {

    if (!input) return

    const userMessage = input

    setInput("")

    await supabase.from("messages").insert({
      user_id: user.id,
      content: userMessage,
      sender_type: "user"
    })

    // simulate AI typing
    setLoading(true)

    setTimeout(async () => {

      const aiResponse = generateAIResponse(userMessage)

      await supabase.from("messages").insert({
        user_id: user.id,
        content: aiResponse,
        sender_type: "ai"
      })

      setLoading(false)

    }, 1500)

  }

  return (

    <div className="w-full max-w-md mx-auto border rounded p-4">

      <h2 className="text-xl font-bold mb-4">
        AI Support Chat
      </h2>

      <div className="h-80 overflow-y-auto space-y-2 mb-4">

        {messages.map((msg) => (

          <div
            key={msg.id}
            className={
              msg.sender_type === "user"
                ? "text-right"
                : "text-left"
            }
          >

            <span
              className={
                msg.sender_type === "user"
                  ? "bg-blue-500 text-white px-3 py-1 rounded inline-block"
                  : "bg-gray-200 px-3 py-1 rounded inline-block"
              }
            >

              {msg.content}

            </span>

          </div>

        ))}

        {loading && (
          <p className="text-gray-400">
            Bot is typing...
          </p>
        )}

      </div>

      <div className="flex gap-2">

        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4"
        >
          Send
        </button>

      </div>

    </div>

  )
}