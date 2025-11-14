import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string | null;
  product_category: string | null;
  quantity: number;
  size: string | null;
  color: string | null;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, "id">) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      refreshCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const refreshCart = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching cart:", error);
      return;
    }

    setCartItems(data || []);
  };

  const addToCart = async (item: Omit<CartItem, "id">) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    // Check if item already exists in cart
    const existingItem = cartItems.find(
      (cartItem) => cartItem.product_id === item.product_id
    );

    if (existingItem) {
      // Update quantity
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
      return;
    }

    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      ...item,
    });

    if (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
      return;
    }

    toast.success("Added to cart");
    await refreshCart();
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove from cart");
      return;
    }

    toast.success("Removed from cart");
    await refreshCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", itemId);

    if (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
      return;
    }

    await refreshCart();
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
      return;
    }

    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
