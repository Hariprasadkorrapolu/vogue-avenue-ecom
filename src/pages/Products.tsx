import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Mock data
  const products = [
    // Men's Products
    {
      id: "1",
      name: "Classic Denim Jacket",
      price: 129,
      salePrice: 99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      category: "Men",
    },
    {
      id: "2",
      name: "Minimalist White Tee",
      price: 45,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      category: "Men",
      isNew: true,
    },
    {
      id: "3",
      name: "Tailored Black Blazer",
      price: 199,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      category: "Men",
      isNew: true,
    },
    {
      id: "4",
      name: "Slim Fit Chinos",
      price: 89,
      salePrice: 69,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
      category: "Men",
    },
    {
      id: "5",
      name: "Leather Sneakers",
      price: 159,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      category: "Men",
      isNew: true,
    },
    {
      id: "6",
      name: "Cotton Hoodie",
      price: 79,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      category: "Men",
    },
    {
      id: "7",
      name: "Formal Dress Shirt",
      price: 95,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
      category: "Men",
    },
    {
      id: "8",
      name: "Casual Polo Shirt",
      price: 65,
      salePrice: 49,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
      category: "Men",
    },
    {
      id: "9",
      name: "Athletic Joggers",
      price: 75,
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
      category: "Men",
      isNew: true,
    },
    {
      id: "10",
      name: "Winter Parka",
      price: 249,
      salePrice: 199,
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
      category: "Men",
    },
    
    // Women's Products
    {
      id: "11",
      name: "Floral Summer Dress",
      price: 149,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      category: "Women",
      isNew: true,
    },
    {
      id: "12",
      name: "Silk Blouse",
      price: 95,
      salePrice: 75,
      image: "https://images.unsplash.com/photo-1564257577154-75f0c0f3a3c0?w=800",
      category: "Women",
    },
    {
      id: "13",
      name: "High-Waisted Jeans",
      price: 109,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
      category: "Women",
    },
    {
      id: "14",
      name: "Cashmere Cardigan",
      price: 179,
      image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800",
      category: "Women",
      isNew: true,
    },
    {
      id: "15",
      name: "Pleated Midi Skirt",
      price: 89,
      salePrice: 69,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
      category: "Women",
    },
    {
      id: "16",
      name: "Classic Trench Coat",
      price: 229,
      image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800",
      category: "Women",
    },
    {
      id: "17",
      name: "Linen Wide-Leg Pants",
      price: 119,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
      category: "Women",
      isNew: true,
    },
    {
      id: "18",
      name: "Elegant Evening Gown",
      price: 299,
      salePrice: 249,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
      category: "Women",
    },
    {
      id: "19",
      name: "Knit Sweater Dress",
      price: 139,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
      category: "Women",
    },
    {
      id: "20",
      name: "Leather Ankle Boots",
      price: 189,
      salePrice: 149,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      category: "Women",
    },
    
    // Sale Products (mix of men's and women's items with sale prices)
    {
      id: "21",
      name: "Vintage Bomber Jacket",
      price: 199,
      salePrice: 149,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      category: "Sale",
    },
    {
      id: "22",
      name: "Designer Sunglasses",
      price: 159,
      salePrice: 99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
      category: "Sale",
    },
    {
      id: "23",
      name: "Canvas Tote Bag",
      price: 79,
      salePrice: 49,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      category: "Sale",
    },
    {
      id: "24",
      name: "Running Sneakers",
      price: 139,
      salePrice: 99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      category: "Sale",
    },
    {
      id: "25",
      name: "Wool Scarf",
      price: 59,
      salePrice: 39,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
      category: "Sale",
    },
    {
      id: "26",
      name: "Denim Shorts",
      price: 69,
      salePrice: 45,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800",
      category: "Sale",
    },
  ];

  const categories = ["All", "Men", "Women", "Sale"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-4">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold mb-4">Colors</h3>
        <div className="flex gap-2 flex-wrap">
          {["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#00FF00", "#FFFF00"].map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full border-2 border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSection />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} products
            </p>
            
            <div className="flex items-center gap-4">
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
