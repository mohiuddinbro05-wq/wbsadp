import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, CreditCard, Crown, Users, TrendingUp, Calendar, AlertTriangle, Ban, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Subscription {
  id: string;
  profileId: string;
  userName: string;
  phone: string;
  plan: "basic" | "premium" | "vip";
  amount: string;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

const subscriptions: Subscription[] = [
  { id: "SUB001", profileId: "PRF-2025-001", userName: "আহমেদ হোসেন", phone: "01712345678", plan: "premium", amount: "৳999", status: "active", startDate: "2026-01-01", endDate: "2026-02-01", autoRenew: true },
  { id: "SUB002", profileId: "PRF-2025-002", userName: "রাহেলা খাতুন", phone: "01898765432", plan: "vip", amount: "৳1,999", status: "active", startDate: "2025-12-15", endDate: "2026-01-15", autoRenew: true },
  { id: "SUB003", profileId: "PRF-2025-003", userName: "করিম উদ্দিন", phone: "01556789012", plan: "basic", amount: "৳499", status: "expired", startDate: "2025-11-01", endDate: "2025-12-01", autoRenew: false },
  { id: "SUB004", profileId: "PRF-2025-004", userName: "নাজমা বেগম", phone: "01612345678", plan: "premium", amount: "৳999", status: "cancelled", startDate: "2025-12-20", endDate: "2026-01-20", autoRenew: false },
  { id: "SUB005", profileId: "PRF-2025-005", userName: "সোহেল রানা", phone: "01812345678", plan: "vip", amount: "৳1,999", status: "active", startDate: "2026-01-10", endDate: "2026-02-10", autoRenew: true },
];

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
    basic: { label: "Basic", className: "bg-muted text-muted-foreground" },
    premium: { label: "Premium", className: "bg-primary/10 text-primary border-primary/30" },
    vip: { label: "VIP", className: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 border-amber-500/30" },
  };

  const { label, className } = config[plan];

  return (
    <Badge variant="outline" className={cn("font-semibold", className)}>
      {plan === "vip" && <Crown className="w-3 h-3 mr-1" />}
      {label}
    </Badge>
  );
}

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

          {/* Contact Info */}
          <div className="p-3 rounded-lg bg-muted/50 border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Phone</span>
              <span className="font-mono font-medium">{subscription.phone}</span>
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
            <div className="flex items-center justify-between p-2 mt-2 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Auto Renew</span>
              <Badge variant={subscription.autoRenew ? "default" : "secondary"}>
                {subscription.autoRenew ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>

          {/* Warning for Cancel */}
          {action === "cancel" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive">Warning: Cancelling Subscription</p>
                <p className="text-sm text-muted-foreground">
                  The user will lose access to {subscription.plan} features immediately. They will need to resubscribe to regain access.
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
                  The subscription will be renewed for another month. Amount: {subscription.amount}
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

const SubscriptionPage = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [dialogAction, setDialogAction] = useState<"view" | "cancel" | "renew" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Subscriptions" value="1,247" icon={Users} variant="info" index={0} />
          <MiniStat title="Active" value="892" icon={CheckCircle} variant="success" index={1} />
          <MiniStat title="Monthly Revenue" value="৳8.5L" icon={TrendingUp} variant="warning" index={2} />
          <MiniStat title="VIP Members" value="156" icon={Crown} variant="info" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={subscriptions}
          title="All Subscriptions"
          searchPlaceholder="Search by name, phone, plan..."
          filters={[
            { key: "status", label: "Status", options: statusFilters },
          ]}
          onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
          mobileCardRender={mobileCardRender}
        />

        {/* Action Dialog */}
        <ActionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          subscription={selectedSubscription}
          action={dialogAction}
          onConfirm={handleConfirm}
        />
      </div>
    </AdminLayout>
  );
};

export default SubscriptionPage;
