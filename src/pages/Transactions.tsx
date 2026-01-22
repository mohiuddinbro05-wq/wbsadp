import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Eye, ArrowUpRight, ArrowDownRight, ArrowLeftRight, Gift, Activity, TrendingUp, Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  user: string;
  phone: string;
  type: "deposit" | "withdrawal" | "transfer" | "bonus";
  amount: string;
  fee: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
}

const transactions: Transaction[] = [
  { id: "TXN001", user: "আহমেদ হোসেন", phone: "01712345678", type: "withdrawal", amount: "৳5,000", fee: "৳25", status: "pending", date: "2026-01-22" },
  { id: "TXN002", user: "রাহেলা খাতুন", phone: "01898765432", type: "deposit", amount: "৳10,000", fee: "৳0", status: "completed", date: "2026-01-22" },
  { id: "TXN003", user: "করিম উদ্দিন", phone: "01556789012", type: "transfer", amount: "৳2,000", fee: "৳10", status: "completed", date: "2026-01-21" },
  { id: "TXN004", user: "নাজমা বেগম", phone: "01612345678", type: "bonus", amount: "৳100", fee: "৳0", status: "completed", date: "2026-01-21" },
  { id: "TXN005", user: "সোহেল রানা", phone: "01812345678", type: "withdrawal", amount: "৳3,500", fee: "৳17", status: "rejected", date: "2026-01-20" },
  { id: "TXN006", user: "মাহমুদ হাসান", phone: "01912345678", type: "deposit", amount: "৳15,000", fee: "৳0", status: "completed", date: "2026-01-20" },
  { id: "TXN007", user: "ফারজানা আক্তার", phone: "01312345678", type: "transfer", amount: "৳5,500", fee: "৳27", status: "pending", date: "2026-01-19" },
];

const typeConfig = {
  deposit: { label: "Deposit", icon: ArrowDownRight, color: "text-success" },
  withdrawal: { label: "Withdrawal", icon: ArrowUpRight, color: "text-destructive" },
  transfer: { label: "Transfer", icon: ArrowLeftRight, color: "text-info" },
  bonus: { label: "Bonus", icon: Gift, color: "text-warning" },
};

const columns: Column<Transaction>[] = [
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
    key: "type", 
    label: "Type",
    render: (value) => {
      const config = typeConfig[value as Transaction["type"]];
      const Icon = config.icon;
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium ${config.color}`}>
          <Icon className="w-4 h-4" />
          {config.label}
        </span>
      );
    },
  },
  { 
    key: "amount", 
    label: "Amount",
    render: (value) => <span className="font-bold">{String(value)}</span>,
  },
  { 
    key: "fee", 
    label: "Fee",
    render: (value) => (
      <span className="text-muted-foreground">{String(value)}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value as Transaction["status"]} />,
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
  { value: "rejected", label: "Rejected" },
];

const typeFilters = [
  { value: "deposit", label: "Deposit" },
  { value: "withdrawal", label: "Withdrawal" },
  { value: "transfer", label: "Transfer" },
  { value: "bonus", label: "Bonus" },
];

const Transactions = () => {
  return (
    <AdminLayout title="Transactions">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Transactions" value="45,678" icon={Activity} variant="info" index={0} />
          <MiniStat title="Today" value="156" icon={TrendingUp} variant="success" index={1} />
          <MiniStat title="Total Volume" value="৳2.5 Cr" icon={Wallet} variant="warning" index={2} />
          <MiniStat title="Total Fees" value="৳1,25,000" icon={Gift} variant="info" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={transactions}
          title="Transaction History"
          searchPlaceholder="Search by user, ID..."
          filters={[
            { key: "status", label: "Status", options: statusFilters },
            { key: "type", label: "Type", options: typeFilters },
          ]}
          onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
        />
      </div>
    </AdminLayout>
  );
};

export default Transactions;
