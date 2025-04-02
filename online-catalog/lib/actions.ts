"use server"

import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import { getCart, clearCart } from "./cart"
import { products } from "./products"

export async function addToCart(productSku: string, quantity = 1) {
  const cart = await getCart()
  const product = products.find((p) => p.id === productSku)

  if (!product) {
    throw new Error("Product not found")
  }

  const existingItemIndex = cart.items.findIndex((item) => item.productSku === productSku)

  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart.items[existingItemIndex].quantity += quantity
  } else {
    // Add new item
    cart.items.push({
      id: uuidv4(),
      productSku,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
  }

  revalidatePath("/cart")
  revalidatePath("/checkout")
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const cart = await getCart()
  const itemIndex = cart.items.findIndex((item) => item.id === itemId)

  if (itemIndex >= 0) {
    cart.items[itemIndex].quantity = quantity
  }

  revalidatePath("/cart")
  revalidatePath("/checkout")
}

export async function removeFromCart(itemId: string) {
  const cart = await getCart()
  cart.items = cart.items.filter((item) => item.id !== itemId)

  revalidatePath("/cart")
  revalidatePath("/checkout")
}

export async function placeOrder(formData: any) {
  const cart = await getCart()

  if (cart.items.length === 0) {
    throw new Error("Cart is empty")
  }

  // In a real app, you would process payment and store order in database
  const orderId = uuidv4()

  // Mock order creation
  const order = {
    id: orderId,
    items: cart.items,
    total: cart.items.reduce((total, item) => total + item.price * item.quantity, 0) + 5.99,
    shippingAddress: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
    },
    paymentDetails: {
      last4: "1234", // In a real app, this would come from payment processor
    },
    createdAt: new Date().toISOString(),
  }

  // Clear the cart after successful order
  await clearCart()

  revalidatePath("/cart")

  return orderId
}

