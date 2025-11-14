import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const checkoutSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20),
  address: z.string().trim().min(5, "Address is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  postalCode: z.string().trim().min(3, "Postal code is required").max(20),
  country: z.string().trim().min(1, "Country is required").max(100),
});

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Validate form
      const validated = checkoutSchema.parse(formData);
      setErrors({});
      
      setIsProcessing(true);

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: cartTotal,
          status: "pending",
          payment_status: "pending",
          shipping_address: {
            fullName: validated.fullName,
            email: validated.email,
            phone: validated.phone,
            address: validated.address,
            city: validated.city,
            postalCode: validated.postalCode,
            country: validated.country,
          },
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: item.product_price,
        product_image: item.product_image,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      toast.success("Order placed successfully!");
      navigate(`/profile?tab=orders`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fill in all required fields correctly");
      } else {
        console.error("Error placing order:", error);
        toast.error("Failed to place order. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className={errors.postalCode ? "border-destructive" : ""}
                    />
                    {errors.postalCode && (
                      <p className="text-sm text-destructive mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                    className={errors.country ? "border-destructive" : ""}
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive mt-1">{errors.country}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product_name} x {item.quantity}
                    </span>
                    <span>${(item.product_price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
