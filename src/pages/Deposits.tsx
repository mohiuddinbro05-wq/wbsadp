import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Eye, Clock, CheckCircle, XCircle, TrendingUp, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Deposit {
  id: string;
  user: string;
  phone: string;
  method: string;
  transactionId: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
}

const deposits: Deposit[] = [
  { id: "DP001", user: "রাহেলা খাতুন", phone: "01712345678", method: "bKash", transactionId: "TRX123456", amount: "৳10,000", status: "completed", date: "2026-01-22" },
  { id: "DP002", user: "নাজমা বেগম", phone: "01898765432", method: "Nagad", transactionId: "TRX789012", amount: "৳8,000", status: "completed", date: "2026-01-22" },
  { id: "DP003", user: "ফাতেমা আক্তার", phone: "01556789012", method: "Rocket", transactionId: "TRX345678", amount: "৳5,500", status: "pending", date: "2026-01-21" },
  { id: "DP004", user: "সাবরিনা ইসলাম", phone: "01612345678", method: "bKash", transactionId: "TRX901234", amount: "৳12,000", status: "completed", date: "2026-01-21" },
  { id: "DP005", user: "মোহাম্মদ আলী", phone: "01812345678", method: "Bank Transfer", transactionId: "TRX567890", amount: "৳25,000", status: "pending", date: "2026-01-20" },
  { id: "DP006", user: "আবদুল করিম", phone: "01912345678", method: "bKash", transactionId: "TRX234567", amount: "৳15,000", status: "completed", date: "2026-01-20" },
  { id: "DP007", user: "জাকির হোসেন", phone: "01312345678", method: "Nagad", transactionId: "TRX890123", amount: "৳7,500", status: "pending", date: "2026-01-19" },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({ title: "Copied!", description: "Transaction ID copied to clipboard." });
};

const columns: Column<Deposit>[] = [
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
      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
        {String(value)}
      </span>
    ),
  },
  { 
    key: "transactionId", 
    label: "Transaction ID",
    render: (value) => (
      <div className="flex items-center gap-2">
        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{String(value)}</code>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-6 w-6"
          onClick={() => copyToClipboard(String(value))}
        >
          <Copy className="w-3 h-3" />
        </Button>
      </div>
    ),
  },
  { 
    key: "amount", 
    label: "Amount",
    render: (value) => <span className="font-bold text-success">{String(value)}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value as Deposit["status"]} />,
  },
  { key: "date", label: "Date" },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <Button size="icon" variant="ghost" className="h-8 w-8">
        <Eye className="w-4 h-4" />
      </Button>
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

const Deposits = () => {
  return (
    <AdminLayout title="Deposits">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
        />
      </div>
    </AdminLayout>
  );
};

export default Deposits;
