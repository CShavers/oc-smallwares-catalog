'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Product {
  sku: string
  name: string
  description: string
  price: number
  image?: string
}

export interface CartItem {
  sku: string
  productSku: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartContextType {
  cart: { items: CartItem[] }
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (sku: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.sku === product.sku)
      if (existingItem) {
        return prevItems.map(item =>
          item.sku === product.sku
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity, productSku: product.sku }]
      }
    })
  }

  const removeFromCart = (sku: string) => {
    setItems((prevItems) => prevItems.filter(item => item.sku !== sku))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ cart: { items }, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
