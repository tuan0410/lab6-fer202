"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

type Order = {
  id: number
  items: any[]
  total_price: number
  created_at: string
}

export default function OrdersPage() {

  const [orders, setOrders] = useState<Order[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setOrders(data)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >

      <div className="min-h-screen bg-black/70 text-white px-10 py-12">

        <button
          onClick={() => router.push("/home")}
          className="text-xl mb-6 hover:text-red-400"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-8">
          Order History
        </h1>

        {orders.length === 0 && (
          <p>No orders yet.</p>
        )}

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white/10 border border-white/20 p-6 rounded-xl"
            >

              <div className="flex justify-between mb-4">

                <span className="font-semibold">
                  Order #{order.id}
                </span>

                <span>
                  {new Date(order.created_at).toLocaleDateString()}
                </span>

              </div>

              <div className="space-y-2">

                {order.items.map((item: any) => (

                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>

                    <span>
                      ${item.price * item.quantity}
                    </span>
                  </div>

                ))}

              </div>

              <div className="border-t border-white/20 mt-4 pt-4 flex justify-between font-bold">

                <span>Total</span>
                <span>${order.total_price}</span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}