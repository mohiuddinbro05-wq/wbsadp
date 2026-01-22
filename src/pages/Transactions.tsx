import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Transaction {
  id: string;
  user: string;
  type: "deposit" | "withdrawal" | "transfer" | "bonus";
  amount: string;
  fee: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
}

const transactions: Transaction[] = [
  { id: "TXN001", user: "আহমেদ হোসেন", type: "withdrawal", amount: "৳5,000", fee: "৳25", status: "pending", date: "2026-01-22" },
  { id: "TXN002", user: "রাহেলা খাতুন", type: "deposit", amount: "৳10,000", fee: "৳0", status: "completed", date: "2026-01-22" },
  { id: "TXN003", user: "করিম উদ্দিন", type: "transfer", amount: "৳2,000", fee: "৳10", status: "completed", date: "2026-01-21" },
  { id: "TXN004", user: "নাজমা বেগম", type: "bonus", amount: "৳100", fee: "৳0", status: "completed", date: "2026-01-21" },
  { id: "TXN005", user: "সোহেল রানা", type: "withdrawal", amount: "৳3,500", fee: "৳17", status: "rejected", date: "2026-01-20" },
];

const typeLabels = {
  deposit: "Deposit",
  withdrawal: "Withdrawal",
  transfer: "Transfer",
  bonus: "Bonus",
};

const columns: Column<Transaction>[] = [
  { key: "id", label: "ID" },
  { key: "user", label: "User" },
  { 
    key: "type", 
    label: "Type",
    render: (value) => <span className="capitalize">{typeLabels[value as Transaction["type"]]}</span>,
  },
  { key: "amount", label: "Amount" },
  { key: "fee", label: "Fee" },
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

const Transactions = () => {
  return (
    <AdminLayout title="Transactions">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold text-foreground">45,678</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-2xl font-bold text-success">156</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Volume</p>
            <p className="text-2xl font-bold text-primary">৳2.5 Cr</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Fees</p>
            <p className="text-2xl font-bold text-foreground">৳1,25,000</p>
          </div>
        </div>

        {/* Table */}
        <DataTable columns={columns} data={transactions} />
      </div>
    </AdminLayout>
  );
};

export default Transactions;
