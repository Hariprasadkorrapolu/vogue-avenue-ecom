import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Truck, RotateCcw, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImage, setMainImage] = useState(0);

  // Mock product data
  const product = {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 79,
    salePrice: 59,
    description: "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this piece combines style with sustainability. Perfect for everyday wear.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#001f3f" },
    ],
    stock: 45,
    category: "T-Shirts",
    rating: 4.5,
    reviews: 128,
  };

  const relatedProducts = [
    {
      id: "2",
      name: "Classic Denim Jacket",
      price: 129,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      category: "Jackets",
    },
    {
      id: "3",
      name: "Slim Fit Chinos",
      price: 89,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
      category: "Pants",
    },
    {
      id: "4",
      name: "Cotton Hoodie",
      price: 79,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      category: "Hoodies",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img
              src={product.images[mainImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(index)}
                className={`aspect-square bg-secondary rounded-lg overflow-hidden border-2 transition-all ${
                  mainImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-sale">${product.salePrice}</span>
              <span className="text-xl text-muted-foreground line-through">${product.price}</span>
              <Badge className="bg-sale text-white">
                Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
              </Badge>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Select Size</h3>
              <Button variant="link" className="p-0 h-auto text-sm">
                Size Guide
              </Button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="h-12"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">Select Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    selectedColor === color.name ? "border-primary scale-110" : "border-border"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                +
              </Button>
              <span className="text-sm text-muted-foreground">
                ({product.stock} in stock)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">30-day easy returns</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">2-year warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6 prose max-w-none">
          <p>{product.description}</p>
          <h3 className="font-semibold mt-6 mb-3">Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>100% organic cotton</li>
            <li>Sustainable and eco-friendly</li>
            <li>Pre-shrunk for perfect fit</li>
            <li>Machine washable</li>
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <p className="text-muted-foreground">Reviews coming soon...</p>
        </TabsContent>
        <TabsContent value="shipping" className="mt-6">
          <p className="text-muted-foreground">Shipping information coming soon...</p>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div>
        <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
