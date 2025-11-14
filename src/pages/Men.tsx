import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Men = () => {
  const products = [
    {
      id: "1",
      name: "Classic Denim Jacket",
      price: 129,
      salePrice: 99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      category: "Jackets",
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
    },
    {
      id: "5",
      name: "Leather Sneakers",
      price: 159,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      category: "Shoes",
      isNew: true,
    },
    {
      id: "6",
      name: "Cotton Hoodie",
      price: 79,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      category: "Hoodies",
    },
    {
      id: "7",
      name: "Formal Dress Shirt",
      price: 95,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
      category: "Shirts",
    },
    {
      id: "8",
      name: "Casual Polo Shirt",
      price: 65,
      salePrice: 49,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
      category: "Polo",
    },
    {
      id: "9",
      name: "Athletic Joggers",
      price: 75,
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
      category: "Activewear",
      isNew: true,
    },
    {
      id: "10",
      name: "Winter Parka",
      price: 249,
      salePrice: 199,
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
      category: "Outerwear",
    },
    {
      id: "11",
      name: "Striped Oxford Shirt",
      price: 85,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
      category: "Shirts",
    },
    {
      id: "12",
      name: "Canvas Belt",
      price: 35,
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583b2?w=800",
      category: "Accessories",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Men's Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover premium menswear designed for the modern gentleman. From casual essentials to formal pieces.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-sm text-muted-foreground">
            Showing {products.length} products
          </p>
          
          <div className="flex gap-4">
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
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

export default Men;
