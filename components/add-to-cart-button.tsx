"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { addToCart } from "@/lib/actions"

interface AddToCartButtonProps {
  productId: string
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = async () => {
    setIsLoading(true)
    await addToCart(productId, quantity)
    setIsLoading(false)
    toast({
      title: "Added to cart",
      description: `Item has been added to your cart.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
          +
        </Button>
      </div>
      <Button onClick={handleAddToCart} disabled={isLoading} className="w-full">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  )
}

