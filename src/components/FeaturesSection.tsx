import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Zap, Shield, Cpu, Users, BarChart3, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance that delivers results in milliseconds, not minutes."
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee for peace of mind."
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Leverage cutting-edge artificial intelligence to automate and optimize your workflows."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration tools that keep your team connected and productive."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights and real-time analytics to drive data-informed decisions."
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Built to scale globally with multi-region support and localization."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">
            Powerful Features for 
            <span className="text-primary"> Modern Businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to take your business to the next level. 
            Our comprehensive suite of tools is designed for growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}