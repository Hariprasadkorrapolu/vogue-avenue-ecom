import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Women = () => {
  const products = [
    {
      id: "11",
      name: "Floral Summer Dress",
      price: 149,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      category: "Dresses",
      isNew: true,
    },
    {
      id: "12",
      name: "Silk Blouse",
      price: 95,
      salePrice: 75,
      image: "https://images.unsplash.com/photo-1564257577154-75f0c0f3a3c0?w=800",
      category: "Tops",
    },
    {
      id: "13",
      name: "High-Waisted Jeans",
      price: 109,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
      category: "Denim",
    },
    {
      id: "14",
      name: "Cashmere Cardigan",
      price: 179,
      image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800",
      category: "Knitwear",
      isNew: true,
    },
    {
      id: "15",
      name: "Pleated Midi Skirt",
      price: 89,
      salePrice: 69,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
      category: "Skirts",
    },
    {
      id: "16",
      name: "Classic Trench Coat",
      price: 229,
      image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800",
      category: "Outerwear",
    },
    {
      id: "17",
      name: "Linen Wide-Leg Pants",
      price: 119,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
      category: "Pants",
      isNew: true,
    },
    {
      id: "18",
      name: "Elegant Evening Gown",
      price: 299,
      salePrice: 249,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
      category: "Evening",
    },
    {
      id: "19",
      name: "Knit Sweater Dress",
      price: 139,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
      category: "Dresses",
    },
    {
      id: "20",
      name: "Leather Ankle Boots",
      price: 189,
      salePrice: 149,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      category: "Shoes",
    },
    {
      id: "21",
      name: "Tailored Blazer",
      price: 199,
      image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800",
      category: "Blazers",
      isNew: true,
    },
    {
      id: "22",
      name: "Wrap Midi Dress",
      price: 129,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      category: "Dresses",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Women's Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our curated selection of elegant pieces that celebrate modern femininity and timeless style.
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

export default Women;
