"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"

export default function ProductCard({ product }: any) {
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()

  return (
    <div className="border p-4 rounded-lg bg-black/60 text-white">

      <img src={product.image} className="h-40 w-full object-cover"/>

      <h2 className="mt-2 font-bold">{product.name}</h2>
      <p>${product.price}</p>

      <input
        type="number"
        value={qty}
        min={1}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border p-1 w-16 text-black"
      />

      <button
        onClick={() =>
          addToCart({ ...product, quantity: qty })
        }
        className="block w-full mt-2 bg-red-600 p-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  )
}