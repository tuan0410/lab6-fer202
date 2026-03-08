"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {

const router = useRouter()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)

const handleLogin = async (e:any) => {
e.preventDefault()

setLoading(true)

const { error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password
})

setLoading(false)

if(error){
  alert(error.message)
  return
}

alert("Login successful")

router.push("/home")

}

return (
<div
className="min-h-screen flex items-center justify-center bg-cover bg-center"
style={{ backgroundImage: "url('/background.jpg')" }}
>

<div className="bg-black/70 backdrop-blur-md border border-white/20 p-8 rounded-xl w-[400px] text-white">

    <h2 className="text-2xl font-bold text-center mb-6">
      Login
    </h2>

    <form onSubmit={handleLogin} className="space-y-4">

      <div>
        <label className="block mb-1 text-sm">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-transparent border border-white/30 outline-none"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-transparent border border-white/30 outline-none"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-gray-800 py-2 rounded hover:bg-gray-700 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-red-500 hover:underline"
        >
          Register
        </Link>
      </p>

    </form>

  </div>
</div>

)
}