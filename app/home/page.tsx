"use client"

import Image from "next/image"
import CartIcon from "@/components/CartIcon"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"

type Product = {
  id: number
  name: string
  price: number
  image: string
}


const products: Product[] = [
  { id: 1, name: "MU Home Jersey 2025", price: 79, image: "/jersey1.jpg" },
  { id: 2, name: "MU Away Jersey 2025", price: 75, image: "/jersey2.jpg" },
  { id: 3, name: "MU Training Jacket", price: 99, image: "/jacket.jpg" },
  { id: 4, name: "MU Scarf", price: 20, image: "/scarf.jpg" },
  { id: 5, name: "MU Cap", price: 18, image: "/cap.jpg" },
  { id: 6, name: "MU Backpack", price: 45, image: "/bag.jpg" },
]

export default function HomePage() {

  const { addToCart } = useCart() as {
    addToCart: (product: Product & { quantity: number }) => void
  }
  const router = useRouter()

  const handleLogout = async () => {

    await supabase.auth.signOut()

    alert("Logged out")

    router.push("/login")

  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="min-h-screen bg-black/70 text-white">

        {/* NAVBAR */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-white/20">

          <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
            Manchester United
            <Image src="/logo.png" alt="MU Logo" width={32} height={32}/>
            Store
          </h1>

          <div className="flex items-center gap-4 font-semibold">

            {/* HOME BUTTON */}
            <button
              onClick={() => router.push("/home")}
              className="hover:text-red-500"
            >
              Home
            </button>

            <CartIcon />

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-md bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>

          </div>
        </div>

        {/* HERO */}
        <div className="text-center py-10">
          <h2 className="text-4xl font-bold mb-2">
            Manchester United Store
          </h2>
          <p className="text-gray-300">
            Official Merchandise Collection
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="px-8 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-lg hover:scale-105 transition"
            >

              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={250}
                className="h-48 w-full object-cover rounded-md"
              />

              <h3 className="mt-3 font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-300">
                ${product.price}
              </p>

              <button
                onClick={() => {
                  addToCart({
                    ...product,
                    quantity: 1
                  })

                  toast.success("Added to cart 🛒", {
                    description: product.name
                  })
                }}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Add to Cart
              </button>

            </div>

          ))}

        </div>

      </div>
    </div>
  )
}