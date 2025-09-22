import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
                Authentic Nigerian
                <span className="text-primary"> Cuisine Delivered</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Experience the rich flavors of Nigeria with traditional dishes prepared 
                with authentic recipes and fresh ingredients. Taste of home, delivered to your doorstep.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={scrollToProducts}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToAbout}>
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24hrs</div>
                <div className="text-sm text-muted-foreground">Fresh Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Free</div>
                <div className="text-sm text-muted-foreground">Delivery $50+</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1564810162011-0321d9dd26a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMGZvb2QlMjBzcHJlYWR8ZW58MXx8fHwxNzU4MDYzNTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Nigerian food spread"
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}