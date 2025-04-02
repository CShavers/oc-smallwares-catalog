import type { Cart, CartItem } from "./types";

let cart: Cart = { items: [] };

export async function getCart(): Promise<Cart> {
  return cart;
}

export async function clearCart() {
  cart = { items: [] };
}

// Add this missing function:
export async function addToCart(productSku: string, quantity: number): Promise<Cart> {
  const existingItem = cart.items.find((item) => item.productSku === productSku);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productSku, quantity });
  }

  return cart;
}
