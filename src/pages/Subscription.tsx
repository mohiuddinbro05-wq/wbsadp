import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, CreditCard, Crown, Users, TrendingUp, Calendar, AlertTriangle, CheckCircle, XCircle, RefreshCw, Plus, Zap, Star, Gem, Trash2, Edit, Check, Video, Wallet, Headphones, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Package Interface
interface Package {
  id: string;
  name: string;
  icon: "zap" | "star" | "gem" | "crown";
  price: string;
  priceType: "one-time" | "monthly";
  monthlyEarnings: string;
  videosPerDay: number;
  perVideoRate: string;
  supportLevel: "basic" | "priority" | "premium" | "vip";
  withdrawalFrequency: "none" | "monthly" | "weekly" | "daily" | "instant";
  isPopular?: boolean;
  isActive: boolean;
}

// Subscription Interface
interface Subscription {
  id: string;
  profileId: string;
  userName: string;
  phone: string;
  plan: "starter" | "basic" | "premium" | "vip";
  amount: string;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

// Sample Packages
const initialPackages: Package[] = [
  { 
    id: "PKG001", 
    name: "Starter", 
    icon: "zap", 
    price: "৳999", 
    priceType: "one-time",
    monthlyEarnings: "৳1,500+",
    videosPerDay: 5,
    perVideoRate: "৳10",
    supportLevel: "basic",
    withdrawalFrequency: "weekly",
    isActive: true
  },
  { 
    id: "PKG002", 
    name: "Basic", 
    icon: "star", 
    price: "৳2,999", 
    priceType: "one-time",
    monthlyEarnings: "৳4,500+",
    videosPerDay: 10,
    perVideoRate: "৳15",
    supportLevel: "priority",
    withdrawalFrequency: "weekly",
    isActive: true
  },
  { 
    id: "PKG003", 
    name: "Premium", 
    icon: "gem", 
    price: "৳5,999", 
    priceType: "one-time",
    monthlyEarnings: "৳9,000+",
    videosPerDay: 20,
    perVideoRate: "৳20",
    supportLevel: "premium",
    withdrawalFrequency: "daily",
    isPopular: true,
    isActive: true
  },
  { 
    id: "PKG004", 
    name: "VIP", 
    icon: "crown", 
    price: "৳9,999", 
    priceType: "one-time",
    monthlyEarnings: "৳15,000+",
    videosPerDay: 30,
    perVideoRate: "৳25",
    supportLevel: "vip",
    withdrawalFrequency: "instant",
    isActive: true
  },
];

// Sample Subscriptions
const subscriptions: Subscription[] = [
  { id: "SUB001", profileId: "PRF-2025-001", userName: "আহমেদ হোসেন", phone: "01712345678", plan: "premium", amount: "৳5,999", status: "active", startDate: "2026-01-01", endDate: "2026-02-01", autoRenew: true },
  { id: "SUB002", profileId: "PRF-2025-002", userName: "রাহেলা খাতুন", phone: "01898765432", plan: "vip", amount: "৳9,999", status: "active", startDate: "2025-12-15", endDate: "2026-01-15", autoRenew: true },
  { id: "SUB003", profileId: "PRF-2025-003", userName: "করিম উদ্দিন", phone: "01556789012", plan: "starter", amount: "৳999", status: "expired", startDate: "2025-11-01", endDate: "2025-12-01", autoRenew: false },
  { id: "SUB004", profileId: "PRF-2025-004", userName: "নাজমা বেগম", phone: "01612345678", plan: "basic", amount: "৳2,999", status: "cancelled", startDate: "2025-12-20", endDate: "2026-01-20", autoRenew: false },
  { id: "SUB005", profileId: "PRF-2025-005", userName: "সোহেল রানা", phone: "01812345678", plan: "vip", amount: "৳9,999", status: "active", startDate: "2026-01-10", endDate: "2026-02-10", autoRenew: true },
];

// Icon Component
function PackageIcon({ icon, className }: { icon: Package["icon"]; className?: string }) {
  const icons = {
    zap: Zap,
    star: Star,
    gem: Gem,
    crown: Crown,
  };
  const IconComponent = icons[icon];
  return <IconComponent className={className} />;
}

// Package Card Component
function PackageCard({ 
  pkg, 
  onEdit, 
  onDelete, 
  onToggle 
}: { 
  pkg: Package; 
  onEdit: () => void; 
  onDelete: () => void; 
  onToggle: () => void;
}) {
  const iconColors = {
    zap: "bg-success/20 text-success",
    star: "bg-primary/20 text-primary",
    gem: "bg-purple-500/20 text-purple-500",
    crown: "bg-amber-500/20 text-amber-500",
  };

  const supportLabels = {
    basic: "Basic support",
    priority: "Priority support",
    premium: "Premium support",
    vip: "VIP 24/7 support",
  };

  const withdrawalLabels = {
    none: "No withdrawals",
    monthly: "Monthly withdrawals",
    weekly: "Weekly withdrawals",
    daily: "Daily withdrawals",
    instant: "Instant withdrawals",
  };

  return (
    <div className={cn(
      "relative p-6 rounded-2xl border-2 bg-card transition-all duration-300 hover:shadow-lg",
      pkg.isPopular && "border-success shadow-success/20",
      !pkg.isActive && "opacity-60"
    )}>
      {pkg.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-success text-white px-3">Popular</Badge>
        </div>
      )}

      {/* Icon */}
      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4", iconColors[pkg.icon])}>
        <PackageIcon icon={pkg.icon} className="w-7 h-7" />
      </div>

      {/* Name & Price */}
      <h3 className="text-xl font-bold text-center mb-2">{pkg.name}</h3>
      <div className="text-center mb-4">
        <span className="text-3xl font-bold">{pkg.price}</span>
        <span className="text-muted-foreground">/{pkg.priceType}</span>
      </div>

      {/* Monthly Earnings */}
      <div className="p-3 rounded-xl bg-muted/50 text-center mb-4">
        <p className="text-sm text-muted-foreground">Monthly Earnings</p>
        <p className="text-xl font-bold text-success">{pkg.monthlyEarnings}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        <li className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-success shrink-0" />
          <span>{pkg.videosPerDay} videos per day</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-success shrink-0" />
          <span>{pkg.perVideoRate} per video</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-success shrink-0" />
          <span>{supportLabels[pkg.supportLevel]}</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-success shrink-0" />
          <span>{withdrawalLabels[pkg.withdrawalFrequency]}</span>
        </li>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={onEdit}
        >
          <Edit className="w-3.5 h-3.5 mr-1" />
          Edit
        </Button>
        <Button 
          size="sm" 
          variant={pkg.isActive ? "outline" : "default"}
          className={cn("flex-1", pkg.isActive ? "text-warning border-warning/30" : "bg-success")}
          onClick={onToggle}
        >
          {pkg.isActive ? "Disable" : "Enable"}
        </Button>
        <Button 
          size="icon" 
          variant="outline"
          className="text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Status Badges
function SubscriptionStatusBadge({ status }: { status: Subscription["status"] }) {
  const config = {
    active: { label: "Active", className: "badge-success" },
    expired: { label: "Expired", className: "badge-warning" },
    cancelled: { label: "Cancelled", className: "badge-destructive" },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={cn("font-medium border", className)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1.5",
        status === "active" && "bg-success animate-pulse",
        status === "expired" && "bg-warning",
        status === "cancelled" && "bg-destructive"
      )} />
      {label}
    </Badge>
  );
}

function PlanBadge({ plan }: { plan: Subscription["plan"] }) {
  const config = {
    starter: { label: "Starter", className: "bg-success/10 text-success border-success/30", icon: Zap },
    basic: { label: "Basic", className: "bg-primary/10 text-primary border-primary/30", icon: Star },
    premium: { label: "Premium", className: "bg-purple-500/10 text-purple-500 border-purple-500/30", icon: Gem },
    vip: { label: "VIP", className: "bg-amber-500/10 text-amber-500 border-amber-500/30", icon: Crown },
  };

  const { label, className, icon: Icon } = config[plan];

  return (
    <Badge variant="outline" className={cn("font-semibold", className)}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
}

// Subscription Action Dialog
interface ActionDialogProps {
  open: boolean;
  onClose: () => void;
  subscription: Subscription | null;
  action: "view" | "cancel" | "renew" | null;
  onConfirm: () => void;
}

function ActionDialog({ open, onClose, subscription, action, onConfirm }: ActionDialogProps) {
  if (!subscription) return null;

  const actionConfig = {
    view: { title: "Subscription Details", confirmText: "", confirmClass: "", icon: Eye },
    cancel: { title: "Cancel Subscription", confirmText: "Confirm Cancel", confirmClass: "bg-destructive hover:bg-destructive/90", icon: XCircle },
    renew: { title: "Renew Subscription", confirmText: "Confirm Renew", confirmClass: "bg-success hover:bg-success/90", icon: RefreshCw },
  };

  const config = action ? actionConfig[action] : actionConfig.view;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <config.icon className="w-5 h-5" />
            {config.title}
          </DialogTitle>
          <DialogDescription>
            Complete subscription information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Profile */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-lg">
                {subscription.userName.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{subscription.userName}</h3>
                <p className="text-sm text-muted-foreground font-mono">{subscription.profileId}</p>
                <div className="flex items-center gap-2 mt-1">
                  <PlanBadge plan={subscription.plan} />
                  <SubscriptionStatusBadge status={subscription.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Subscription Details
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Plan</p>
                <PlanBadge plan={subscription.plan} />
              </div>
              <div className="text-center p-3 rounded-lg bg-success/10">
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-lg font-bold text-success">{subscription.amount}</p>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Duration
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Start Date</span>
                <span className="text-sm font-medium">{subscription.startDate}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">End Date</span>
                <span className="text-sm font-medium">{subscription.endDate}</span>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {action === "cancel" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive">Warning: Cancelling Subscription</p>
                <p className="text-sm text-muted-foreground">
                  The user will lose access to {subscription.plan} features immediately.
                </p>
              </div>
            </div>
          )}

          {action === "renew" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
              <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-success">Renewing Subscription</p>
                <p className="text-sm text-muted-foreground">
                  The subscription will be renewed. Amount: {subscription.amount}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {action && action !== "view" && (
            <Button 
              onClick={onConfirm}
              className={cn("text-white", config.confirmClass)}
            >
              {config.confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Add/Edit Package Dialog
interface PackageDialogProps {
  open: boolean;
  onClose: () => void;
  pkg: Package | null;
  onSave: (pkg: Partial<Package>) => void;
}

function PackageDialog({ open, onClose, pkg, onSave }: PackageDialogProps) {
  const [formData, setFormData] = useState<Partial<Package>>({
    name: "",
    icon: "zap",
    price: "",
    priceType: "one-time",
    monthlyEarnings: "",
    videosPerDay: 5,
    perVideoRate: "",
    supportLevel: "basic",
    withdrawalFrequency: "weekly",
    isActive: true,
    isPopular: false,
  });

  // Update form data when pkg changes
  useEffect(() => {
    if (pkg) {
      setFormData({
        name: pkg.name,
        icon: pkg.icon,
        price: pkg.price,
        priceType: pkg.priceType,
        monthlyEarnings: pkg.monthlyEarnings,
        videosPerDay: pkg.videosPerDay,
        perVideoRate: pkg.perVideoRate,
        supportLevel: pkg.supportLevel,
        withdrawalFrequency: pkg.withdrawalFrequency,
        isActive: pkg.isActive,
        isPopular: pkg.isPopular,
      });
    } else {
      setFormData({
        name: "",
        icon: "zap",
        price: "",
        priceType: "one-time",
        monthlyEarnings: "",
        videosPerDay: 5,
        perVideoRate: "",
        supportLevel: "basic",
        withdrawalFrequency: "weekly",
        isActive: true,
        isPopular: false,
      });
    }
  }, [pkg, open]);

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {pkg ? "Edit Package" : "Add New Package"}
          </DialogTitle>
          <DialogDescription>
            Configure subscription package details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Package Name *</Label>
              <Input 
                placeholder="e.g., Starter"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="flex gap-2">
                {(["zap", "star", "gem", "crown"] as const).map((icon) => (
                  <Button
                    key={icon}
                    type="button"
                    size="icon"
                    variant={formData.icon === icon ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, icon })}
                  >
                    <PackageIcon icon={icon} className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price *</Label>
              <Input 
                placeholder="e.g., ৳999"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Monthly Earnings</Label>
              <Input 
                placeholder="e.g., ৳1,500+"
                value={formData.monthlyEarnings || ""}
                onChange={(e) => setFormData({ ...formData, monthlyEarnings: e.target.value })}
              />
            </div>
          </div>

          {/* Video Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Videos Per Day</Label>
              <Input 
                type="number"
                placeholder="e.g., 5"
                value={formData.videosPerDay || ""}
                onChange={(e) => setFormData({ ...formData, videosPerDay: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Per Video Rate</Label>
              <Input 
                placeholder="e.g., ৳10"
                value={formData.perVideoRate || ""}
                onChange={(e) => setFormData({ ...formData, perVideoRate: e.target.value })}
              />
            </div>
          </div>

          {/* Support & Withdrawal */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Support Level</Label>
              <div className="flex flex-wrap gap-2">
                {(["basic", "priority", "premium", "vip"] as const).map((level) => (
                  <Button
                    key={level}
                    type="button"
                    size="sm"
                    variant={formData.supportLevel === level ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, supportLevel: level })}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Withdrawal</Label>
              <div className="flex flex-wrap gap-2">
                {(["none", "monthly", "weekly", "daily", "instant"] as const).map((freq) => (
                  <Button
                    key={freq}
                    type="button"
                    size="sm"
                    variant={formData.withdrawalFrequency === freq ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, withdrawalFrequency: freq })}
                  >
                    {freq}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">Mark as Popular</span>
            <Button
              type="button"
              size="sm"
              variant={formData.isPopular ? "default" : "outline"}
              onClick={() => setFormData({ ...formData, isPopular: !formData.isPopular })}
            >
              {formData.isPopular ? "Yes" : "No"}
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-success hover:bg-success/90 text-white">
            {pkg ? "Update Package" : "Add Package"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Page Component
const SubscriptionPage = () => {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [dialogAction, setDialogAction] = useState<"view" | "cancel" | "renew" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const openDialog = (subscription: Subscription, action: "view" | "cancel" | "renew") => {
    setSelectedSubscription(subscription);
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedSubscription || !dialogAction) return;

    const messages = {
      cancel: { title: "Subscription Cancelled", description: `${selectedSubscription.userName}'s subscription has been cancelled.`, variant: "destructive" as const },
      renew: { title: "Subscription Renewed", description: `${selectedSubscription.userName}'s subscription has been renewed.` },
    };

    if (dialogAction !== "view") {
      toast(messages[dialogAction]);
    }

    setDialogOpen(false);
  };

  const handleAddPackage = () => {
    setEditingPackage(null);
    setPackageDialogOpen(true);
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setPackageDialogOpen(true);
  };

  const handleSavePackage = (data: Partial<Package>) => {
    if (editingPackage) {
      setPackages(packages.map(p => p.id === editingPackage.id ? { ...p, ...data } : p));
      toast({ title: "Package Updated", description: `${data.name} has been updated.` });
    } else {
      const newPackage: Package = {
        id: `PKG${String(packages.length + 1).padStart(3, '0')}`,
        name: data.name || "",
        icon: data.icon || "zap",
        price: data.price || "",
        priceType: data.priceType || "one-time",
        monthlyEarnings: data.monthlyEarnings || "",
        videosPerDay: data.videosPerDay || 5,
        perVideoRate: data.perVideoRate || "",
        supportLevel: data.supportLevel || "basic",
        withdrawalFrequency: data.withdrawalFrequency || "weekly",
        isPopular: data.isPopular,
        isActive: true,
      };
      setPackages([...packages, newPackage]);
      toast({ title: "Package Added", description: `${data.name} has been added.` });
    }
  };

  const handleDeletePackage = (pkg: Package) => {
    setPackages(packages.filter(p => p.id !== pkg.id));
    toast({ title: "Package Deleted", description: `${pkg.name} has been deleted.`, variant: "destructive" });
  };

  const handleTogglePackage = (pkg: Package) => {
    setPackages(packages.map(p => p.id === pkg.id ? { ...p, isActive: !p.isActive } : p));
    toast({ 
      title: pkg.isActive ? "Package Disabled" : "Package Enabled", 
      description: `${pkg.name} has been ${pkg.isActive ? "disabled" : "enabled"}.` 
    });
  };

  const columns: Column<Subscription>[] = [
    { key: "id", label: "ID", className: "font-mono" },
    { 
      key: "userName", 
      label: "User",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shadow-md">
            {String(value).charAt(0)}
          </div>
          <div>
            <p className="font-medium">{String(value)}</p>
            <p className="text-xs text-muted-foreground font-mono">{row.profileId}</p>
          </div>
        </div>
      ),
    },
    { 
      key: "plan", 
      label: "Plan",
      render: (value) => <PlanBadge plan={value as Subscription["plan"]} />,
    },
    { 
      key: "amount", 
      label: "Amount",
      render: (value) => <span className="font-bold text-success">{String(value)}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <SubscriptionStatusBadge status={value as Subscription["status"]} />,
    },
    { key: "endDate", label: "Expires" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 hover:bg-primary/10"
            onClick={() => openDialog(row, "view")}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {row.status === "active" ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => openDialog(row, "cancel")}
            >
              <XCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => openDialog(row, "renew")}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const statusFilters = [
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const mobileCardRender = (sub: Subscription) => (
    <div className="p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-lg font-bold shadow-md">
          {sub.userName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{sub.userName}</h3>
            <SubscriptionStatusBadge status={sub.status} />
          </div>
          <p className="text-xs text-muted-foreground font-mono">{sub.profileId}</p>
          <PlanBadge plan={sub.plan} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 rounded-lg bg-success/10">
          <p className="text-[10px] text-muted-foreground">Amount</p>
          <p className="text-sm font-bold text-success">{sub.amount}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-primary/10">
          <p className="text-[10px] text-muted-foreground">Start</p>
          <p className="text-xs font-medium">{sub.startDate}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-warning/10">
          <p className="text-[10px] text-muted-foreground">Expires</p>
          <p className="text-xs font-medium">{sub.endDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={() => openDialog(sub, "view")}
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          View
        </Button>
        {sub.status === "active" ? (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => openDialog(sub, "cancel")}
          >
            <XCircle className="w-3.5 h-3.5 mr-1" />
            Cancel
          </Button>
        ) : (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 text-success border-success/30 hover:bg-success/10"
            onClick={() => openDialog(sub, "renew")}
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            Renew
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <AdminLayout title="Subscription">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Subscriptions" value="1,247" icon={Users} variant="info" index={0} />
          <MiniStat title="Active" value="892" icon={CheckCircle} variant="success" index={1} />
          <MiniStat title="Monthly Revenue" value="৳8.5L" icon={TrendingUp} variant="warning" index={2} />
          <MiniStat title="VIP Members" value="156" icon={Crown} variant="info" index={3} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="packages" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="gap-2">
              <Users className="w-4 h-4" />
              Subscribers
            </TabsTrigger>
          </TabsList>

          {/* Packages Tab */}
          <TabsContent value="packages" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Subscription Packages</h2>
                <p className="text-sm text-muted-foreground">Manage your subscription plans</p>
              </div>
              <Button onClick={handleAddPackage} className="gap-2 bg-success hover:bg-success/90 text-white">
                <Plus className="w-4 h-4" />
                Add Package
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onEdit={() => handleEditPackage(pkg)}
                  onDelete={() => handleDeletePackage(pkg)}
                  onToggle={() => handleTogglePackage(pkg)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="mt-6">
            <DataTable
              columns={columns}
              data={subscriptions}
              title="All Subscribers"
              searchPlaceholder="Search by name, phone, plan..."
              filters={[
                { key: "status", label: "Status", options: statusFilters },
              ]}
              onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
              onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
              mobileCardRender={mobileCardRender}
            />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <ActionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          subscription={selectedSubscription}
          action={dialogAction}
          onConfirm={handleConfirm}
        />

        <PackageDialog
          open={packageDialogOpen}
          onClose={() => setPackageDialogOpen(false)}
          pkg={editingPackage}
          onSave={handleSavePackage}
        />
      </div>
    </AdminLayout>
  );
};

export default SubscriptionPage;
