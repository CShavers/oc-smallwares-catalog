"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CartItem } from "@/lib/types"
import { updateCartItemQuantity, removeFromCart } from "@/lib/actions"

interface CartItemsProps {
  items: CartItem[]
}

export default function CartItems({ items }: CartItemsProps) {
  const handleQuantityChange = async (itemId: string, quantity: number) => {
    if (quantity < 1) return
    await updateCartItemQuantity(itemId, quantity)
  }

  const handleRemove = async (itemId: string) => {
    await removeFromCart(itemId)
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 py-4 border-b">
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={item.image || "/placeholder.svg?height=96&width=96"}
              alt={item.name}
              fill
              className="object-cover rounded"
            />
          </div>

          <div className="flex-1">
            <Link href={`/products/${item.productSku}`}>
              <h3 className="font-medium hover:underline">{item.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)}</p>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                  className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(item.id)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-right">
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

