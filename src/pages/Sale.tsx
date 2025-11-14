import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Sale = () => {
  const products = [
    {
      id: "1",
      name: "Classic Denim Jacket",
      price: 129,
      salePrice: 99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      category: "Men",
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
      id: "8",
      name: "Casual Polo Shirt",
      price: 65,
      salePrice: 49,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
      category: "Men",
    },
    {
      id: "10",
      name: "Winter Parka",
      price: 249,
      salePrice: 199,
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
      category: "Men",
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
      id: "15",
      name: "Pleated Midi Skirt",
      price: 89,
      salePrice: 69,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
      category: "Women",
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
      id: "20",
      name: "Leather Ankle Boots",
      price: 189,
      salePrice: 149,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      category: "Women",
    },
    {
      id: "21",
      name: "Vintage Bomber Jacket",
      price: 199,
      salePrice: 149,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      category: "Men",
    },
    {
      id: "22",
      name: "Designer Sunglasses",
      price: 159,
      salePrice: 99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
      category: "Accessories",
    },
    {
      id: "23",
      name: "Canvas Tote Bag",
      price: 79,
      salePrice: 49,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      category: "Accessories",
    },
    {
      id: "24",
      name: "Running Sneakers",
      price: 139,
      salePrice: 99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      category: "Shoes",
    },
    {
      id: "25",
      name: "Wool Scarf",
      price: 59,
      salePrice: 39,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
      category: "Accessories",
    },
    {
      id: "26",
      name: "Denim Shorts",
      price: 69,
      salePrice: 45,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800",
      category: "Women",
    },
  ];

  const calculateDiscount = (price: number, salePrice: number) => {
    return Math.round(((price - salePrice) / price) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-destructive/10 via-secondary to-background py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">Sale</h1>
            <Badge variant="destructive" className="text-lg px-3 py-1">
              Up to 40% Off
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Limited time offers on selected items. Don't miss out on amazing deals from our premium collection.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-sm text-muted-foreground">
            Showing {products.length} products on sale
          </p>
          
          <div className="flex gap-4">
            <Select defaultValue="discount">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Biggest Discount</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sale;
