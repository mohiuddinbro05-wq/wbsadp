import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column, TransactionCard } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, Clock, CheckCircle, XCircle, TrendingDown, User, Phone, Wallet, Calendar, Hash, CreditCard, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Withdrawal {
  id: string;
  oderId: string;
  user: string;
  phone: string;
  email: string;
  profileId: string;
  method: string;
  accountNo: string;
  accountHolder: string;
  amount: string;
  fee: string;
  netAmount: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
  time: string;
  balance: string;
  totalWithdrawals: number;
}

const withdrawals: Withdrawal[] = [
  { id: "WD001", oderId: "ORD-2026-001", user: "আহমেদ হোসেন", phone: "01712345678", email: "ahmed@example.com", profileId: "USR-10045", method: "bKash", accountNo: "01712345678", accountHolder: "Ahmed Hossain", amount: "৳5,000", fee: "৳25", netAmount: "৳4,975", status: "pending", date: "2026-01-22", time: "10:30 AM", balance: "৳15,000", totalWithdrawals: 12 },
  { id: "WD002", oderId: "ORD-2026-002", user: "করিম উদ্দিন", phone: "01898765432", email: "karim@example.com", profileId: "USR-10089", method: "Nagad", accountNo: "01898765432", accountHolder: "Karim Uddin", amount: "৳3,500", fee: "৳17", netAmount: "৳3,483", status: "pending", date: "2026-01-22", time: "11:45 AM", balance: "৳8,500", totalWithdrawals: 5 },
  { id: "WD003", oderId: "ORD-2026-003", user: "সোহেল রানা", phone: "01556789012", email: "sohel@example.com", profileId: "USR-10112", method: "Rocket", accountNo: "01556789012", accountHolder: "Sohel Rana", amount: "৳2,000", fee: "৳10", netAmount: "৳1,990", status: "approved", date: "2026-01-21", time: "09:15 AM", balance: "৳5,200", totalWithdrawals: 8 },
  { id: "WD004", oderId: "ORD-2026-004", user: "জাহিদ হাসান", phone: "01612345678", email: "jahid@example.com", profileId: "USR-10156", method: "bKash", accountNo: "01612345678", accountHolder: "Jahid Hasan", amount: "৳7,500", fee: "৳37", netAmount: "৳7,463", status: "rejected", date: "2026-01-21", time: "02:30 PM", balance: "৳22,000", totalWithdrawals: 15 },
  { id: "WD005", oderId: "ORD-2026-005", user: "মাহমুদুল হক", phone: "01812345678", email: "mahmud@example.com", profileId: "USR-10178", method: "Nagad", accountNo: "01812345678", accountHolder: "Mahmudul Haque", amount: "৳4,200", fee: "৳21", netAmount: "৳4,179", status: "completed", date: "2026-01-20", time: "04:00 PM", balance: "৳12,300", totalWithdrawals: 20 },
  { id: "WD006", oderId: "ORD-2026-006", user: "রফিক ইসলাম", phone: "01912345678", email: "rafiq@example.com", profileId: "USR-10201", method: "bKash", accountNo: "01912345678", accountHolder: "Rafiq Islam", amount: "৳6,000", fee: "৳30", netAmount: "৳5,970", status: "pending", date: "2026-01-22", time: "12:00 PM", balance: "৳18,500", totalWithdrawals: 9 },
  { id: "WD007", oderId: "ORD-2026-007", user: "নাসির আহমেদ", phone: "01412345678", email: "nasir@example.com", profileId: "USR-10234", method: "Rocket", accountNo: "01412345678", accountHolder: "Nasir Ahmed", amount: "৳8,500", fee: "৳42", netAmount: "৳8,458", status: "pending", date: "2026-01-22", time: "01:15 PM", balance: "৳25,000", totalWithdrawals: 18 },
];

interface ActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  withdrawal: Withdrawal | null;
  action: "approve" | "reject";
  onConfirm: () => void;
}

function ActionDialog({ open, onOpenChange, withdrawal, action, onConfirm }: ActionDialogProps) {
  if (!withdrawal) return null;

  const isApprove = action === "approve";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl",
              isApprove ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}>
              {isApprove ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <span>{isApprove ? "Approve Withdrawal" : "Reject Withdrawal"}</span>
          </DialogTitle>
          <DialogDescription>
            {isApprove 
              ? "Please review all details before approving this withdrawal request."
              : "Please review the details before rejecting this withdrawal request."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* User Profile Section */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              User Profile
            </h4>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-xl font-bold shrink-0">
                {withdrawal.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-bold text-foreground text-lg">{withdrawal.user}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Hash className="w-3.5 h-3.5" />
                  <span className="font-mono">{withdrawal.profileId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{withdrawal.phone}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {withdrawal.totalWithdrawals} Withdrawals
              </Badge>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Details
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono font-semibold text-sm">{withdrawal.oderId}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Withdrawal ID</p>
                <p className="font-mono font-semibold text-sm">{withdrawal.id}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Method</p>
                <p className="font-semibold text-sm">{withdrawal.method}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Account No</p>
                <p className="font-mono font-semibold text-sm">{withdrawal.accountNo}</p>
              </div>
              <div className="col-span-2 bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Account Holder Name</p>
                <p className="font-semibold">{withdrawal.accountHolder}</p>
              </div>
            </div>
          </div>

          {/* Amount Details */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Amount Details
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Requested Amount</span>
                <span className="font-semibold text-lg">{withdrawal.amount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="font-medium text-destructive">-{withdrawal.fee}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-muted-foreground">Net Amount</span>
                <span className="font-bold text-xl text-success">{withdrawal.netAmount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border bg-primary/5 rounded-lg px-3 -mx-1 mt-2">
                <span className="text-muted-foreground">Current Balance</span>
                <span className="font-bold text-primary">{withdrawal.balance}</span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{withdrawal.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{withdrawal.time}</span>
            </div>
          </div>

          {/* Warning for Reject */}
          {!isApprove && (
            <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Warning</p>
                <p className="text-sm text-muted-foreground">
                  Rejecting this request will return the amount to the user's wallet balance.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className={cn(
              "gap-2 rounded-xl",
              isApprove 
                ? "bg-success hover:bg-success/90 text-white" 
                : "bg-destructive hover:bg-destructive/90 text-white"
            )}
          >
            {isApprove ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            {isApprove ? "Confirm Approval" : "Confirm Rejection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Withdrawals = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");

  const openActionDialog = (withdrawal: Withdrawal, action: "approve" | "reject") => {
    setSelectedWithdrawal(withdrawal);
    setActionType(action);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedWithdrawal) return;
    
    if (actionType === "approve") {
      toast({
        title: "✅ Withdrawal Approved",
        description: `Withdrawal ${selectedWithdrawal.id} for ${selectedWithdrawal.user} has been approved.`,
      });
    } else {
      toast({
        title: "❌ Withdrawal Rejected",
        description: `Withdrawal ${selectedWithdrawal.id} for ${selectedWithdrawal.user} has been rejected.`,
        variant: "destructive",
      });
    }
    setDialogOpen(false);
  };

  const columns: Column<Withdrawal>[] = [
    { key: "id", label: "ID", className: "font-mono text-sm" },
    { 
      key: "user", 
      label: "User",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
            {String(value).charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-foreground">{String(value)}</p>
            <p className="text-xs text-muted-foreground font-mono">{row.profileId}</p>
          </div>
        </div>
      ),
    },
    { 
      key: "method", 
      label: "Method",
      render: (value) => (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted font-medium text-sm">
          {String(value)}
        </span>
      ),
    },
    { 
      key: "accountNo", 
      label: "Account", 
      className: "font-mono text-sm",
      hideOnMobile: true,
    },
    { 
      key: "amount", 
      label: "Amount",
      render: (value) => (
        <span className="text-lg font-bold text-destructive">-{String(value)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value as Withdrawal["status"]} />,
    },
    { 
      key: "date", 
      label: "Date",
      hideOnMobile: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          {row.status === "pending" && (
            <>
              <Button 
                size="sm"
                className="h-9 px-3 gap-1.5 bg-success hover:bg-success/90 text-white rounded-lg"
                onClick={() => openActionDialog(row, "approve")}
              >
                <Check className="w-4 h-4" />
                <span className="hidden xl:inline">Approve</span>
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="h-9 px-3 gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10 rounded-lg"
                onClick={() => openActionDialog(row, "reject")}
              >
                <X className="w-4 h-4" />
                <span className="hidden xl:inline">Reject</span>
              </Button>
            </>
          )}
          <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const statusFilters = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "completed", label: "Completed" },
  ];

  const methodFilters = [
    { value: "bkash", label: "bKash" },
    { value: "nagad", label: "Nagad" },
    { value: "rocket", label: "Rocket" },
  ];

  const renderMobileCard = (row: Withdrawal, index: number) => (
    <TransactionCard
      key={row.id}
      id={row.id}
      user={row.user}
      phone={row.phone}
      method={row.method}
      amount={row.amount}
      status={row.status}
      date={row.date}
      type="withdrawal"
      accountNo={row.accountNo}
      index={index}
      actions={
        row.status === "pending" ? (
          <>
            <Button 
              size="sm"
              className="flex-1 h-10 gap-2 bg-success hover:bg-success/90 text-white rounded-xl"
              onClick={() => openActionDialog(row, "approve")}
            >
              <Check className="w-4 h-4" />
              Approve
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="flex-1 h-10 gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 rounded-xl"
              onClick={() => openActionDialog(row, "reject")}
            >
              <X className="w-4 h-4" />
              Reject
            </Button>
          </>
        ) : (
          <Button 
            size="sm"
            variant="outline"
            className="flex-1 h-10 gap-2 rounded-xl"
          >
            <Eye className="w-4 h-4" />
            View Details
          </Button>
        )
      }
    />
  );

  return (
    <AdminLayout title="Withdrawals">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Pending" value="23" icon={Clock} variant="warning" index={0} />
          <MiniStat title="Approved Today" value="15" icon={CheckCircle} variant="success" index={1} />
          <MiniStat title="Rejected" value="3" icon={XCircle} variant="destructive" index={2} />
          <MiniStat title="Total Amount" value="৳2,35,000" icon={TrendingDown} variant="info" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={withdrawals}
          title="Withdrawal Requests"
          searchPlaceholder="Search by user, phone..."
          filters={[
            { key: "status", label: "Status", options: statusFilters },
            { key: "method", label: "Method", options: methodFilters },
          ]}
          onExport={() => toast({ title: "📥 Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "🔄 Refreshed", description: "Data has been refreshed." })}
          mobileCardRender={renderMobileCard}
        />
      </div>

      {/* Action Dialog */}
      <ActionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        withdrawal={selectedWithdrawal}
        action={actionType}
        onConfirm={handleConfirm}
      />
    </AdminLayout>
  );
};

export default Withdrawals;
