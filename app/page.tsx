'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/lib/useCart'
import productsData from '@/lib/products.json'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/useCart'
import { InquiryForm, useCart } from '@/lib/useCart'

export default function Page() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  useEffect(() => {
    setProducts(productsData)
    setHydrated(true)
  }, [])

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase())
  )

  const handleQuantityChange = (sku: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }))
  }

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.sku] || 1
    addToCart({ ...product, quantity })
  }

  if (!hydrated) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#458500] to-white p-4">
      <h1 className="text-3xl font-bold text-white mb-4 text-center">O&apos;Charley&apos;s Smallwares Catalog</h1>

      <div className="text-right mb-4 max-w-6xl mx-auto flex justify-between items-center">
        <InquiryForm />
        <a href="/cart">
          <Button className="bg-white text-[#458500] hover:bg-gray-100 font-semibold shadow">
            View Cart
          </Button>
        </a>
      </div>

      <div className="max-w-2xl mx-auto mb-6">
        <Input
          type="text"
          placeholder="Search by SKU or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 text-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredProducts.map((product) => (
          <div key={product.sku} className="bg-white rounded-2xl shadow-md overflow-hidden p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
              onError={(e) => {
                e.currentTarget.src = '/images/image-placeholder.png'
              }}
            />
            <div className="text-sm text-gray-500 mb-1">SKU: {product.sku}</div>
            <div className="text-lg font-semibold">{product.name}</div>
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>

            <div className="flex items-center mt-4 gap-2">
              <Input
                type="number"
                min={1}
                value={quantities[product.sku] || 1}
                onChange={(e) => handleQuantityChange(product.sku, parseInt(e.target.value))}
                className="w-16"
              />
              <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
