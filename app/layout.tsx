import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}