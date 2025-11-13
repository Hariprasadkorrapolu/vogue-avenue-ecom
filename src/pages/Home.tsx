import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const Home = () => {
  // Mock data - will be replaced with API calls
  const featuredProducts = [
    {
      id: "1",
      name: "Classic Denim Jacket",
      price: 129,
      salePrice: 99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      category: "Jackets",
      isNew: false,
    },
    {
      id: "2",
      name: "Minimalist White Tee",
      price: 45,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      category: "T-Shirts",
      isNew: true,
    },
    {
      id: "3",
      name: "Tailored Black Blazer",
      price: 199,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      category: "Blazers",
      isNew: true,
    },
    {
      id: "4",
      name: "Slim Fit Chinos",
      price: 89,
      salePrice: 69,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
      category: "Pants",
      isNew: false,
    },
  ];

  const categories = [
    {
      name: "Men's Collection",
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800",
      link: "/men",
    },
    {
      name: "Women's Collection",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
      link: "/women",
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=800",
      link: "/accessories",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-secondary to-background overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fashion Hero"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Elevate Your Style
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Discover our curated collection of premium fashion pieces designed for the modern wardrobe.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <Button variant="link" className="text-white p-0 h-auto">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked pieces for this season</p>
          </div>
          <Button variant="ghost">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="bg-primary text-primary-foreground py-16 my-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in Style</h2>
          <p className="text-lg mb-8 text-primary-foreground/80">
            Subscribe to our newsletter for exclusive offers and style tips
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-foreground"
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
