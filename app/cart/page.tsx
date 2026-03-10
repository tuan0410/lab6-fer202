"use client"

import CartItem from "@/components/CartItem"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function CartPage() {

  const { cart, clearCart } = useCart()
  const router = useRouter()

  const total = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  )

  const handleCheckout = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please login first")
      router.push("/login")
      return
    }

    const { error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        items: cart,
        total_price: total
      })

    if (error) {
      alert("Checkout failed")
      console.log(error)
      return
    }

    alert("Order placed successfully")

    clearCart()

    router.push("/orders")
  }

  if (cart.length === 0) {
    return (
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >

        <div className="min-h-screen bg-black/70 text-white">

          <div className="flex items-center px-8 py-4 border-b border-white/20">

            <button
              onClick={() => router.push("/home")}
              className="text-2xl mr-8 hover:text-red-500"
            >
              ←
            </button>

            <h1 className="text-3xl font-bold">
              Shopping Cart
            </h1>

          </div>

          <div className="flex items-center justify-center h-[80vh] text-xl">
            Your cart is empty 🛒
          </div>

        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >

      <div className="min-h-screen bg-black/70 text-white">

        <div className="flex items-center px-8 py-4 border-b border-white/20">

          <button
            onClick={() => router.push("/home")}
            className="text-2xl mr-8 hover:text-red-500"
          >
            ←
          </button>

          <h1 className="text-3xl font-bold">
            Shopping Cart
          </h1>

        </div>

        <div className="px-10 py-12">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl h-fit">

              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-2">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="text-xl font-bold">
                  ${total}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 py-3 rounded-lg hover:bg-red-700 transition"
              >
                Checkout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}