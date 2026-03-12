"use client"

import { useState, useEffect } from "react"
import ChatInterface from "./ChatInterface"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

export default function ChatButton() {

  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data?.user?.id || null)
    })
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUserId(session?.user?.id || null)
      }
    )
    
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

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
          <div className="flex justify-between items-center p-3 border-b bg-red-600 text-white rounded-t-xl shrink-0">
            <span className="font-bold">AI Support</span>

            <button
              onClick={() => setOpen(false)}
              className="hover:scale-110"
            >
              ✖
            </button>
          </div>

          {/* CHAT */}
          <div className="flex-1 overflow-hidden rounded-b-xl">
            {userId ? (
              <ChatInterface userId={userId} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-500 bg-gray-50">
                <p className="mb-4">Vui lòng đăng nhập để sử dụng chat AI.</p>
                <a href="/login" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Đăng nhập</a>
              </div>
            )}
          </div>

        </div>
      )}
    </>
  )
}