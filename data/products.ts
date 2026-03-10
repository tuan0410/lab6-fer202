export interface Product {
  id: number
  name: string
  price: number
  image: string
}

export const products: Product[] = [
  { id: 1, name: "MU Home Jersey 2025", price: 79, image: "/jersey1.jpg" },
  { id: 2, name: "MU Away Jersey 2025", price: 75, image: "/jersey2.jpg" },
  { id: 3, name: "MU Training Jacket", price: 99, image: "/jacket.jpg" },
  { id: 4, name: "MU Scarf", price: 20, image: "/scarf.jpg" },
  { id: 5, name: "MU Cap", price: 18, image: "/cap.jpg" },
  { id: 6, name: "MU Backpack", price: 45, image: "/bag.jpg" }
]