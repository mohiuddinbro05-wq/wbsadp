import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";

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
];

const columns: Column<Withdrawal>[] = [
  { key: "id", label: "ID" },
  { key: "user", label: "User" },
  { key: "phone", label: "Phone" },
  { key: "method", label: "Method" },
  { key: "accountNo", label: "Account No" },
  { key: "amount", label: "Amount" },
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
            <Button size="icon" variant="ghost" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
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

const Withdrawals = () => {
  return (
    <AdminLayout title="Withdrawals">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">23</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Approved Today</p>
            <p className="text-2xl font-bold text-success">15</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <p className="text-2xl font-bold text-destructive">3</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-foreground">৳2,35,000</p>
          </div>
        </div>

        {/* Table */}
        <DataTable columns={columns} data={withdrawals} />
      </div>
    </AdminLayout>
  );
};

export default Withdrawals;
