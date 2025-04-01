import type { Cart } from "./types"

// In a real app, this would be stored in a database
let cart: Cart = { items: [] }

export async function getCart(): Promise<Cart> {
  // In a real app, you would fetch the cart from a database or API
  // For this example, we'll use a simple in-memory cart
  return cart
}

export async function clearCart() {
  cart = { items: [] }
}

