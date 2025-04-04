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
  const [form, setForm] = useState({ storeNumber: '', name: '', phone: '', email: '' });
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
      await emailjs.send('orders_ocharleys', 'template_orderconf', templateParams, 'wiUCXWVkpNKhSUccL');
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
      <Button onClick={() => setOpen(true)} className="bg-[#458500] text-white">Place Order</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Place Order</DialogTitle>
          <DialogDescription>Enter your store details to complete the order.</DialogDescription>
          <Input placeholder="Store Number" value={form.storeNumber} onChange={e => setForm({ ...form, storeNumber: e.target.value })} />
          <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <Input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <Button onClick={handleSubmit} className="mt-4 bg-[#458500] text-white">Submit Order</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Inquiry Form
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
