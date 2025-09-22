import React from "react";
import { useState } from "react";
import { ProductCard, Product } from "./ProductCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search } from "lucide-react";

// Sample Nigerian dishes and drinks data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Jollof Rice",
    description: "Traditional Nigerian jollof rice with rich tomato base, spices, and vegetables. A beloved West African staple.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1664993101841-036f189719b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2xsb2YlMjByaWNlJTIwbmlnZXJpYW58ZW58MXx8fHwxNzU4MDYzNTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Rice Dishes",
    inStock: true
  },
  {
    id: "2",
    name: "Pounded Yam & Egusi",
    description: "Authentic pounded yam served with rich egusi soup made with ground melon seeds and vegetables.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1741026079488-f22297dc3036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHBvdW5kZWQlMjB5YW18ZW58MXx8fHwxNzU4MDYzNTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Traditional Meals",
    inStock: true
  },
  {
    id: "3",
    name: "Suya Platter",
    description: "Spiced grilled beef skewers seasoned with ground peanuts, chili peppers, and traditional spices.",
    price: 15.49,
    image: "https://images.unsplash.com/photo-1747406394855-1b7e6674a017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHN1eWElMjBncmlsbGVkfGVufDF8fHx8MTc1ODA2MzUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Grilled",
    inStock: true
  },
  {
    id: "4",
    name: "Pepper Soup",
    description: "Spicy and aromatic Nigerian pepper soup with assorted meat, perfect for warming the soul.",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1741026079032-7cb660e44bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHBlcHBlciUyMHNvdXB8ZW58MXx8fHwxNzU4MDYzNTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Soups",
    inStock: true
  },
  {
    id: "5",
    name: "Fried Plantain (Dodo)",
    description: "Sweet fried plantain slices, golden and caramelized to perfection. A popular Nigerian side dish.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1725013936336-0121addb2c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMGZyaWVkJTIwcGxhbnRhaW58ZW58MXx8fHwxNzU4MDYzNTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Sides",
    inStock: true
  },
  {
    id: "6",
    name: "Egusi Soup",
    description: "Traditional Nigerian soup made with ground melon seeds, leafy vegetables, and assorted meat.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1741026079032-7cb660e44bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMGVndXNpJTIwc291cHxlbnwxfHx8fDE3NTgwNjM1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Soups",
    inStock: false
  },
  {
    id: "7",
    name: "Zobo Drink",
    description: "Refreshing hibiscus drink infused with natural spices, ginger, and fruits. A healthy Nigerian beverage.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1598431388094-324d32b317fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHpvYm8lMjBkcmluayUyMGhpYmlzY3VzfGVufDF8fHx8MTc1ODIwOTUwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Drinks",
    inStock: true
  },
  {
    id: "8",
    name: "Kunu Drink",
    description: "Traditional Nigerian millet-based drink, creamy and nutritious with a hint of ginger and spices.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1727233431893-e38a524d7f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW51JTIwbmlnZXJpYW4lMjBkcmlua3xlbnwxfHx8fDE3NTgyMDk1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Drinks",
    inStock: true
  },
  {
    id: "9",
    name: "Palm Wine",
    description: "Traditional fermented palm sap wine, naturally sweet with a unique taste. An authentic African drink.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1624340209561-04a1685cd93c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxtJTIwd2luZSUyMGFmcmljYW4lMjBkcmlua3xlbnwxfHx8fDE3NTgyMDk1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Drinks",
    inStock: true
  },
  {
    id: "10",
    name: "Fura da Nono",
    description: "Traditional Hausa drink made with millet balls (fura) and fresh cow milk (nono). Creamy and nutritious.",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1642243450206-e8bbc8551a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJhJTIwZGElMjBub25vJTIwbmlnZXJpYW4lMjBkcmlua3xlbnwxfHx8fDE3NTgyMDk1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Drinks",
    inStock: true
  }
];

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [products] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">
            Authentic <span className="text-primary">Nigerian Food & Drinks</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the rich flavors of Nigeria with our traditional dishes and refreshing drinks, prepared with authentic recipes and delivered fresh to your door.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Nigerian food & drinks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}