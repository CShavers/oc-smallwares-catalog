export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface Cart {
  items: CartItem[]
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface PaymentDetails {
  last4: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  shippingAddress: ShippingAddress
  paymentDetails: PaymentDetails
  createdAt: string
}

