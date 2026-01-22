import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CreditCard, Phone, Plus, Trash2, Edit, CheckCircle, XCircle, Wallet, Settings, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface PaymentNumber {
  id: string;
  number: string;
  accountName: string;
  isActive: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  icon: string;
  color: string;
  bgColor: string;
  isEnabled: boolean;
  numbers: PaymentNumber[];
  minDeposit: string;
  maxDeposit: string;
  processingTime: string;
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: "PM001",
    name: "bKash",
    code: "bkash",
    icon: "🔴",
    color: "text-pink-600",
    bgColor: "bg-pink-500/10",
    isEnabled: true,
    numbers: [
      { id: "N001", number: "01712345678", accountName: "EarnTube Official", isActive: true },
      { id: "N002", number: "01798765432", accountName: "EarnTube Payments", isActive: true },
    ],
    minDeposit: "৳100",
    maxDeposit: "৳50,000",
    processingTime: "Instant",
  },
  {
    id: "PM002",
    name: "Nagad",
    code: "nagad",
    icon: "🟠",
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    isEnabled: true,
    numbers: [
      { id: "N003", number: "01612345678", accountName: "EarnTube Nagad", isActive: true },
    ],
    minDeposit: "৳100",
    maxDeposit: "৳50,000",
    processingTime: "Instant",
  },
  {
    id: "PM003",
    name: "Rocket",
    code: "rocket",
    icon: "🟣",
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
    isEnabled: false,
    numbers: [
      { id: "N004", number: "01512345678", accountName: "EarnTube Rocket", isActive: false },
    ],
    minDeposit: "৳200",
    maxDeposit: "৳25,000",
    processingTime: "5-10 mins",
  },
  {
    id: "PM004",
    name: "Upay",
    code: "upay",
    icon: "🔵",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    isEnabled: false,
    numbers: [],
    minDeposit: "৳100",
    maxDeposit: "৳25,000",
    processingTime: "5-10 mins",
  },
  {
    id: "PM005",
    name: "Bank Transfer",
    code: "bank",
    icon: "🏦",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    isEnabled: true,
    numbers: [
      { id: "N005", number: "1234567890123", accountName: "EarnTube Ltd - DBBL", isActive: true },
    ],
    minDeposit: "৳500",
    maxDeposit: "৳500,000",
    processingTime: "1-24 hours",
  },
];

// Payment Method Card Component
function PaymentMethodCard({ 
  method, 
  onToggle, 
  onManageNumbers,
  onEditSettings,
}: { 
  method: PaymentMethod; 
  onToggle: () => void;
  onManageNumbers: () => void;
  onEditSettings: () => void;
}) {
  const activeNumbers = method.numbers.filter(n => n.isActive).length;

  return (
    <div className={cn(
      "p-5 rounded-2xl border-2 bg-card transition-all duration-300",
      method.isEnabled ? "border-success/30 shadow-md" : "border-muted opacity-70"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl", method.bgColor)}>
            {method.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg">{method.name}</h3>
            <p className="text-xs text-muted-foreground uppercase font-mono">{method.code}</p>
          </div>
        </div>
        <Switch 
          checked={method.isEnabled}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-success"
        />
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Badge 
          variant="outline" 
          className={cn(
            "font-medium",
            method.isEnabled ? "badge-success" : "badge-destructive"
          )}
        >
          <span className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            method.isEnabled ? "bg-success animate-pulse" : "bg-destructive"
          )} />
          {method.isEnabled ? "Active" : "Inactive"}
        </Badge>
        <Badge variant="secondary" className="font-mono">
          {activeNumbers} numbers
        </Badge>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-2 rounded-lg bg-muted/50 text-center">
          <p className="text-[10px] text-muted-foreground">Min</p>
          <p className="text-sm font-semibold">{method.minDeposit}</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/50 text-center">
          <p className="text-[10px] text-muted-foreground">Max</p>
          <p className="text-sm font-semibold">{method.maxDeposit}</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/50 text-center">
          <p className="text-[10px] text-muted-foreground">Time</p>
          <p className="text-xs font-medium">{method.processingTime}</p>
        </div>
      </div>

      {/* Numbers Preview */}
      {method.numbers.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-muted/30 border">
          <p className="text-xs text-muted-foreground mb-2">Payment Numbers:</p>
          <div className="space-y-1">
            {method.numbers.slice(0, 2).map((num) => (
              <div key={num.id} className="flex items-center justify-between">
                <span className="text-sm font-mono">{num.number}</span>
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  num.isActive ? "bg-success" : "bg-muted-foreground"
                )} />
              </div>
            ))}
            {method.numbers.length > 2 && (
              <p className="text-xs text-muted-foreground">+{method.numbers.length - 2} more</p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1 gap-1"
          onClick={onManageNumbers}
        >
          <Phone className="w-3.5 h-3.5" />
          Numbers
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 gap-1"
          onClick={onEditSettings}
        >
          <Settings className="w-3.5 h-3.5" />
          Settings
        </Button>
      </div>
    </div>
  );
}

// Manage Numbers Dialog
interface NumbersDialogProps {
  open: boolean;
  onClose: () => void;
  method: PaymentMethod | null;
  onSave: (numbers: PaymentNumber[]) => void;
}

function NumbersDialog({ open, onClose, method, onSave }: NumbersDialogProps) {
  const [numbers, setNumbers] = useState<PaymentNumber[]>(method?.numbers || []);
  const [newNumber, setNewNumber] = useState("");
  const [newAccountName, setNewAccountName] = useState("");

  const handleAddNumber = () => {
    if (!newNumber || !newAccountName) {
      toast({ title: "Error", description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    const newPaymentNumber: PaymentNumber = {
      id: `N${Date.now()}`,
      number: newNumber,
      accountName: newAccountName,
      isActive: true,
    };

    setNumbers([...numbers, newPaymentNumber]);
    setNewNumber("");
    setNewAccountName("");
    toast({ title: "Number Added", description: `${newNumber} has been added.` });
  };

  const handleToggleNumber = (id: string) => {
    setNumbers(numbers.map(n => n.id === id ? { ...n, isActive: !n.isActive } : n));
  };

  const handleDeleteNumber = (id: string) => {
    setNumbers(numbers.filter(n => n.id !== id));
    toast({ title: "Number Removed", variant: "destructive" });
  };

  const handleSave = () => {
    onSave(numbers);
    onClose();
  };

  if (!method) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{method.icon}</span>
            {method.name} - Payment Numbers
          </DialogTitle>
          <DialogDescription>
            Manage payment numbers for receiving deposits
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Add New Number */}
          <div className="p-4 rounded-lg border bg-muted/30">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Number
            </h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Phone/Account Number</Label>
                <Input 
                  placeholder="e.g., 01712345678"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Account Holder Name</Label>
                <Input 
                  placeholder="e.g., EarnTube Official"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleAddNumber} 
                className="w-full gap-2 bg-success hover:bg-success/90 text-white"
              >
                <Plus className="w-4 h-4" />
                Add Number
              </Button>
            </div>
          </div>

          {/* Existing Numbers */}
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Existing Numbers ({numbers.length})
            </h4>
            
            {numbers.length === 0 ? (
              <div className="p-4 rounded-lg border border-dashed text-center text-muted-foreground">
                No payment numbers added yet
              </div>
            ) : (
              <div className="space-y-2">
                {numbers.map((num) => (
                  <div 
                    key={num.id} 
                    className={cn(
                      "p-3 rounded-lg border flex items-center justify-between",
                      num.isActive ? "bg-card" : "bg-muted/50 opacity-60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        num.isActive ? "bg-success animate-pulse" : "bg-muted-foreground"
                      )} />
                      <div>
                        <p className="font-mono font-medium">{num.number}</p>
                        <p className="text-xs text-muted-foreground">{num.accountName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={num.isActive}
                        onCheckedChange={() => handleToggleNumber(num.id)}
                        className="data-[state=checked]:bg-success"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteNumber(num.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-success hover:bg-success/90 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Settings Dialog
interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  method: PaymentMethod | null;
  onSave: (settings: Partial<PaymentMethod>) => void;
}

function SettingsDialog({ open, onClose, method, onSave }: SettingsDialogProps) {
  const [formData, setFormData] = useState({
    minDeposit: method?.minDeposit || "",
    maxDeposit: method?.maxDeposit || "",
    processingTime: method?.processingTime || "",
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
    toast({ title: "Settings Updated", description: `${method?.name} settings have been updated.` });
  };

  if (!method) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{method.icon}</span>
            {method.name} - Settings
          </DialogTitle>
          <DialogDescription>
            Configure deposit limits and processing time
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Deposit</Label>
              <Input 
                placeholder="e.g., ৳100"
                value={formData.minDeposit}
                onChange={(e) => setFormData({ ...formData, minDeposit: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Deposit</Label>
              <Input 
                placeholder="e.g., ৳50,000"
                value={formData.maxDeposit}
                onChange={(e) => setFormData({ ...formData, maxDeposit: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Processing Time</Label>
            <Input 
              placeholder="e.g., Instant"
              value={formData.processingTime}
              onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
            />
          </div>

          {!method.isEnabled && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/30">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-warning">Payment Method Disabled</p>
                <p className="text-sm text-muted-foreground">
                  This payment method is currently disabled. Enable it to allow deposits.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-success hover:bg-success/90 text-white">
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Page Component
const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [numbersDialogOpen, setNumbersDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const handleToggleMethod = (methodId: string) => {
    setPaymentMethods(paymentMethods.map(m => {
      if (m.id === methodId) {
        const newStatus = !m.isEnabled;
        toast({ 
          title: newStatus ? "Payment Method Enabled" : "Payment Method Disabled",
          description: `${m.name} has been ${newStatus ? "enabled" : "disabled"}.`,
          variant: newStatus ? "default" : "destructive",
        });
        return { ...m, isEnabled: newStatus };
      }
      return m;
    }));
  };

  const handleManageNumbers = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setNumbersDialogOpen(true);
  };

  const handleEditSettings = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setSettingsDialogOpen(true);
  };

  const handleSaveNumbers = (numbers: PaymentNumber[]) => {
    if (!selectedMethod) return;
    setPaymentMethods(paymentMethods.map(m => 
      m.id === selectedMethod.id ? { ...m, numbers } : m
    ));
    toast({ title: "Numbers Updated", description: `${selectedMethod.name} numbers have been updated.` });
  };

  const handleSaveSettings = (settings: Partial<PaymentMethod>) => {
    if (!selectedMethod) return;
    setPaymentMethods(paymentMethods.map(m => 
      m.id === selectedMethod.id ? { ...m, ...settings } : m
    ));
  };

  const activeMethodsCount = paymentMethods.filter(m => m.isEnabled).length;
  const totalNumbersCount = paymentMethods.reduce((sum, m) => sum + m.numbers.filter(n => n.isActive).length, 0);

  return (
    <AdminLayout title="Payment Methods">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Methods" value={String(paymentMethods.length)} icon={CreditCard} variant="info" index={0} />
          <MiniStat title="Active Methods" value={String(activeMethodsCount)} icon={CheckCircle} variant="success" index={1} />
          <MiniStat title="Inactive Methods" value={String(paymentMethods.length - activeMethodsCount)} icon={XCircle} variant="destructive" index={2} />
          <MiniStat title="Active Numbers" value={String(totalNumbersCount)} icon={Phone} variant="warning" index={3} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Payment Gateways</h2>
            <p className="text-sm text-muted-foreground">Manage your deposit payment methods and numbers</p>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onToggle={() => handleToggleMethod(method.id)}
              onManageNumbers={() => handleManageNumbers(method)}
              onEditSettings={() => handleEditSettings(method)}
            />
          ))}
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-xl border bg-muted/30">
          <div className="flex items-start gap-3">
            <Wallet className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">How Payment Methods Work</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Users will see only the enabled payment methods when making deposits. 
                Each method can have multiple payment numbers. Users will be shown a random active number 
                when they select a payment method for deposit.
              </p>
            </div>
          </div>
        </div>

        {/* Dialogs */}
        <NumbersDialog
          open={numbersDialogOpen}
          onClose={() => setNumbersDialogOpen(false)}
          method={selectedMethod}
          onSave={handleSaveNumbers}
        />

        <SettingsDialog
          open={settingsDialogOpen}
          onClose={() => setSettingsDialogOpen(false)}
          method={selectedMethod}
          onSave={handleSaveSettings}
        />
      </div>
    </AdminLayout>
  );
};

export default PaymentMethodsPage;
