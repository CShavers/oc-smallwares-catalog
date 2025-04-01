import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import CheckoutForm from "@/components/checkout-form"
import OrderSummary from "@/components/order-summary"
import { getCart } from "@/lib/cart"

export default async function CheckoutPage() {
  const cart = await getCart()

  // Redirect to cart if cart is empty
  if (cart.items.length === 0) {
    redirect("/cart")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cart" className="inline-flex items-center mb-6 text-sm font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  )
}

