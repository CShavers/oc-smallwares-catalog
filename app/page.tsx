'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart, InquiryForm } from '@/lib/useCart';

interface Product {
  sku: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function Page() {
  const { addToCart } = useCart();
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setHydrated(true);
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#458500] to-white p-4">
      <h1 className="text-3xl font-bold text-white mb-4 text-center">
        O'Charley's Smallwares Catalog
      </h1>

      <div className="flex justify-center mb-4">
        <InquiryForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.sku} className="bg-white rounded shadow p-4 flex flex-col items-center">
            {product.image && <img src={product.image} alt={product.name} className="w-32 h-32 object-contain mb-2" />}
            <div className="font-bold">{product.name}</div>
            <div className="text-sm text-gray-600">{product.description}</div>
            <div className="text-green-700 font-semibold">${product.price.toFixed(2)}</div>
            <Button
              className="mt-2 bg-[#458500] text-white"
              onClick={() =>
                addToCart({ sku: product.sku, productSku: product.sku, name: product.name, price: product.price, quantity: 1, image: product.image })
              }
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
