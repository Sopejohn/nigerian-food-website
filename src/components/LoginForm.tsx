import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  onLogin: (user: { email: string; name: string }) => void;
  onToggleMode: () => void;
  isLoginMode: boolean;
}

export function LoginForm({ onLogin, onToggleMode, isLoginMode }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (!isLoginMode) {
      if (!formData.name) {
        toast.error("Please enter your name");
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (isLoginMode) {
        // Mock login - in real app, you'd validate against backend
        if (formData.email === "admin@freshmart.com" && formData.password === "admin123") {
          onLogin({ email: formData.email, name: "Admin User" });
          toast.success("Successfully logged in!");
        } else if (formData.email.includes("@") && formData.password.length >= 6) {
          // Accept any valid email/password combo for demo
          const name = formData.email.split("@")[0];
          onLogin({ email: formData.email, name: name.charAt(0).toUpperCase() + name.slice(1) });
          toast.success("Successfully logged in!");
        } else {
          toast.error("Invalid email or password");
        }
      } else {
        // Mock registration
        onLogin({ email: formData.email, name: formData.name });
        toast.success("Account created successfully!");
      }
      setIsLoading(false);
    }, 1500);
  };

  const isFormValid = isLoginMode 
    ? formData.email && formData.password
    : formData.email && formData.password && formData.name && formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-primary mb-2">FreshMart</h1>
          <p className="text-muted-foreground">Authentic Nigerian Cuisine</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <p className="text-muted-foreground">
              {isLoginMode 
                ? "Sign in to your FreshMart account" 
                : "Join FreshMart and start ordering"}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-10"
                      required={!isLoginMode}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder={isLoginMode ? "Enter your password" : "Create a password"}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLoginMode && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      required={!isLoginMode}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? "Please wait..." : (isLoginMode ? "Sign In" : "Create Account")}
              </Button>
            </form>

            {isLoginMode && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
                <p className="text-xs text-muted-foreground">
                  Email: admin@freshmart.com | Password: admin123
                </p>
                <p className="text-xs text-muted-foreground">
                  Or use any valid email with 6+ character password
                </p>
              </div>
            )}

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="ml-1 text-primary hover:underline"
                >
                  {isLoginMode ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}