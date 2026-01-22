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
import { Eye, Clock, CheckCircle, XCircle, TrendingUp, Copy, Check, X, User, Phone, Wallet, Calendar, Hash, CreditCard, AlertTriangle, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Deposit {
  id: string;
  orderId: string;
  user: string;
  phone: string;
  email: string;
  profileId: string;
  method: string;
  transactionId: string;
  senderNumber: string;
  amount: string;
  bonus: string;
  totalAmount: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
  time: string;
  balance: string;
  totalDeposits: number;
}

const deposits: Deposit[] = [
  { id: "DP001", orderId: "ORD-DEP-001", user: "রাহেলা খাতুন", phone: "01712345678", email: "rahela@example.com", profileId: "USR-10045", method: "bKash", transactionId: "TRX123456", senderNumber: "01712345678", amount: "৳10,000", bonus: "৳100", totalAmount: "৳10,100", status: "completed", date: "2026-01-22", time: "09:30 AM", balance: "৳25,000", totalDeposits: 15 },
  { id: "DP002", orderId: "ORD-DEP-002", user: "নাজমা বেগম", phone: "01898765432", email: "nazma@example.com", profileId: "USR-10089", method: "Nagad", transactionId: "TRX789012", senderNumber: "01898765432", amount: "৳8,000", bonus: "৳80", totalAmount: "৳8,080", status: "completed", date: "2026-01-22", time: "10:15 AM", balance: "৳18,500", totalDeposits: 12 },
  { id: "DP003", orderId: "ORD-DEP-003", user: "ফাতেমা আক্তার", phone: "01556789012", email: "fatema@example.com", profileId: "USR-10112", method: "Rocket", transactionId: "TRX345678", senderNumber: "01556789012", amount: "৳5,500", bonus: "৳55", totalAmount: "৳5,555", status: "pending", date: "2026-01-21", time: "11:45 AM", balance: "৳12,000", totalDeposits: 8 },
  { id: "DP004", orderId: "ORD-DEP-004", user: "সাবরিনা ইসলাম", phone: "01612345678", email: "sabrina@example.com", profileId: "USR-10156", method: "bKash", transactionId: "TRX901234", senderNumber: "01612345678", amount: "৳12,000", bonus: "৳120", totalAmount: "৳12,120", status: "completed", date: "2026-01-21", time: "02:00 PM", balance: "৳32,000", totalDeposits: 20 },
  { id: "DP005", orderId: "ORD-DEP-005", user: "মোহাম্মদ আলী", phone: "01812345678", email: "ali@example.com", profileId: "USR-10178", method: "Bank Transfer", transactionId: "TRX567890", senderNumber: "01812345678", amount: "৳25,000", bonus: "৳250", totalAmount: "৳25,250", status: "pending", date: "2026-01-20", time: "03:30 PM", balance: "৳45,000", totalDeposits: 25 },
  { id: "DP006", orderId: "ORD-DEP-006", user: "আবদুল করিম", phone: "01912345678", email: "karim@example.com", profileId: "USR-10201", method: "bKash", transactionId: "TRX234567", senderNumber: "01912345678", amount: "৳15,000", bonus: "৳150", totalAmount: "৳15,150", status: "completed", date: "2026-01-20", time: "04:45 PM", balance: "৳28,000", totalDeposits: 18 },
  { id: "DP007", orderId: "ORD-DEP-007", user: "জাকির হোসেন", phone: "01312345678", email: "zakir@example.com", profileId: "USR-10234", method: "Nagad", transactionId: "TRX890123", senderNumber: "01312345678", amount: "৳7,500", bonus: "৳75", totalAmount: "৳7,575", status: "pending", date: "2026-01-19", time: "05:00 PM", balance: "৳15,500", totalDeposits: 10 },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "✅ Copied!", description: "Copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button 
      size="icon" 
      variant="ghost" 
      className="h-7 w-7 rounded-md"
      onClick={handleCopy}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
    </Button>
  );
}

interface ActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deposit: Deposit | null;
  action: "approve" | "reject" | "view";
  onConfirm: () => void;
}

function ActionDialog({ open, onOpenChange, deposit, action, onConfirm }: ActionDialogProps) {
  if (!deposit) return null;

  const isApprove = action === "approve";
  const isView = action === "view";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl",
              isView ? "bg-primary/10 text-primary" :
              isApprove ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}>
              {isView ? <Eye className="w-5 h-5" /> :
               isApprove ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <span>
              {isView ? "Deposit Details" : isApprove ? "Approve Deposit" : "Reject Deposit"}
            </span>
          </DialogTitle>
          <DialogDescription>
            {isView 
              ? "Complete details of this deposit transaction."
              : isApprove 
                ? "Please review all details before approving this deposit."
                : "Please review the details before rejecting this deposit."
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
              <div className="w-14 h-14 rounded-xl gradient-success flex items-center justify-center text-primary-foreground text-xl font-bold shrink-0">
                {deposit.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-bold text-foreground text-lg">{deposit.user}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Hash className="w-3.5 h-3.5" />
                  <span className="font-mono">{deposit.profileId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{deposit.phone}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                {deposit.totalDeposits} Deposits
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
                <p className="font-mono font-semibold text-sm">{deposit.orderId}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Deposit ID</p>
                <p className="font-mono font-semibold text-sm">{deposit.id}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Method</p>
                <p className="font-semibold text-sm">{deposit.method}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Sender Number</p>
                <p className="font-mono font-semibold text-sm">{deposit.senderNumber}</p>
              </div>
              <div className="col-span-2 bg-card rounded-lg p-3 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                    <p className="font-mono font-semibold">{deposit.transactionId}</p>
                  </div>
                  <CopyButton text={deposit.transactionId} />
                </div>
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
                <span className="text-muted-foreground">Deposit Amount</span>
                <span className="font-semibold text-lg">{deposit.amount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-muted-foreground">Bonus</span>
                <span className="font-medium text-success">+{deposit.bonus}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border/50">
                <span className="text-muted-foreground">Total Credit</span>
                <span className="font-bold text-xl text-success">{deposit.totalAmount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border bg-success/5 rounded-lg px-3 -mx-1 mt-2">
                <span className="text-muted-foreground">Current Balance</span>
                <span className="font-bold text-success">{deposit.balance}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
            <span className="text-sm font-medium text-muted-foreground">Current Status</span>
            <StatusBadge status={deposit.status} />
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{deposit.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{deposit.time}</span>
            </div>
          </div>

          {/* Warning for Reject */}
          {action === "reject" && (
            <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Warning</p>
                <p className="text-sm text-muted-foreground">
                  Rejecting this deposit will notify the user and cancel the transaction.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
            {isView ? "Close" : "Cancel"}
          </Button>
          {!isView && (
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
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Deposits = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | "view">("view");

  const openActionDialog = (deposit: Deposit, action: "approve" | "reject" | "view") => {
    setSelectedDeposit(deposit);
    setActionType(action);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedDeposit) return;
    
    if (actionType === "approve") {
      toast({
        title: "✅ Deposit Approved",
        description: `Deposit ${selectedDeposit.id} for ${selectedDeposit.user} has been approved.`,
      });
    } else if (actionType === "reject") {
      toast({
        title: "❌ Deposit Rejected",
        description: `Deposit ${selectedDeposit.id} for ${selectedDeposit.user} has been rejected.`,
        variant: "destructive",
      });
    }
    setDialogOpen(false);
  };

  const columns: Column<Deposit>[] = [
    { key: "id", label: "ID", className: "font-mono text-sm" },
    { 
      key: "user", 
      label: "User",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center text-primary-foreground font-bold shrink-0">
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
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-success/10 text-success font-medium text-sm">
          {String(value)}
        </span>
      ),
    },
    { 
      key: "transactionId", 
      label: "Transaction ID",
      render: (value) => (
        <div className="flex items-center gap-1.5">
          <code className="text-xs bg-muted px-2.5 py-1.5 rounded-lg font-mono font-medium">{String(value)}</code>
          <CopyButton text={String(value)} />
        </div>
      ),
      hideOnMobile: true,
    },
    { 
      key: "amount", 
      label: "Amount",
      render: (value) => (
        <span className="text-lg font-bold text-success">+{String(value)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value as Deposit["status"]} />,
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
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-9 w-9 rounded-lg"
            onClick={() => openActionDialog(row, "view")}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const statusFilters = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

  const methodFilters = [
    { value: "bkash", label: "bKash" },
    { value: "nagad", label: "Nagad" },
    { value: "rocket", label: "Rocket" },
    { value: "bank transfer", label: "Bank Transfer" },
  ];

  const renderMobileCard = (row: Deposit, index: number) => (
    <TransactionCard
      key={row.id}
      id={row.id}
      user={row.user}
      phone={row.phone}
      method={row.method}
      amount={row.amount}
      status={row.status}
      date={row.date}
      type="deposit"
      transactionId={row.transactionId}
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
            onClick={() => openActionDialog(row, "view")}
          >
            <Eye className="w-4 h-4" />
            View Details
          </Button>
        )
      }
    />
  );

  return (
    <AdminLayout title="Deposits">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Pending" value="8" icon={Clock} variant="warning" index={0} />
          <MiniStat title="Completed Today" value="32" icon={CheckCircle} variant="success" index={1} />
          <MiniStat title="Failed" value="2" icon={XCircle} variant="destructive" index={2} />
          <MiniStat title="Total Amount" value="৳5,45,000" icon={TrendingUp} variant="info" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={deposits}
          title="Deposit History"
          searchPlaceholder="Search by user, transaction ID..."
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
        deposit={selectedDeposit}
        action={actionType}
        onConfirm={handleConfirm}
      />
    </AdminLayout>
  );
};

export default Deposits;
