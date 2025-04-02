'use client'

import { useEffect, useState } from 'react'
import productsData from '@/lib/products.json'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/lib/cart'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

export default function Page() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  useEffect(() => {
    setProducts(productsData)
  }, [])

  const handleQuantityChange = (sku: string, value: string) => {
    const qty = parseInt(value)
    if (!isNaN(qty) && qty > 0) {
      setQuantities((prev) => ({ ...prev, [sku]: qty }))
    }
  }

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.sku] || 1
    addToCart({ ...product, quantity })
    toast.success(`${product.name} (x${quantity}) added to cart`)
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#458500] to-white p-4">
      <h1 className="text-3xl font-bold text-white mb-4 text-center">O'Charley's Smallwares Catalog</h1>
      <div className="text-right mb-4 max-w-6xl mx-auto">
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

            <div className="flex items-center gap-2 mt-4">
              <Input
                type="number"
                min={1}
                value={quantities[product.sku] || 1}
                onChange={(e) => handleQuantityChange(product.sku, e.target.value)}
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
