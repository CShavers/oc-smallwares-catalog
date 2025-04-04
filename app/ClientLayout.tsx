'use client'

import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/lib/useCart'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Toaster position="top-right" />
      {children}
    </CartProvider>
  )
}
