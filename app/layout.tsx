import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import { Geist } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import type { ReactNode } from "react"
import ChatButton from "@/components/ChatButton"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <CartProvider>

          {children}

          {/* Chat AI */}
          <ChatButton />

          {/* Toast notification */}
          <Toaster
            position="top-right"
            richColors
            closeButton
          />

        </CartProvider>
      </body>
    </html>
  )
}