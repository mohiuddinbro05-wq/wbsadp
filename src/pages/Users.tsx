import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, Ban, UserCheck, Users, UserPlus, UserX, UserCog, Phone, Mail, Calendar, Wallet, Gift, CreditCard, History, AlertTriangle, Shield, ShieldCheck, TrendingUp, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  profileId: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  balance: string;
  balanceNum: number;
  status: "active" | "banned" | "pending";
  joinDate: string;
  referrals: number;
  totalDeposit: string;
  totalWithdraw: string;
  referredBy?: string;
  turnover: number;
  currentTurnover: number;
}

const users: User[] = [
  { id: "USR001", profileId: "PRF-2025-001", name: "আহমেদ হোসেন", phone: "01712345678", email: "ahmed@example.com", password: "Ahmed@123", balance: "৳15,000", balanceNum: 15000, status: "active", joinDate: "2025-12-15", referrals: 12, totalDeposit: "৳85,000", totalWithdraw: "৳70,000", referredBy: "করিম উদ্দিন", turnover: 50000, currentTurnover: 45000 },
  { id: "USR002", profileId: "PRF-2025-002", name: "রাহেলা খাতুন", phone: "01898765432", email: "rahela@example.com", password: "Rahela@456", balance: "৳8,500", balanceNum: 8500, status: "active", joinDate: "2025-12-20", referrals: 8, totalDeposit: "৳45,000", totalWithdraw: "৳36,500", turnover: 30000, currentTurnover: 30000 },
  { id: "USR003", profileId: "PRF-2025-003", name: "করিম উদ্দিন", phone: "01556789012", email: "karim@example.com", password: "Karim@789", balance: "৳0", balanceNum: 0, status: "banned", joinDate: "2025-11-10", referrals: 0, totalDeposit: "৳12,000", totalWithdraw: "৳12,000", turnover: 0, currentTurnover: 0 },
  { id: "USR004", profileId: "PRF-2025-004", name: "নাজমা বেগম", phone: "01612345678", email: "nazma@example.com", password: "Nazma@321", balance: "৳22,300", balanceNum: 22300, status: "active", joinDate: "2026-01-05", referrals: 15, totalDeposit: "৳120,000", totalWithdraw: "৳97,700", referredBy: "আহমেদ হোসেন", turnover: 100000, currentTurnover: 85000 },
  { id: "USR005", profileId: "PRF-2025-005", name: "সোহেল রানা", phone: "01812345678", email: "sohel@example.com", password: "Sohel@654", balance: "৳5,750", balanceNum: 5750, status: "pending", joinDate: "2026-01-20", referrals: 3, totalDeposit: "৳15,000", totalWithdraw: "৳9,250", turnover: 20000, currentTurnover: 5000 },
  { id: "USR006", profileId: "PRF-2025-006", name: "মাহমুদ হাসান", phone: "01912345678", email: "mahmud@example.com", password: "Mahmud@987", balance: "৳18,200", balanceNum: 18200, status: "active", joinDate: "2025-10-25", referrals: 20, totalDeposit: "৳200,000", totalWithdraw: "৳181,800", turnover: 150000, currentTurnover: 150000 },
  { id: "USR007", profileId: "PRF-2025-007", name: "ফারজানা আক্তার", phone: "01312345678", email: "farzana@example.com", password: "Farzana@111", balance: "৳3,100", balanceNum: 3100, status: "pending", joinDate: "2026-01-21", referrals: 0, totalDeposit: "৳5,000", totalWithdraw: "৳1,900", turnover: 10000, currentTurnover: 2000 },
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
  action: "view" | "ban" | "unban" | "approve" | "turnover" | null;
  onConfirm: (turnoverAmount?: number) => void;
}

function TurnoverProgress({ current, target }: { current: number; target: number }) {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const canWithdraw = current >= target;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">টার্নওভার অগ্রগতি</span>
        <span className={cn("font-medium", canWithdraw ? "text-success" : "text-warning")}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <Progress value={percentage} className={cn("h-2", canWithdraw && "[&>div]:bg-success")} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>৳{current.toLocaleString()}</span>
        <span>৳{target.toLocaleString()}</span>
      </div>
      {!canWithdraw && target > 0 && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          আরো ৳{(target - current).toLocaleString()} টার্নওভার প্রয়োজন
        </p>
      )}
      {canWithdraw && target > 0 && (
        <p className="text-xs text-success flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          উত্তোলনের জন্য যোগ্য
        </p>
      )}
    </div>
  );
}

function ActionDialog({ open, onClose, user, action, onConfirm }: ActionDialogProps) {
  const [turnoverAmount, setTurnoverAmount] = useState<number>(0);

  if (!user) return null;

  // Reset turnover amount when user changes
  if (action === "turnover" && turnoverAmount === 0 && user.turnover > 0) {
    setTurnoverAmount(user.turnover);
  }

  const actionConfig = {
    view: { title: "User Details", confirmText: "", confirmClass: "", icon: Eye },
    ban: { title: "Ban User", confirmText: "Confirm Ban", confirmClass: "bg-destructive hover:bg-destructive/90", icon: Ban },
    unban: { title: "Unban User", confirmText: "Confirm Unban", confirmClass: "bg-success hover:bg-success/90", icon: UserCheck },
    approve: { title: "Approve User", confirmText: "Confirm Approval", confirmClass: "bg-success hover:bg-success/90", icon: ShieldCheck },
    turnover: { title: "টার্নওভার সেট করুন", confirmText: "সেভ করুন", confirmClass: "bg-primary hover:bg-primary/90", icon: Target },
  };

  const config = action ? actionConfig[action] : actionConfig.view;

  const handleConfirmClick = () => {
    if (action === "turnover") {
      onConfirm(turnoverAmount);
    } else {
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <config.icon className="w-5 h-5" />
            {config.title}
          </DialogTitle>
          <DialogDescription>
            {action === "turnover" 
              ? "এই ইউজারের জন্য টার্নওভার পরিমাণ সেট করুন"
              : "Complete details for user account"
            }
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

          {/* Turnover Section - Always visible in view and turnover actions */}
          {(action === "view" || action === "turnover") && (
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                টার্নওভার তথ্য
              </h4>
              
              {action === "turnover" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">বর্তমান টার্নওভার</p>
                      <p className="text-lg font-bold text-primary">৳{user.currentTurnover.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">প্রয়োজনীয় টার্নওভার</p>
                      <p className="text-lg font-bold text-warning">৳{user.turnover.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="turnover">নতুন টার্নওভার পরিমাণ (৳)</Label>
                    <Input
                      id="turnover"
                      type="number"
                      value={turnoverAmount}
                      onChange={(e) => setTurnoverAmount(Number(e.target.value))}
                      placeholder="টার্নওভার পরিমাণ লিখুন"
                      min={0}
                    />
                    <p className="text-xs text-muted-foreground">
                      এই পরিমাণ টার্নওভার সম্পন্ন না হলে ইউজার উত্তোলন করতে পারবে না
                    </p>
                  </div>

                  {turnoverAmount > 0 && (
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                      <p className="text-sm text-warning flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        ইউজারকে আরো ৳{Math.max(0, turnoverAmount - user.currentTurnover).toLocaleString()} টার্নওভার করতে হবে
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">বর্তমান টার্নওভার</p>
                      <p className="text-lg font-bold text-primary">৳{user.currentTurnover.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">প্রয়োজনীয় টার্নওভার</p>
                      <p className="text-lg font-bold text-warning">৳{user.turnover.toLocaleString()}</p>
                    </div>
                  </div>
                  <TurnoverProgress current={user.currentTurnover} target={user.turnover} />
                </div>
              )}
            </div>
          )}

          {action === "view" && (
            <>
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
                  একাউন্ট তথ্য
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground">Profile ID</span>
                    <span className="font-mono text-sm">{user.profileId}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground">যোগদান তারিখ</span>
                    <span className="text-sm font-medium">{user.joinDate}</span>
                  </div>
                </div>
              </div>
            </>
          )}

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
              onClick={handleConfirmClick}
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
  const [dialogAction, setDialogAction] = useState<"view" | "ban" | "unban" | "approve" | "turnover" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usersData, setUsersData] = useState<User[]>(users);

  const openDialog = (user: User, action: "view" | "ban" | "unban" | "approve" | "turnover") => {
    setSelectedUser(user);
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = (turnoverAmount?: number) => {
    if (!selectedUser || !dialogAction) return;

    if (dialogAction === "turnover" && turnoverAmount !== undefined) {
      setUsersData(prev => prev.map(u => 
        u.id === selectedUser.id 
          ? { ...u, turnover: turnoverAmount }
          : u
      ));
      toast({ 
        title: "টার্নওভার সেট হয়েছে", 
        description: `${selectedUser.name} এর জন্য ৳${turnoverAmount.toLocaleString()} টার্নওভার সেট করা হয়েছে।` 
      });
    } else {
      const messages = {
        ban: { title: "User Banned", description: `${selectedUser.name} has been banned successfully.`, variant: "destructive" as const },
        unban: { title: "User Unbanned", description: `${selectedUser.name} has been unbanned successfully.` },
        approve: { title: "User Approved", description: `${selectedUser.name} has been approved successfully.` },
      };

      if (dialogAction !== "view" && dialogAction !== "turnover") {
        toast(messages[dialogAction]);
      }
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
      key: "turnover",
      label: "Turnover",
      render: (_, row) => {
        const percentage = row.turnover > 0 ? Math.min((row.currentTurnover / row.turnover) * 100, 100) : 0;
        const canWithdraw = row.currentTurnover >= row.turnover;
        return (
          <div className="min-w-[120px]">
            <div className="flex justify-between text-xs mb-1">
              <span className={cn("font-medium", canWithdraw ? "text-success" : "text-warning")}>
                {percentage.toFixed(0)}%
              </span>
              <span className="text-muted-foreground">৳{row.turnover.toLocaleString()}</span>
            </div>
            <Progress value={percentage} className={cn("h-1.5", canWithdraw && "[&>div]:bg-success")} />
          </div>
        );
      },
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
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 hover:bg-warning/10 text-warning"
            onClick={() => openDialog(row, "turnover")}
            title="Set Turnover"
          >
            <Target className="w-4 h-4" />
          </Button>
          {row.status === "active" ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => openDialog(row, "ban")}
              title="Ban User"
            >
              <Ban className="w-4 h-4" />
            </Button>
          ) : row.status === "banned" ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => openDialog(row, "unban")}
              title="Unban User"
            >
              <UserCheck className="w-4 h-4" />
            </Button>
          ) : row.status === "pending" ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => openDialog(row, "approve")}
              title="Approve User"
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

  const mobileCardRender = (user: User) => {
    const turnoverPercentage = user.turnover > 0 ? Math.min((user.currentTurnover / user.turnover) * 100, 100) : 0;
    const canWithdraw = user.currentTurnover >= user.turnover;

    return (
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

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center p-2 rounded-lg bg-primary/10">
            <p className="text-[10px] text-muted-foreground">Balance</p>
            <p className="text-sm font-bold text-primary">{user.balance}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-success/10">
            <p className="text-[10px] text-muted-foreground">Referrals</p>
            <p className="text-sm font-bold text-success">{user.referrals}</p>
          </div>
        </div>

        {/* Turnover Section */}
        <div className="p-2 rounded-lg bg-muted/50 mb-3">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Target className="w-3 h-3" />
              টার্নওভার
            </span>
            <span className={cn("font-medium", canWithdraw ? "text-success" : "text-warning")}>
              {turnoverPercentage.toFixed(0)}%
            </span>
          </div>
          <Progress value={turnoverPercentage} className={cn("h-1.5 mb-1", canWithdraw && "[&>div]:bg-success")} />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>৳{user.currentTurnover.toLocaleString()}</span>
            <span>৳{user.turnover.toLocaleString()}</span>
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
          <Button 
            size="sm" 
            variant="outline"
            className="text-warning border-warning/30 hover:bg-warning/10"
            onClick={() => openDialog(user, "turnover")}
          >
            <Target className="w-3.5 h-3.5" />
          </Button>
          {user.status === "active" ? (
            <Button 
              size="sm" 
              variant="outline"
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={() => openDialog(user, "ban")}
            >
              <Ban className="w-3.5 h-3.5" />
            </Button>
          ) : user.status === "banned" ? (
            <Button 
              size="sm" 
              variant="outline"
              className="text-success border-success/30 hover:bg-success/10"
              onClick={() => openDialog(user, "unban")}
            >
              <UserCheck className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="outline"
              className="text-success border-success/30 hover:bg-success/10"
              onClick={() => openDialog(user, "approve")}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <AdminLayout title="Users">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Users" value="12,847" icon={Users} variant="info" index={0} />
          <MiniStat title="Active" value="11,523" icon={UserPlus} variant="success" index={1} />
          <MiniStat title="Banned" value="156" icon={UserX} variant="destructive" index={2} />
          <MiniStat title="Pending" value="1,168" icon={UserCog} variant="warning" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={usersData}
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
