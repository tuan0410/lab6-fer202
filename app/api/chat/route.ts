import { products } from "@/data/products"

export async function POST(req: Request) {

  const { message } = await req.json()
  const text = message.toLowerCase()

  let reply = "Hello 👋 I can help you with MU products!"

  // GREETING
  if (text.includes("hello") || text.includes("hi")) {
    reply = "Hello 👋 Welcome to our MU store! How can I help you?"
  }

  else if (text.includes("how are you")) {
    reply = "I'm doing great! Thanks for asking 😊 How can I help you today?"
  }

  else if (text.includes("thanks") || text.includes("thank you")) {
    reply = "You're welcome! Let me know if you need help with any product."
  }

  // LIST PRODUCTS
  else if (text.includes("products") || text.includes("what do you sell")) {

    const list = products
      .map(p => `${p.name} ($${p.price})`)
      .join(", ")

    reply = `We currently sell: ${list}`
  }

  // RECOMMEND PRODUCT
  else if (text.includes("recommend")) {

    const random = products[Math.floor(Math.random() * products.length)]

    reply = `I recommend ${random.name}. Price: $${random.price}`
  }

  // CHEAPEST PRODUCT
  else if (text.includes("cheap")) {

    const cheapest = [...products].sort((a,b)=>a.price-b.price)[0]

    reply = `The cheapest product is ${cheapest.name} ($${cheapest.price})`
  }

  // SEARCH PRODUCT BY KEYWORD
  else {

    const keywords = ["jersey","jacket","scarf","cap","backpack"]

    const keyword = keywords.find(k => text.includes(k))

    if (keyword) {

      const result = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
      )

      if (result.length > 0) {

        const list = result
          .map(p => `${p.name} ($${p.price})`)
          .join(", ")

        reply = `Here are our ${keyword} products: ${list}`
      }
    }

    // FIND EXACT PRODUCT
    const product = products.find(p =>
      text.includes(p.name.toLowerCase())
    )

    if (product) {
      reply = `${product.name} costs $${product.price}`
    }

  }

  return Response.json({ reply })
}