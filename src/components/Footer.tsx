import { ShoppingBag, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xl font-bold">LUXE</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Premium fashion for the modern lifestyle. Discover timeless pieces that define your style.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/men" className="text-sm text-muted-foreground hover:text-foreground transition-base">
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink to="/women" className="text-sm text-muted-foreground hover:text-foreground transition-base">
                  Women
                </NavLink>
              </li>
              <li>
                <NavLink to="/sale" className="text-sm text-muted-foreground hover:text-foreground transition-base">
                  Sale
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-arrivals" className="text-sm text-muted-foreground hover:text-foreground transition-base">
                  New Arrivals
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-base">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-base">
                  Shipping Info
                </NavLink>
              </li>
              <li>
                <NavLink to="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-base">
                  Returns
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-base">
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
