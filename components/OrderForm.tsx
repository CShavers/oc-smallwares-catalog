'use client'

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { useCart } from '@/lib/useCart';

export default function OrderForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    storeNumber: '',
    name: '',
    phone: '',
    email: '',
  });

  const { cart, clearCart } = useCart();

  const handleSubmit = async () => {
    const { storeNumber, name, phone, email } = form;
    if (!storeNumber || !name || !phone || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    const templateParams = {
      ...form,
      order: cart.items.map(item => `${item.name} (Qty: ${item.quantity})`).join(', ')
    };

    try {
      await emailjs.send(
        'orders_ocharleys',
        'template_orderconf',
        templateParams,
        'wiUCXWVkpNKhSUccL'
      );
      toast.success('Order placed!');
      clearCart();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to send order');
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-[#458500] text-white">
        Place Order
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Place Order</DialogTitle>
          <DialogDescription>Enter your store details to complete the order.</DialogDescription>
          <div className="space-y-2">
            <Input
              placeholder="Store Number"
              value={form.storeNumber}
              onChange={(e) => setForm({ ...form, storeNumber: e.target.value })}
            />
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Button onClick={handleSubmit} className="w-full bg-[#458500] text-white mt-2">
              Submit Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
