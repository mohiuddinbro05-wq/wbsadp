import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Eye, ArrowUpRight, ArrowDownRight, ArrowLeftRight, Gift, Activity, TrendingUp, Wallet, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
  { id: "TXN001", user: "Ahmed Hossain", phone: "01712345678", type: "withdrawal", amount: "$5,000", fee: "$25", status: "pending", date: "2026-01-22" },
  { id: "TXN002", user: "Rahela Khatun", phone: "01898765432", type: "deposit", amount: "$10,000", fee: "$0", status: "completed", date: "2026-01-22" },
  { id: "TXN003", user: "Karim Uddin", phone: "01556789012", type: "transfer", amount: "$2,000", fee: "$10", status: "completed", date: "2026-01-21" },
  { id: "TXN004", user: "Nazma Begum", phone: "01612345678", type: "bonus", amount: "$100", fee: "$0", status: "completed", date: "2026-01-21" },
  { id: "TXN005", user: "Sohel Rana", phone: "01812345678", type: "withdrawal", amount: "$3,500", fee: "$17", status: "rejected", date: "2026-01-20" },
  { id: "TXN006", user: "Mahmud Hassan", phone: "01912345678", type: "deposit", amount: "$15,000", fee: "$0", status: "completed", date: "2026-01-20" },
  { id: "TXN007", user: "Farzana Akter", phone: "01312345678", type: "transfer", amount: "$5,500", fee: "$27", status: "pending", date: "2026-01-19" },
];

const typeConfig = {
  deposit: { label: "Deposit", icon: ArrowDownRight, color: "text-success", bgColor: "bg-success/10", gradient: "gradient-success" },
  withdrawal: { label: "Withdrawal", icon: ArrowUpRight, color: "text-destructive", bgColor: "bg-destructive/10", gradient: "gradient-warning" },
  transfer: { label: "Transfer", icon: ArrowLeftRight, color: "text-info", bgColor: "bg-info/10", gradient: "gradient-info" },
  bonus: { label: "Bonus", icon: Gift, color: "text-warning", bgColor: "bg-warning/10", gradient: "gradient-primary" },
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

// Mobile Card Renderer for Transactions
const mobileTransactionCard = (row: Transaction, index: number) => {
  const config = typeConfig[row.type];
  const Icon = config.icon;

  return (
    <div
      key={row.id}
      className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-primary-foreground shrink-0",
            config.gradient
          )}>
            {row.user.charAt(0)}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground truncate">{row.user}</h4>
            <p className="text-sm text-muted-foreground">{row.phone}</p>
          </div>
        </div>
        <StatusBadge status={row.status} size="sm" />
      </div>

      {/* Type & Amount */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={cn("rounded-xl p-3", config.bgColor)}>
          <p className="text-xs text-muted-foreground mb-0.5">Type</p>
          <div className={cn("flex items-center gap-1.5 font-semibold", config.color)}>
            <Icon className="w-4 h-4" />
            {config.label}
          </div>
        </div>
        <div className="bg-muted/50 rounded-xl p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Amount</p>
          <p className="text-lg font-bold text-foreground">{row.amount}</p>
        </div>
      </div>

      {/* Fee & Meta Info */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
        <span className="bg-muted px-2 py-1 rounded-lg font-mono">{row.id}</span>
        {row.fee !== "$0" && (
          <span className="bg-muted px-2 py-1 rounded-lg">Fee: {row.fee}</span>
        )}
        <span className="ml-auto flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {row.date}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end pt-3 border-t border-border">
        <Button size="sm" variant="outline" className="gap-2">
          <Eye className="w-4 h-4" />
          View Details
        </Button>
      </div>
    </div>
  );
};

const Transactions = () => {
  return (
    <AdminLayout title="Transactions">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Transactions" value="45,678" icon={Activity} variant="info" index={0} />
          <MiniStat title="Today" value="156" icon={TrendingUp} variant="success" index={1} />
          <MiniStat title="Total Volume" value="$2.5M" icon={Wallet} variant="warning" index={2} />
          <MiniStat title="Total Fees" value="$12,500" icon={Gift} variant="info" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={transactions}
          title="Transaction History"
          searchPlaceholder="Search by user, ID..."
          mobileCardRender={mobileTransactionCard}
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
