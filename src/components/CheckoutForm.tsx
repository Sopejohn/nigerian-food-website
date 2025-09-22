import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, CreditCard, Heart } from "lucide-react";
import { CartItem } from "./Cart";

interface CheckoutFormProps {
  items: CartItem[];
  onBack: () => void;
  onSubmit: (formData: CheckoutFormData) => void;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  specialInstructions: string;
  tip: number;
}

export function CheckoutForm({ items, onBack, onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    specialInstructions: "",
    tip: 0
  });

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 5.99;
  const tax = totalPrice * 0.08; // 8% tax
  const tipAmount = formData.tip;
  const finalTotal = totalPrice + shippingCost + tax + tipAmount;

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: field === "tip" ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.email && formData.firstName && formData.lastName && 
                     formData.address && formData.city && formData.state && formData.zipCode;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="123 Main St"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="New York"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="NY"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          placeholder="10001"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialInstructions">Special Delivery Instructions</Label>
                      <Textarea
                        id="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                        placeholder="Any special instructions for delivery..."
                        className="min-h-20"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Tip Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Add a Tip for Our Delivery Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  <Button
                    variant={formData.tip === 0 ? "default" : "outline"}
                    onClick={() => handleInputChange("tip", "0")}
                    className="p-4 h-auto flex flex-col gap-1"
                  >
                    <span className="font-semibold">No Tip</span>
                    <span className="text-xs">$0.00</span>
                  </Button>
                  <Button
                    variant={Math.abs(formData.tip - totalPrice * 0.20) < 0.01 ? "default" : "outline"}
                    onClick={() => handleInputChange("tip", (totalPrice * 0.20).toString())}
                    className="p-4 h-auto flex flex-col gap-1"
                  >
                    <span className="font-semibold">20%</span>
                    <span className="text-xs">${(totalPrice * 0.20).toFixed(2)}</span>
                  </Button>
                  <Button
                    variant={Math.abs(formData.tip - totalPrice * 0.30) < 0.01 ? "default" : "outline"}
                    onClick={() => handleInputChange("tip", (totalPrice * 0.30).toString())}
                    className="p-4 h-auto flex flex-col gap-1"
                  >
                    <span className="font-semibold">30%</span>
                    <span className="text-xs">${(totalPrice * 0.30).toFixed(2)}</span>
                  </Button>
                  <Button
                    variant={Math.abs(formData.tip - totalPrice * 0.50) < 0.01 ? "default" : "outline"}
                    onClick={() => handleInputChange("tip", (totalPrice * 0.50).toString())}
                    className="p-4 h-auto flex flex-col gap-1"
                  >
                    <span className="font-semibold">50%</span>
                    <span className="text-xs">${(totalPrice * 0.50).toFixed(2)}</span>
                  </Button>
                </div>
                <div className="mt-4">
                  <Label htmlFor="customTip">Custom Tip Amount</Label>
                  <Input
                    id="customTip"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.tip === 0 || Math.abs(formData.tip - totalPrice * 0.20) < 0.01 || Math.abs(formData.tip - totalPrice * 0.30) < 0.01 || Math.abs(formData.tip - totalPrice * 0.50) < 0.01 ? "" : formData.tip}
                    onChange={(e) => handleInputChange("tip", e.target.value)}
                    placeholder="Enter custom tip amount"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {tipAmount > 0 && (
                    <div className="flex justify-between">
                      <span>Tip</span>
                      <span>${tipAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid}
              size="lg" 
              className="w-full"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Place Order - ${finalTotal.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}