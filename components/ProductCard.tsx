"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"

type Product = {
  id: number
  name: string
  price: number
  image: string
}

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [qty, setQty] = useState<number>(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    const quantity = Number(qty) || 1
    const price = Number(product.price) || 0

    addToCart(
        {
      ...product,
      price,
      quantity
      }
    )

    toast.success("Added to cart 🛒", {
      description: `${product.name} x${quantity}`,
      }
    )
  }

  return (
    <div className="border p-4 rounded-lg bg-black/60 text-white">

      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />

      <h2 className="mt-2 font-bold">{product.name}</h2>

      <p className="text-red-400 font-semibold">${product.price}</p>

      <input
        type="number"
        value={qty}
        min={1}
        onChange={(e) => {
          const value = Number(e.target.value)
          setQty(value > 0 ? value : 1)
        }}
        className="border p-1 w-16 text-black mt-2"
      />

      <button
        onClick={handleAddToCart}
        className="block w-full mt-3 bg-red-600 hover:bg-red-700 transition p-2 rounded"
      >
        Add to Cart
      </button>

    </div>
  )
}