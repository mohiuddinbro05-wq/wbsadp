import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, Ban, UserCheck, Users, UserPlus, UserX, UserCog, Phone, Mail, Calendar, Wallet, Gift, CreditCard, History, AlertTriangle, Shield, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  profileId: string;
  name: string;
  phone: string;
  email: string;
  balance: string;
  status: "active" | "banned" | "pending";
  joinDate: string;
  referrals: number;
  totalDeposit: string;
  totalWithdraw: string;
  referredBy?: string;
}

const users: User[] = [
  { id: "USR001", profileId: "PRF-2025-001", name: "আহমেদ হোসেন", phone: "01712345678", email: "ahmed@example.com", balance: "৳15,000", status: "active", joinDate: "2025-12-15", referrals: 12, totalDeposit: "৳85,000", totalWithdraw: "৳70,000", referredBy: "করিম উদ্দিন" },
  { id: "USR002", profileId: "PRF-2025-002", name: "রাহেলা খাতুন", phone: "01898765432", email: "rahela@example.com", balance: "৳8,500", status: "active", joinDate: "2025-12-20", referrals: 8, totalDeposit: "৳45,000", totalWithdraw: "৳36,500" },
  { id: "USR003", profileId: "PRF-2025-003", name: "করিম উদ্দিন", phone: "01556789012", email: "karim@example.com", balance: "৳0", status: "banned", joinDate: "2025-11-10", referrals: 0, totalDeposit: "৳12,000", totalWithdraw: "৳12,000" },
  { id: "USR004", profileId: "PRF-2025-004", name: "নাজমা বেগম", phone: "01612345678", email: "nazma@example.com", balance: "৳22,300", status: "active", joinDate: "2026-01-05", referrals: 15, totalDeposit: "৳120,000", totalWithdraw: "৳97,700", referredBy: "আহমেদ হোসেন" },
  { id: "USR005", profileId: "PRF-2025-005", name: "সোহেল রানা", phone: "01812345678", email: "sohel@example.com", balance: "৳5,750", status: "pending", joinDate: "2026-01-20", referrals: 3, totalDeposit: "৳15,000", totalWithdraw: "৳9,250" },
  { id: "USR006", profileId: "PRF-2025-006", name: "মাহমুদ হাসান", phone: "01912345678", email: "mahmud@example.com", balance: "৳18,200", status: "active", joinDate: "2025-10-25", referrals: 20, totalDeposit: "৳200,000", totalWithdraw: "৳181,800" },
  { id: "USR007", profileId: "PRF-2025-007", name: "ফারজানা আক্তার", phone: "01312345678", email: "farzana@example.com", balance: "৳3,100", status: "pending", joinDate: "2026-01-21", referrals: 0, totalDeposit: "৳5,000", totalWithdraw: "৳1,900" },
];

function UserStatusBadge({ status }: { status: User["status"] }) {
  const config = {
    active: { label: "Active", className: "badge-success" },
    banned: { label: "Banned", className: "badge-destructive" },
    pending: { label: "Pending", className: "badge-warning" },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={cn("font-medium border", className)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1.5",
        status === "active" && "bg-success",
        status === "banned" && "bg-destructive",
        status === "pending" && "bg-warning animate-pulse"
      )} />
      {label}
    </Badge>
  );
}

interface ActionDialogProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  action: "view" | "ban" | "unban" | "approve" | null;
  onConfirm: () => void;
}

function ActionDialog({ open, onClose, user, action, onConfirm }: ActionDialogProps) {
  if (!user) return null;

  const actionConfig = {
    view: { title: "User Details", confirmText: "", confirmClass: "", icon: Eye },
    ban: { title: "Ban User", confirmText: "Confirm Ban", confirmClass: "bg-destructive hover:bg-destructive/90", icon: Ban },
    unban: { title: "Unban User", confirmText: "Confirm Unban", confirmClass: "bg-success hover:bg-success/90", icon: UserCheck },
    approve: { title: "Approve User", confirmText: "Confirm Approval", confirmClass: "bg-success hover:bg-success/90", icon: ShieldCheck },
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
            Complete details for user account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Profile Section */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-sm text-muted-foreground font-mono">{user.profileId}</p>
                <UserStatusBadge status={user.status} />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Phone className="w-3.5 h-3.5" />
                <span className="text-xs">Phone</span>
              </div>
              <p className="font-mono font-medium">{user.phone}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-xs">Email</span>
              </div>
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
          </div>

          {/* Financial Information */}
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Financial Summary
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Balance</p>
                <p className="text-lg font-bold text-primary">{user.balance}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-success/10">
                <p className="text-xs text-muted-foreground mb-1">Total Deposit</p>
                <p className="text-lg font-bold text-success">{user.totalDeposit}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-warning/10">
                <p className="text-xs text-muted-foreground mb-1">Total Withdraw</p>
                <p className="text-lg font-bold text-warning">{user.totalWithdraw}</p>
              </div>
            </div>
          </div>

          {/* Referral Information */}
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Referral Information
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Total Referrals</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                  {user.referrals}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Referred By</span>
                <span className="text-sm font-medium">{user.referredBy || "—"}</span>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Account Information
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">User ID</span>
                <span className="font-mono text-sm">{user.id}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Join Date</span>
                <span className="text-sm font-medium">{user.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Warning for Ban/Unban */}
          {action === "ban" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive">Warning: Banning User</p>
                <p className="text-sm text-muted-foreground">
                  This user will be blocked from accessing the platform. Their balance of {user.balance} will be frozen.
                </p>
              </div>
            </div>
          )}

          {action === "unban" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
              <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-success">Unbanning User</p>
                <p className="text-sm text-muted-foreground">
                  This user's account will be restored and they can access the platform again.
                </p>
              </div>
            </div>
          )}

          {action === "approve" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
              <ShieldCheck className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-success">Approving User</p>
                <p className="text-sm text-muted-foreground">
                  This user's account will be activated and they can start using all platform features.
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

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogAction, setDialogAction] = useState<"view" | "ban" | "unban" | "approve" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = (user: User, action: "view" | "ban" | "unban" | "approve") => {
    setSelectedUser(user);
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedUser || !dialogAction) return;

    const messages = {
      ban: { title: "User Banned", description: `${selectedUser.name} has been banned successfully.`, variant: "destructive" as const },
      unban: { title: "User Unbanned", description: `${selectedUser.name} has been unbanned successfully.` },
      approve: { title: "User Approved", description: `${selectedUser.name} has been approved successfully.` },
    };

    if (dialogAction !== "view") {
      toast(messages[dialogAction]);
    }

    setDialogOpen(false);
  };

  const columns: Column<User>[] = [
    { key: "id", label: "ID", className: "font-mono" },
    { 
      key: "name", 
      label: "User",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shadow-md">
            {String(value).charAt(0)}
          </div>
          <div>
            <p className="font-medium">{String(value)}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "Phone", className: "font-mono text-sm" },
    { 
      key: "balance", 
      label: "Balance",
      render: (value) => <span className="font-bold text-primary">{String(value)}</span>,
    },
    { 
      key: "referrals", 
      label: "Referrals",
      render: (value) => (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
          {String(value)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <UserStatusBadge status={value as User["status"]} />,
    },
    { key: "joinDate", label: "Joined" },
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
              onClick={() => openDialog(row, "ban")}
            >
              <Ban className="w-4 h-4" />
            </Button>
          ) : row.status === "banned" ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => openDialog(row, "unban")}
            >
              <UserCheck className="w-4 h-4" />
            </Button>
          ) : row.status === "pending" ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => openDialog(row, "approve")}
            >
              <ShieldCheck className="w-4 h-4" />
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  const statusFilters = [
    { value: "active", label: "Active" },
    { value: "banned", label: "Banned" },
    { value: "pending", label: "Pending" },
  ];

  const mobileCardRender = (user: User) => (
    <div className="p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-lg font-bold shadow-md">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{user.name}</h3>
            <UserStatusBadge status={user.status} />
          </div>
          <p className="text-xs text-muted-foreground font-mono">{user.profileId}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 rounded-lg bg-primary/10">
          <p className="text-[10px] text-muted-foreground">Balance</p>
          <p className="text-sm font-bold text-primary">{user.balance}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-success/10">
          <p className="text-[10px] text-muted-foreground">Referrals</p>
          <p className="text-sm font-bold text-success">{user.referrals}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <p className="text-[10px] text-muted-foreground">Joined</p>
          <p className="text-sm font-medium">{user.joinDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={() => openDialog(user, "view")}
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          View
        </Button>
        {user.status === "active" ? (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => openDialog(user, "ban")}
          >
            <Ban className="w-3.5 h-3.5 mr-1" />
            Ban
          </Button>
        ) : user.status === "banned" ? (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 text-success border-success/30 hover:bg-success/10"
            onClick={() => openDialog(user, "unban")}
          >
            <UserCheck className="w-3.5 h-3.5 mr-1" />
            Unban
          </Button>
        ) : (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 text-success border-success/30 hover:bg-success/10"
            onClick={() => openDialog(user, "approve")}
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            Approve
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <AdminLayout title="Users">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Users" value="12,847" icon={Users} variant="info" index={0} />
          <MiniStat title="Active" value="11,523" icon={UserPlus} variant="success" index={1} />
          <MiniStat title="Banned" value="156" icon={UserX} variant="destructive" index={2} />
          <MiniStat title="Pending" value="1,168" icon={UserCog} variant="warning" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={users}
          title="All Users"
          searchPlaceholder="Search by name, email, phone..."
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
          user={selectedUser}
          action={dialogAction}
          onConfirm={handleConfirm}
        />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
