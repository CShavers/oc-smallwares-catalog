import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartItems from "@/components/cart-items"
import CartSummary from "@/components/cart-summary"
import { getCart } from "@/lib/cart"

export default async function CartPage() {
  const cart = await getCart()
  const isEmpty = cart.items.length === 0

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-sm font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue shopping
      </Link>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {isEmpty ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CartItems items={cart.items} />
          </div>
          <div>
            <CartSummary cart={cart} />
          </div>
        </div>
      )}
    </div>
  )
}

