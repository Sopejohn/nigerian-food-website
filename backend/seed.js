const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
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

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();