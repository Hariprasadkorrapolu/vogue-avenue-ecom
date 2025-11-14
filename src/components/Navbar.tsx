import { ShoppingBag, Heart, User, Search, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "@/components/NavLink";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchWishlistCount();
    }
  }, [user]);

  const fetchWishlistCount = async () => {
    if (!user) return;
    
    const { count } = await supabase
      .from("wishlists")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    
    setWishlistCount(count || 0);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/men", label: "Men" },
    { to: "/women", label: "Women" },
    { to: "/sale", label: "Sale" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">LUXE</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                activeClassName="text-foreground"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-secondary border-0"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex relative"
              onClick={() => user ? navigate("/wishlist") : navigate("/auth")}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => navigate("/auth")}>
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10"
                    />
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-smooth"
                        activeClassName="text-foreground"
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
