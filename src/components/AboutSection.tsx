import React from "react";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const achievements = [
  "Authentic Nigerian recipes passed down generations",
  "Fresh ingredients sourced daily from local markets",
  "Expert Nigerian chefs with years of experience",
  "100% satisfaction guarantee on every order"
];

export function AboutSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1509100226070-1744f3cd5642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc1ODA2MzYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Nigerian chef cooking"
              className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-2xl -z-10"></div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl">
                Bringing Nigerian
                <span className="text-primary"> Flavors to Your Door</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                FreshMart is more than just a food delivery service. We're your gateway 
                to authentic Nigerian cuisine, bringing the warmth and rich flavors of 
                Nigerian culture directly to your table.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our expert chefs use traditional recipes and the freshest ingredients 
                to create dishes that transport you to the heart of Nigeria with every bite. 
                From aromatic jollof rice to hearty pepper soup, we deliver taste and tradition.
              </p>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{achievement}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button size="lg" onClick={scrollToContact}>Discover Our Story</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}