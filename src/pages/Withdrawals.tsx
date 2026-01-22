import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Clock, CheckCircle, XCircle, TrendingDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Withdrawal {
  id: string;
  user: string;
  phone: string;
  method: string;
  accountNo: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
}

const withdrawals: Withdrawal[] = [
  { id: "WD001", user: "আহমেদ হোসেন", phone: "01712345678", method: "bKash", accountNo: "01712345678", amount: "৳5,000", status: "pending", date: "2026-01-22" },
  { id: "WD002", user: "করিম উদ্দিন", phone: "01898765432", method: "Nagad", accountNo: "01898765432", amount: "৳3,500", status: "pending", date: "2026-01-22" },
  { id: "WD003", user: "সোহেল রানা", phone: "01556789012", method: "Rocket", accountNo: "01556789012", amount: "৳2,000", status: "approved", date: "2026-01-21" },
  { id: "WD004", user: "জাহিদ হাসান", phone: "01612345678", method: "bKash", accountNo: "01612345678", amount: "৳7,500", status: "rejected", date: "2026-01-21" },
  { id: "WD005", user: "মাহমুদুল হক", phone: "01812345678", method: "Nagad", accountNo: "01812345678", amount: "৳4,200", status: "completed", date: "2026-01-20" },
  { id: "WD006", user: "রফিক ইসলাম", phone: "01912345678", method: "bKash", accountNo: "01912345678", amount: "৳6,000", status: "pending", date: "2026-01-22" },
  { id: "WD007", user: "নাসির আহমেদ", phone: "01412345678", method: "Rocket", accountNo: "01412345678", amount: "৳8,500", status: "pending", date: "2026-01-22" },
];

const handleApprove = (id: string) => {
  toast({
    title: "Withdrawal Approved",
    description: `Withdrawal ${id} has been approved successfully.`,
  });
};

const handleReject = (id: string) => {
  toast({
    title: "Withdrawal Rejected",
    description: `Withdrawal ${id} has been rejected.`,
    variant: "destructive",
  });
};

const columns: Column<Withdrawal>[] = [
  { key: "id", label: "ID", className: "font-mono" },
  { 
    key: "user", 
    label: "User",
    render: (value, row) => (
      <div>
        <p className="font-medium">{String(value)}</p>
        <p className="text-xs text-muted-foreground">{row.phone}</p>
      </div>
    ),
  },
  { 
    key: "method", 
    label: "Method",
    render: (value) => (
      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-xs font-medium">
        {String(value)}
      </span>
    ),
  },
  { key: "accountNo", label: "Account", className: "font-mono text-sm" },
  { 
    key: "amount", 
    label: "Amount",
    render: (value) => <span className="font-bold text-foreground">{String(value)}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value as Withdrawal["status"]} />,
  },
  { key: "date", label: "Date" },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => (
      <div className="flex items-center gap-1">
        {row.status === "pending" && (
          <>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => handleApprove(row.id)}
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleReject(row.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        )}
        <Button size="icon" variant="ghost" className="h-8 w-8">
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

const Withdrawals = () => {
  return (
    <AdminLayout title="Withdrawals">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
        />
      </div>
    </AdminLayout>
  );
};

export default Withdrawals;
