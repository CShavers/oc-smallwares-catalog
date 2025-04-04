'use client';

import React from 'react';
import { useCart } from '@/lib/useCart';
import { Button } from '@/components/ui/button';

export default function CheckoutPage() {
  const { cart } = useCart();

  // Safely check for cart and items
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p>Please add items to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul className="space-y-4">
        {cart.items.map((item, idx) => (
          <li key={idx} className="border p-4 rounded shadow-sm">
            <div className="font-medium">{item.name}</div>
            <div>Quantity: {item.quantity}</div>
            <div className="text-sm text-gray-600">${item.price.toFixed(2)}</div>
          </li>
        ))}
      </ul>
      <Button className="mt-6 bg-[#458500] text-white">Submit Order</Button>
    </div>
  );
}
