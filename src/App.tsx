import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProductGrid } from "./components/ProductGrid";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { CheckoutForm, CheckoutFormData } from "./components/CheckoutForm";
import { LoginForm } from "./components/LoginForm";
import { Footer } from "./components/Footer";
import { CartItem } from "./components/Cart";
import { Product } from "./components/ProductCard";
import { toast, Toaster } from "sonner";
import { apiService } from "./services/api";

interface User {
  email: string;
  name: string;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await apiService.validateToken();
      if (result) {
        setUser(result.user);
      }
    };
    checkAuth();
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please sign in to continue with checkout");
      setShowLogin(true);
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowCheckout(true);
  };

  const handleCheckoutSubmit = async (formData: CheckoutFormData) => {
    try {
      const orderTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const finalTotal = orderTotal + 5.99 + (orderTotal * 0.08) + formData.tip;
      
      const orderData = {
        items: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        customerInfo: formData,
        total: finalTotal,
        tip: formData.tip
      };
      
      await apiService.createOrder(orderData);
      toast.success(`Order placed successfully! Total: $${finalTotal.toFixed(2)}. You'll receive a confirmation email shortly.`);
      setCartItems([]);
      setShowCheckout(false);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleBackToShopping = () => {
    setShowCheckout(false);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(null);
    setCartItems([]);
    setShowCheckout(false);
    toast.success("Successfully logged out");
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setIsLoginMode(true);
  };

  const handleToggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  // Show login page
  if (showLogin) {
    return (
      <>
        <LoginForm 
          onLogin={handleLogin}
          onToggleMode={handleToggleLoginMode}
          isLoginMode={isLoginMode}
        />
        <Toaster />
      </>
    );
  }

  // Show checkout page
  if (showCheckout) {
    return (
      <div className="min-h-screen">
        <CheckoutForm 
          items={cartItems}
          onBack={handleBackToShopping}
          onSubmit={handleCheckoutSubmit}
        />
        <Toaster />
      </div>
    );
  }

  // Main app
  return (
    <div className="min-h-screen">
      <Header 
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        user={user}
        onLogin={handleShowLogin}
        onLogout={handleLogout}
      />
      <main>
        <HeroSection />
        <div id="products">
          <ProductGrid onAddToCart={addToCart} />
        </div>
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}