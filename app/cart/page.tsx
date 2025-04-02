import OrderForm from '@/components/OrderForm'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {/* Render Cart Items Here */}
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
            <button
              onClick={clearCart}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Clear Cart
            </button>

            {/* 👉 Place Order Button & Dialog */}
            <OrderForm />
          </div>
        </>
      )}
    </div>
  )
}
