"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {

const router = useRouter()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const handleLogin = (e:any) => {
e.preventDefault()

const user = localStorage.getItem("user")

if(!user){
  alert("Account does not exist")
  return
}

const storedUser = JSON.parse(user)

if(email === storedUser.email && password === storedUser.password){
  alert("Login successful")
  router.push("/home")
}else{
  alert("Wrong email or password")
}

}

return (
<div
className="min-h-screen flex items-center justify-center bg-cover bg-center"
style={{ backgroundImage: "url('/background.jpg')" }}
> <div className="bg-black/70 backdrop-blur-md border border-white/20 p-8 rounded-xl w-[400px] text-white">

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

      <button className="w-full bg-gray-800 py-2 rounded hover:bg-gray-700 transition">
        Login
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
