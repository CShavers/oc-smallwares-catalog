"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Cart } from "@/lib/types"

interface CartSummaryProps {
  cart: Cart
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  const handleCheckout = () => {
    setIsLoading(true)
    // In a real app, you might want to validate the cart before proceeding
    router.push("/checkout")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCheckout} disabled={isLoading || cart.items.length === 0} className="w-full">
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}

