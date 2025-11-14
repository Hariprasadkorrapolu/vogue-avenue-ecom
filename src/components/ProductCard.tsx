import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ id, name, price, salePrice, image, category, isNew }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (user) {
      checkWishlistStatus();
    }
  }, [user, id]);

  const checkWishlistStatus = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", id)
      .maybeSingle();

    setIsWishlisted(!!data);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    await addToCart({
      product_id: id,
      product_name: name,
      product_price: salePrice || price,
      product_image: image,
      product_category: category,
      quantity: 1,
      size: null,
      color: null,
    });
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please sign in to add to wishlist");
      navigate("/auth");
      return;
    }

    if (isWishlisted) {
      // Remove from wishlist
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);

      if (error) {
        toast.error("Failed to remove from wishlist");
      } else {
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      }
    } else {
      // Add to wishlist
      const { error } = await supabase.from("wishlists").insert({
        user_id: user.id,
        product_id: id,
        product_name: name,
        product_price: salePrice || price,
        product_image: image,
        product_category: category,
      });

      if (error) {
        toast.error("Failed to add to wishlist");
      } else {
        setIsWishlisted(true);
        toast.success("Added to wishlist!");
      }
    }
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-border hover:shadow-lg transition-smooth"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}
          {salePrice && (
            <Badge className="bg-sale text-white">
              Sale
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleToggleWishlist}
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            className="w-full bg-white text-primary hover:bg-white/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {category}
        </p>
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{name}</h3>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="text-lg font-bold text-sale">${salePrice}</span>
              <span className="text-sm text-muted-foreground line-through">${price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-foreground">${price}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
