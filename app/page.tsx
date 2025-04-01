'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/product';
import productsData from '@/lib/products.json';
import { send } from 'emailjs-com';

export default function Page() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', store: '' });
  const [search, setSearch] = useState('');

  const handleQuantityChange = (sku: string, qty: number) => {
    setQuantities({ ...quantities, [sku]: qty });
  };

  const addToCart = (sku: string) => {
    if (quantities[sku] > 0) {
      setCart({ ...cart, [sku]: quantities[sku] });
      alert('Item added to cart');
    }
  };

  const handleRemoveFromCart = (sku: string) => {
    const updatedCart = { ...cart };
    delete updatedCart[sku];
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart({});
    setShowCustomerForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredProducts = (productsData || []).filter((p) => {
    if (!p || !p.Name || !p.SKU) return false;
    return (
      p.Name.toString().toLowerCase().includes(search.toLowerCase()) ||
      p.SKU.toString().toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSubmitOrder = () => {
    setShowCustomerForm(true);
  };

  const handleFinalSubmit = async () => {
    const selectedItems = productsData
      .filter((p) => cart[p.SKU])
      .map((p) => ({
        sku: p.SKU,
        name: p.Name,
        units: cart[p.SKU],
        price: '0.00',
        image_url: p.ProductImageURL
      }));

    const orderId = `OC-${Math.floor(Math.random() * 900000 + 100000)}`;

    try {
      await send(
        'orders_ocharleys',
        'template_orderconf',
        {
          customer_name: form.name,
          order_id: orderId,
          store_number: form.store,
          phone: form.phone,
          email: form.email,
          orders: selectedItems,
          cost: {
            shipping: '0.00',
            tax: '0.00',
            total: '0.00',
          },
        },
        'wiUCXWVkpNKhSUccL'
      );
      alert('Order submitted!');
      clearCart();
      setForm({ name: '', email: '', phone: '', store: '' });
      setShowCart(false);
    } catch (err) {
      console.error(err);
      alert('Error submitting order');
    }
  };

  return (
    <main className="p-6 min-h-screen bg-gradient-to-b from-[#6A8E3F] via-[#f4f4f4] to-white max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
        O&apos;Charley&apos;s Smallwares Catalog
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          className="border p-2 w-full max-w-md rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product: Product) => (
          <div key={product.SKU} className="border p-6 rounded-xl bg-white shadow-md">
            <img
              src={product.ProductImageURL}
              alt={product.Name}
              className="h-48 w-full object-contain mb-4"
            />
            <p className="text-xs text-gray-500 mb-1">SKU: {product.SKU}</p>
            <h2 className="font-semibold text-lg">{product.Name}</h2>
            <p className="text-sm mb-3">{product.Description}</p>
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              className="border p-2 w-full mb-3 rounded"
              onChange={(e) => handleQuantityChange(product.SKU, Number(e.target.value))}
            />
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded w-full hover:bg-blue-700 transition"
              onClick={() => addToCart(product.SKU)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowCart(!showCart)}
          className="bg-black text-white px-5 py-2 rounded shadow-lg"
        >
          {showCart ? 'Hide Cart' : 'View Cart'}
        </button>
      </div>

      {showCart && (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg p-4 overflow-y-auto z-50">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {Object.keys(cart).length === 0 && <p>No items added.</p>}
          {Object.keys(cart).length > 0 && (
            <>
              <ul>
                {Object.entries(cart).map(([sku, qty]) => {
                  const product = productsData.find((p) => p.SKU === sku);
                  return (
                    <li key={sku} className="mb-3 border-b pb-2 flex justify-between items-center">
                      <div>
                        <strong>{product?.Name}</strong> (SKU: {product?.SKU})<br />
                        Quantity: {qty}
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(sku)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
                onClick={handleSubmitOrder}
              >
                Submit Order
              </button>
              <button
                className="mt-2 text-sm text-gray-600 underline w-full"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      )}

      {showCustomerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <input
              name="store"
              placeholder="Store Number"
              className="border p-2 mb-2 w-full"
              onChange={handleFormChange}
            />
            <input
              name="name"
              placeholder="Name"
              className="border p-2 mb-2 w-full"
              onChange={handleFormChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              className="border p-2 mb-2 w-full"
              onChange={handleFormChange}
            />
            <input
              name="email"
              placeholder="Email"
              className="border p-2 mb-2 w-full"
              onChange={handleFormChange}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={handleFinalSubmit}
            >
              Submit Final Order
            </button>
            <button
              className="mt-2 text-red-600 text-sm w-full"
              onClick={() => setShowCustomerForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
