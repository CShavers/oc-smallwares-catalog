'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

export default function InquiryForm() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async () => {
    const { name, email, message } = form

    if (!name || !email || !message) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      await emailjs.send(
        'orders_ocharleys', // You can use the same service
        'template_inquiry', // Create this template in EmailJS
        form,
        'wiUCXWVkpNKhSUccL'
      )
      toast.success('Inquiry sent!')
      setForm({ name: '', email: '', message: '' })
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Failed to send inquiry')
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-white text-[#458500] hover:bg-gray-100">
        Can't Find What You Need?
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Request Help</DialogTitle>
          <DialogDescription>
            Tell us what you're looking for and we’ll assist you.
          </DialogDescription>
          <Input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            placeholder="Describe what you're looking for..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <Button onClick={handleSubmit} className="mt-4 bg-[#458500] text-white">
            Submit Inquiry
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
