"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function RegisterPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: any) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Register successful! Please login.")

    router.push("/login")
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >

      <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl w-96 shadow-lg border border-white/20 text-white">

        <h1 className="text-2xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 rounded bg-black/40 border border-white/20 focus:outline-none"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded bg-black/40 border border-white/20 focus:outline-none"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded bg-black/40 border border-white/20 focus:outline-none"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-700 py-2 rounded mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400">
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}