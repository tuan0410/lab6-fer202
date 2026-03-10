"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import CartIcon from "@/components/CartIcon"
import { useCart } from "@/context/CartContext"
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

export default function Home() {

  const { addToCart } = useCart()
  const router = useRouter()

  // ADD TO CART (CHƯA LOGIN)
  const handleAddToCart = async (product: Product) => {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast.error("You must login to use the cart")
      router.push("/login")
      return
    }

    addToCart(product)
    toast.success("Added to cart")
  }

  // CLICK CART ICON
  const handleCartClick = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast.error("Please login to access the cart")
      router.push("/login")
      return
    }

    router.push("/cart")
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

            <button
              onClick={() => window.location.reload()}
              className="hover:text-red-500"
            >
              Home
            </button>

            <Link
              href="/login"
              className="px-4 py-1 rounded-md bg-white text-black hover:bg-gray-200"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-4 py-1 rounded-md bg-red-600 hover:bg-red-700"
            >
              Register
            </Link>

            {/* CART */}
            <div onClick={handleCartClick} className="cursor-pointer">
              <CartIcon />
            </div>

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
                onClick={() => handleAddToCart(product)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}