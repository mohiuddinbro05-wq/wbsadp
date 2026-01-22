import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column, TransactionCard } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Eye, Clock, CheckCircle, XCircle, TrendingUp, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "✅ Copied!", description: "Transaction ID copied to clipboard." });
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
          <p className="text-xs text-muted-foreground">{row.phone}</p>
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
    render: () => (
      <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg">
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
        <Button 
          size="sm"
          variant="outline"
          className="flex-1 h-10 gap-2 rounded-xl"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
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
    </AdminLayout>
  );
};

export default Deposits;
