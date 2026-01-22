import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard, MiniStat } from "@/components/admin/StatCard";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { Users, TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  { 
    key: "type", 
    label: "Type",
    render: (value) => (
      <span className={`inline-flex items-center gap-1.5 font-medium ${
        value === "Withdrawal" ? "text-destructive" : "text-success"
      }`}>
        {value === "Withdrawal" ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
        {String(value)}
      </span>
    ),
  },
  { 
    key: "amount", 
    label: "Amount",
    render: (value) => <span className="font-semibold">{String(value)}</span>,
  },
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
      <div className="space-y-6 lg:space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-6 md:p-8 text-primary-foreground animate-fade-in shadow-glow">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">স্বাগতম, Admin! 👋</h1>
            <p className="text-white/80 text-sm md:text-base max-w-xl">
              আজকের সামগ্রিক পরিস্থিতি দেখুন এবং সব কিছু নিয়ন্ত্রণ করুন।
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="12,847"
            change="+12% from last month"
            changeType="positive"
            icon={Users}
            variant="primary"
            index={0}
          />
          <StatCard
            title="Total Deposits"
            value="৳45,23,000"
            change="+8% from last month"
            changeType="positive"
            icon={TrendingUp}
            variant="success"
            index={1}
          />
          <StatCard
            title="Total Withdrawals"
            value="৳32,15,000"
            change="+5% from last month"
            changeType="neutral"
            icon={TrendingDown}
            variant="warning"
            index={2}
          />
          <StatCard
            title="Net Balance"
            value="৳13,08,000"
            change="+15% from last month"
            changeType="positive"
            icon={DollarSign}
            variant="info"
            index={3}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MiniStat
            title="Pending Requests"
            value="23"
            icon={Activity}
            variant="warning"
            index={0}
          />
          <MiniStat
            title="Today's Deposits"
            value="৳1,25,000"
            icon={TrendingUp}
            variant="success"
            index={1}
          />
          <MiniStat
            title="New Users Today"
            value="47"
            icon={Users}
            variant="info"
            index={2}
          />
        </div>

        {/* Recent Transactions */}
        <DataTable
          columns={columns}
          data={recentTransactions}
          title="Recent Transactions"
          searchable={false}
          pageSize={5}
          actions={
            <Link to="/transactions">
              <Button variant="outline" size="sm" className="gap-2">
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          }
        />
      </div>
    </AdminLayout>
  );
};

export default Index;
