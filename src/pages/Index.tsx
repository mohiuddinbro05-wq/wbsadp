import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { Users, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

interface RecentTransaction {
  id: string;
  user: string;
  type: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
}

const recentTransactions: RecentTransaction[] = [
  { id: "TXN001", user: "আহমেদ হোসেন", type: "Withdrawal", amount: "৳5,000", status: "pending", date: "2026-01-22" },
  { id: "TXN002", user: "রাহেলা খাতুন", type: "Deposit", amount: "৳10,000", status: "completed", date: "2026-01-22" },
  { id: "TXN003", user: "করিম উদ্দিন", type: "Withdrawal", amount: "৳3,500", status: "approved", date: "2026-01-21" },
  { id: "TXN004", user: "নাজমা বেগম", type: "Deposit", amount: "৳8,000", status: "completed", date: "2026-01-21" },
  { id: "TXN005", user: "সোহেল রানা", type: "Withdrawal", amount: "৳2,000", status: "rejected", date: "2026-01-20" },
];

const columns: Column<RecentTransaction>[] = [
  { key: "id", label: "Transaction ID" },
  { key: "user", label: "User" },
  { key: "type", label: "Type" },
  { key: "amount", label: "Amount" },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value as RecentTransaction["status"]} />,
  },
  { key: "date", label: "Date" },
];

const Index = () => {
  return (
    <AdminLayout title="Overview">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="12,847"
            change="+12% from last month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Total Deposits"
            value="৳45,23,000"
            change="+8% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatCard
            title="Total Withdrawals"
            value="৳32,15,000"
            change="+5% from last month"
            changeType="neutral"
            icon={TrendingDown}
          />
          <StatCard
            title="Net Balance"
            value="৳13,08,000"
            change="+15% from last month"
            changeType="positive"
            icon={DollarSign}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-warning/10">
                <Activity className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-xl font-bold text-foreground">23</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Deposits</p>
                <p className="text-xl font-bold text-foreground">৳1,25,000</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-info/10">
                <Users className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New Users Today</p>
                <p className="text-xl font-bold text-foreground">47</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <DataTable columns={columns} data={recentTransactions} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
