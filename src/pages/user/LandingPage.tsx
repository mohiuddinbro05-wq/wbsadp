import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { 
  Play, 
  Users, 
  Star, 
  PlayCircle, 
  Wallet, 
  Shield, 
  Clock, 
  Gift, 
  UserPlus,
  ArrowRight,
  Check
} from "lucide-react";

const stats = [
  { icon: Users, value: "50K+", label: "Active Users" },
  { icon: Star, value: "৳10M+", label: "Paid Out" },
  { icon: PlayCircle, value: "1M+", label: "Videos Watched" },
];

const features = [
  {
    icon: PlayCircle,
    title: "Watch & Earn",
    description: "Simply watch videos to earn points. The more you watch, the more you earn."
  },
  {
    icon: Wallet,
    title: "Easy Withdrawals",
    description: "Withdraw your earnings directly to bKash, Nagad, or Rocket with minimum fees."
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Your earnings are safe with us. 100% secure platform with encrypted transactions."
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work anytime, anywhere. No fixed hours - earn on your own schedule."
  },
  {
    icon: Gift,
    title: "Daily Bonuses",
    description: "Complete daily tasks to earn bonus points and unlock special rewards."
  },
  {
    icon: UserPlus,
    title: "Referral Program",
    description: "Invite friends and earn commission on their earnings. Build your network!"
  },
];

const steps = [
  {
    number: 1,
    title: "Sign Up & Choose Plan",
    description: "Create your account and select a plan that matches your earning goals."
  },
  {
    number: 2,
    title: "Watch Daily Videos",
    description: "Complete your daily video tasks and earn points for each video watched."
  },
  {
    number: 3,
    title: "Withdraw Earnings",
    description: "Convert points to cash and withdraw to bKash, Nagad, or Rocket instantly."
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "৳999",
    monthlyEarning: "৳1,500+",
    features: ["5 videos per day", "৳10 per video", "Basic support", "Weekly withdrawals"],
    popular: false
  },
  {
    name: "Basic",
    price: "৳2,999",
    monthlyEarning: "৳4,500+",
    features: ["10 videos per day", "৳15 per video", "Priority support", "Daily withdrawals", "Bonus videos"],
    popular: false
  },
  {
    name: "Standard",
    price: "৳7,999",
    monthlyEarning: "৳12,000+",
    features: ["20 videos per day", "৳20 per video", "24/7 support", "Instant withdrawals", "Premium videos", "10% referral bonus"],
    popular: true
  },
  {
    name: "Premium",
    price: "৳14,999",
    monthlyEarning: "৳26,250+",
    features: ["35 videos per day", "৳25 per video", "VIP support", "Instant withdrawals", "Exclusive videos", "15% referral bonus", "Early access to features"],
    popular: false
  },
  {
    name: "Ultimate",
    price: "৳24,999",
    monthlyEarning: "৳52,500+",
    features: ["50 videos per day", "৳35 per video", "Dedicated manager", "Instant withdrawals", "All premium features", "20% referral bonus", "Guaranteed earnings", "Priority payouts"],
    popular: false
  },
];

const testimonials = [
  {
    quote: "I've been using EarnTube for 3 months and already earned ৳45,000! The platform is genuine and payments are always on time.",
    name: "Rahim Ahmed",
    role: "Premium Member",
    initials: "RA"
  },
  {
    quote: "Best earning platform in Bangladesh. I watch videos during my free time and earn extra income for my family.",
    name: "Fatima Begum",
    role: "Standard Member",
    initials: "FB"
  },
  {
    quote: "The Ultimate plan is worth every penny. I earn ৳50,000+ monthly just by watching videos. Highly recommended!",
    name: "Karim Hassan",
    role: "Ultimate Member",
    initials: "KH"
  },
];

const faqs = [
  {
    question: "How does EarnTube work?",
    answer: "EarnTube is a platform where you can earn money by watching videos. Simply sign up, choose a subscription plan, and start watching videos daily. Each video you watch earns you points that can be converted to cash."
  },
  {
    question: "Is this platform legitimate?",
    answer: "Yes! EarnTube is a 100% legitimate platform with over 50,000 active users. We have paid out over ৳10 million to our members. All transactions are encrypted and secure."
  },
  {
    question: "What are the withdrawal options?",
    answer: "You can withdraw your earnings directly to bKash, Nagad, or Rocket. Withdrawal times vary based on your plan - from weekly for Starter to instant for Premium and Ultimate plans."
  },
  {
    question: "Can I buy multiple subscription plans?",
    answer: "You can upgrade to a higher plan at any time. The upgrade cost will be calculated based on your current plan. Contact support for assistance with plan upgrades."
  },
  {
    question: "How much can I earn per month?",
    answer: "Your monthly earnings depend on your chosen plan. Starter members can earn ৳1,500+ per month, while Ultimate members can earn ৳52,500+ per month by completing all daily video tasks."
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold text-foreground">EarnTube</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-hero))] to-[hsl(var(--gradient-hero-end))]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Start Earning Today
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Watch Videos. <span className="text-accent">Earn Money.</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users earning real money by watching videos. Choose your subscription plan and start your earning journey today.
            </p>
            
            <Link to="/register">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose EarnTube?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the best platform for earning money online by watching videos. Here's what makes us different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-border">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground">Start earning in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Choose Your Earning Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select a subscription plan that fits your goals. Higher plans mean more videos and higher earnings per video.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative card-hover ${plan.popular ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm"> /one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-3 bg-primary/10 rounded-lg">
                    <p className="text-xs text-muted-foreground">Monthly Earnings</p>
                    <p className="text-xl font-bold text-primary">{plan.monthlyEarning}</p>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="block">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Members Say</h2>
            <p className="text-muted-foreground">
              Don't just take our word for it. Here's what our members have to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover border-border">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Got questions? We've got answers. Check out our most commonly asked questions.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Play className="w-4 h-4 text-primary-foreground fill-current" />
              </div>
              <span className="text-lg font-bold">EarnTube</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-background/70">
              <Link to="/terms" className="hover:text-background transition-colors">Terms & Conditions</Link>
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Contact</a>
            </div>
            <p className="text-sm text-background/70">
              © 2024 EarnTube. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
