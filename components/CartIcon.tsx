"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import Image from "next/image"

export default function CartIcon() {
  const { cart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href="/cart" className="relative flex items-center">

      <Image
        src="/cartIcon.png"
        alt="Cart"
        width={32}
        height={32}
      />

      {total > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
          {total}
        </span>
      )}

    </Link>
  )
}