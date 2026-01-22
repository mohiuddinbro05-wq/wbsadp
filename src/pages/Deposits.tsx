import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

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
];

const columns: Column<Deposit>[] = [
  { key: "id", label: "ID" },
  { key: "user", label: "User" },
  { key: "phone", label: "Phone" },
  { key: "method", label: "Method" },
  { key: "transactionId", label: "Transaction ID" },
  { key: "amount", label: "Amount" },
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

const Deposits = () => {
  return (
    <AdminLayout title="Deposits">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">8</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Completed Today</p>
            <p className="text-2xl font-bold text-success">32</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Failed</p>
            <p className="text-2xl font-bold text-destructive">2</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-foreground">৳5,45,000</p>
          </div>
        </div>

        {/* Table */}
        <DataTable columns={columns} data={deposits} />
      </div>
    </AdminLayout>
  );
};

export default Deposits;
