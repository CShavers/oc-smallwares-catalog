
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";

export default function CatalogApp() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "", storeNumber: "" });

  useEffect(() => {
    fetch("/catalog_sample.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleQuantityChange = (sku, quantity) => {
    setCart({ ...cart, [sku]: quantity });
  };

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const orderItems = products
      .filter((p) => cart[p.SKU])
      .map((p) => ({
        name: p.Name,
        units: cart[p.SKU],
        price: "0.00",
      }));

    const orderId = `OC-${Date.now().toString().slice(-6)}`;

    const templateParams = {
      customer_name: customer.name,
      order_id: orderId,
      store_number: customer.storeNumber,
      phone: customer.phone,
      email: customer.email,
      orders: orderItems,
      cost: {
        shipping: "0.00",
        tax: "0.00",
        total: "0.00",
      },
    };

    emailjs
      .send("orders_ocharleys", "template_orderconf", templateParams, "wiUCXWVkpNKhSUccL")
      .then(
        (response) => {
          console.log("Order email sent successfully:", response);
          alert("Order submitted successfully.");
        },
        (error) => {
          console.error("Order email failed:", error);
          alert("There was an error submitting your order.");
        }
      );
  };

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold mb-4">O'Charley's Smallwares Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.SKU}>
            <CardContent className="p-4 flex flex-col items-center">
              <img src={product.ProductImageURL} alt={product.Name} className="h-32 object-contain mb-2" />
              <h2 className="font-semibold text-lg">{product.Name}</h2>
              <p className="text-sm text-center mb-2">{product.Description}</p>
              <Input
                type="number"
                min="0"
                placeholder="Quantity"
                onChange={(e) => handleQuantityChange(product.SKU, e.target.value)}
                className="w-24 text-center"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input name="storeNumber" placeholder="Store Number" onChange={handleInputChange} />
          <Input name="name" placeholder="Name" onChange={handleInputChange} />
          <Input name="phone" placeholder="Phone" onChange={handleInputChange} />
          <Input name="email" placeholder="Email" onChange={handleInputChange} />
        </div>
        <Button className="mt-4" onClick={handleSubmit}>
          Submit Order
        </Button>
      </div>
    </div>
  );
}
