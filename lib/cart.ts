import { CartItem } from './types'

const CART_KEY = 'oc_smallwares_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('oc_smallwares_cart')
  try {
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function addToCart(item: CartItem) {
  if (typeof window === 'undefined') return

  const cart = getCart()
  const existing = cart.find((i) => i.sku === item.sku)

  if (existing) {
    existing.quantity += item.quantity
  } else {
    cart.push(item)
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function clearCart() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('oc_smallwares_cart')
  }
}

