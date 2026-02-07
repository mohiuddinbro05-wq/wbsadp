import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: string;
  name: string;
  price: number;
  videos_per_day: number;
  earning_per_video: number;
  monthly_earning: number;
  features: string[];
}

interface UpgradePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan?: string;
}

export default function UpgradePlanDialog({ open, onOpenChange, currentPlan = "Standard" }: UpgradePlanDialogProps) {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchPlans();
    }
  }, [open]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (err) {
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: Plan) => {
    toast({
      title: `${plan.name} প্ল্যান সিলেক্ট করা হয়েছে`,
      description: `৳${plan.price} দিয়ে প্ল্যান আপগ্রেড করতে ডিপোজিট করুন।`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            প্ল্যান আপগ্রেড করুন
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-3">
            {plans.map((plan) => {
              const isCurrentPlan = plan.name === currentPlan;
              return (
                <Card 
                  key={plan.id} 
                  className={`relative overflow-hidden transition-all ${
                    isCurrentPlan 
                      ? "border-primary bg-primary/5" 
                      : "hover:border-primary/50"
                  }`}
                >
                  {isCurrentPlan && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                      বর্তমান
                    </Badge>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <p className="text-2xl font-bold text-primary">৳{plan.price}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center mb-3 text-sm">
                      <div className="bg-muted/50 rounded-lg p-2">
                        <p className="font-bold text-primary">{plan.videos_per_day}</p>
                        <p className="text-xs text-muted-foreground">ভিডিও/দিন</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2">
                        <p className="font-bold text-primary">৳{plan.earning_per_video}</p>
                        <p className="text-xs text-muted-foreground">প্রতি ভিডিও</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2">
                        <p className="font-bold text-primary">৳{plan.monthly_earning}</p>
                        <p className="text-xs text-muted-foreground">মাসিক</p>
                      </div>
                    </div>

                    <div className="space-y-1 mb-3">
                      {plan.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button 
                      className="w-full" 
                      variant={isCurrentPlan ? "outline" : "default"}
                      disabled={isCurrentPlan}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {isCurrentPlan ? "বর্তমান প্ল্যান" : "সিলেক্ট করুন"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
