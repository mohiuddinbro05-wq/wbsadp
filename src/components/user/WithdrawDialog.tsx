import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpFromLine, Smartphone, AlertCircle } from "lucide-react";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance: number;
}

const paymentMethods = [
  { id: "bkash", name: "bKash", color: "bg-pink-500" },
  { id: "nagad", name: "Nagad", color: "bg-orange-500" },
  { id: "rocket", name: "Rocket", color: "bg-purple-500" },
];

export default function WithdrawDialog({ open, onOpenChange, balance }: WithdrawDialogProps) {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = () => {
    const withdrawAmount = parseInt(amount);
    
    if (!amount || !accountNumber) {
      toast({
        title: "Error",
        description: "সব তথ্য পূরণ করুন",
        variant: "destructive",
      });
      return;
    }

    if (withdrawAmount < 500) {
      toast({
        title: "Error",
        description: "সর্বনিম্ন ৳500 উইথড্র করতে হবে",
        variant: "destructive",
      });
      return;
    }

    if (withdrawAmount > balance) {
      toast({
        title: "Error",
        description: "অপর্যাপ্ত ব্যালেন্স",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "উইথড্র রিকোয়েস্ট সফল!",
      description: `৳${amount} - ${selectedMethod.name} (${accountNumber})। ২৪ ঘন্টার মধ্যে পাবেন।`,
    });
    
    onOpenChange(false);
    setAmount("");
    setAccountNumber("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpFromLine className="w-5 h-5 text-blue-500" />
            উইথড্র করুন
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Balance Info */}
          <div className="p-3 bg-primary/10 rounded-lg flex items-center justify-between">
            <span className="text-sm text-muted-foreground">উপলব্ধ ব্যালেন্স</span>
            <span className="font-bold text-primary">৳{balance}</span>
          </div>

          {/* Payment Method */}
          <div>
            <Label>পেমেন্ট মেথড</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedMethod.id === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${method.color} mx-auto mb-1 flex items-center justify-center`}>
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-medium">{method.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Account Number */}
          <div>
            <Label>{selectedMethod.name} নম্বর</Label>
            <Input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Amount */}
          <div>
            <Label>পরিমাণ (৳)</Label>
            <Input
              type="number"
              placeholder="500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">সর্বনিম্ন ৳500, সর্বোচ্চ ৳{balance}</p>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-amber-700 dark:text-amber-400">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-xs">উইথড্র সাধারণত ২৪ ঘন্টার মধ্যে প্রসেস করা হয়।</p>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            উইথড্র রিকোয়েস্ট করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
