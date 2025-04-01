// In a real app, this would be stored in a database
const orders: Record<string, any> = {}

export async function getOrderById(id: string) {
  // In a real app, you would fetch the order from a database
  return (
    orders[id] || {
      id,
      items: [
        {
          id: "item1",
          name: "Wireless Headphones",
          price: 149.99,
          quantity: 1,
        },
      ],
      total: 155.98,
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        postalCode: "12345",
        country: "United States",
      },
      paymentDetails: {
        last4: "1234",
      },
      createdAt: new Date().toISOString(),
    }
  )
}

