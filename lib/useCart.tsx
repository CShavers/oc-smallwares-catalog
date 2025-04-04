'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

export interface Cart {
  items: CartItem[]
}

interface CartContextType {
  cart: Cart
  addToCart: (item: CartItem) => void
  removeFromCart: (sku: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.sku === item.sku);
      if (existing) {
        return prev.map(i =>
          i.sku === item.sku ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (sku: string) => {
    setItems(prev => prev.filter(i => i.sku !== sku));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ cart: { items }, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// 🟡 Catalog Inquiry Dialog
export function InquiryForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ storeNumber: '', name: '', phone: '', email: '', message: '' });

  const handleSubmit = async () => {
    const { storeNumber, name, phone, email, message } = form;
    if (!storeNumber || !name || !phone || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await emailjs.send('orders_ocharleys', 'template_inquiry', form, 'wiUCXWVkpNKhSUccL');
      toast.success('Inquiry sent!');
      setForm({ storeNumber: '', name: '', phone: '', email: '', message: '' });
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to send inquiry');
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">Need Help Finding an Item?</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Catalog Inquiry</DialogTitle>
          <DialogDescription>Tell us what you're looking for and we'll get back to you.</DialogDescription>
          <Input placeholder="Store Number" value={form.storeNumber} onChange={e => setForm({ ...form, storeNumber: e.target.value })} />
          <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <Input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <Input placeholder="What are you looking for?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          <Button onClick={handleSubmit} className="mt-4 bg-[#458500] text-white">Submit Inquiry</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
