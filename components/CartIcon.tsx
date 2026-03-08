"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function CartIcon() {
  const { cart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href="/cart" className="text-white font-bold">
      🛒 {total}
    </Link>
  )
}