import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 import { Link, useNavigate } from "react-router-dom";
 import { useState, useEffect } from "react";
import { Play, ArrowLeft, Eye, EyeOff } from "lucide-react";
 import { useToast } from "@/hooks/use-toast";
 import { useAuth } from "@/hooks/useAuth";

export default function UserLogin() {
  const { toast } = useToast();
   const { signIn, user, loading } = useAuth();
   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

   useEffect(() => {
     if (!loading && user) {
       navigate('/dashboard');
     }
   }, [user, loading, navigate]);
 
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setIsSubmitting(true);
 
     const { error } = await signIn(formData.email, formData.password);
 
     if (error) {
       toast({
         title: "Login Failed",
         description: error.message,
         variant: "destructive",
       });
       setIsSubmitting(false);
     } else {
       toast({
         title: "Login Successful!",
         description: "Welcome back to EarnTube!",
       });
       navigate('/dashboard');
     }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--gradient-hero))] to-[hsl(var(--gradient-hero-end))] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
            <span className="text-2xl font-bold text-foreground">EarnTube</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>Login to continue earning</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Phone</Label>
                <Input
                  id="email"
                  placeholder="Enter your email or phone"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/user/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

               <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                 {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Admin Login Link */}
        <div className="mt-4 text-center">
          <Link to="/admin/login" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Admin Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
