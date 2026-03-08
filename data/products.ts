export interface Product {
  id: number
  name: string
  price: number
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    price: 1000,
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 2000,
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "AirPods",
    price: 200,
    image: "https://via.placeholder.com/200"
  }
]