'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, clearCart } from '@/lib/cart'
import { CartItem } from '@/lib/types'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    const cartItems = getCart()
    if (Array.isArray(cartItems)) {
      setItems(cartItems)
    } else {
      setItems([])
    }
  }, [])

  const handleClear = () => {
    clearCart()
    setItems([])
  }

  const handlePlaceOrder = () => {
    // Placeholder logic - you can expand later
    alert('Order placed! (Simulated)')
    clearCart()
    setItems([])
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Button variant="outline" onClick={() => router.push('/')}>Back to Catalog</Button>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li key={item.sku} className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">SKU: {item.sku}</div>
                  <div className="text-sm">Qty: {item.quantity}</div>
                </div>
                {item.image && (
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-contain" />
                )}
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            <Button variant="destructive" onClick={handleClear}>
              Clear Cart
            </Button>
            <Button onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
