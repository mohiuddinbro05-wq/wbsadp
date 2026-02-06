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
import { ArrowDownToLine, Smartphone, Copy } from "lucide-react";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const paymentMethods = [
  { id: "bkash", name: "bKash", number: "01712345678", color: "bg-pink-500" },
  { id: "nagad", name: "Nagad", number: "01812345678", color: "bg-orange-500" },
  { id: "rocket", name: "Rocket", number: "01512345678", color: "bg-purple-500" },
];

export default function DepositDialog({ open, onOpenChange }: DepositDialogProps) {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [step, setStep] = useState(1);

  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    toast({
      title: "কপি হয়েছে!",
      description: `${number} কপি করা হয়েছে`,
    });
  };

  const handleSubmit = () => {
    if (!amount || !transactionId) {
      toast({
        title: "Error",
        description: "সব তথ্য পূরণ করুন",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে!",
      description: `৳${amount} - ${selectedMethod.name}. যাচাই করা হচ্ছে।`,
    });
    
    onOpenChange(false);
    setStep(1);
    setAmount("");
    setTransactionId("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDownToLine className="w-5 h-5 text-primary" />
            ডিপোজিট করুন
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <Label>পেমেন্ট মেথড সিলেক্ট করুন</Label>
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

            <div>
              <Label>পরিমাণ (৳)</Label>
              <Input
                type="number"
                placeholder="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">সর্বনিম্ন ৳500</p>
            </div>

            <Button onClick={() => setStep(2)} className="w-full" disabled={!amount || parseInt(amount) < 500}>
              পরবর্তী
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">এই নম্বরে ৳{amount} পাঠান:</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-bold text-primary">{selectedMethod.number}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyNumber(selectedMethod.number)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{selectedMethod.name} Send Money</p>
            </div>

            <div>
              <Label>Transaction ID</Label>
              <Input
                placeholder="TrxID লিখুন (যেমন: 8N7XXXXXX)"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                পেছনে
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                সাবমিট করুন
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
