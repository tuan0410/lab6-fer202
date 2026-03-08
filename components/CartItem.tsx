"use client"

import { useCart } from "@/context/CartContext"
import Image from "next/image"

export default function CartItem({ item }: any) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart()

  return (
    <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl">

      {/* PRODUCT IMAGE */}
      <Image
        src={item.image}
        alt={item.name}
        width={120}
        height={120}
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* PRODUCT INFO */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          {item.name}
        </h2>

        <p className="text-gray-300">
          ${item.price}
        </p>

        {/* QUANTITY */}
        <div className="flex items-center gap-3 mt-3">

          <button
            onClick={() => decreaseQty(item.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded hover:bg-gray-600"
          >
            -
          </button>

          <span className="font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQty(item.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded hover:bg-gray-600"
          >
            +
          </button>

        </div>
      </div>

      {/* SUBTOTAL */}
      <div className="text-lg font-semibold w-20 text-right">
        ${item.price * item.quantity}
      </div>

      {/* REMOVE */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-400 ml-4"
      >
        Remove
      </button>

    </div>
  )
}