'use client'

import { useCart } from '@/lib/useCart'
import OrderForm from '@/components/OrderForm'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.sku} className="mb-4 border-b pb-2">
              <div className="font-semibold">{item.name}</div>
              <div>Quantity: {item.quantity}</div>
              <button
                className="text-red-500 text-sm"
                onClick={() => removeFromCart(item.sku)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 flex gap-4">
            <Button onClick={clearCart} className="bg-gray-200 hover:bg-gray-300">
              Clear Cart
            </Button>
            <OrderForm />
          </div>
        </>
      )}
    </div>
  )
}