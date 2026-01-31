import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard, MiniStat } from "@/components/admin/StatCard";
import { DataTable, StatusBadge, Column } from "@/components/admin/DataTable";
import { Users, TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface RecentTransaction {
  id: string;
  user: string;
  type: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "completed";
  date: string;
}

const recentTransactions: RecentTransaction[] = [
  { id: "TXN001", user: "Ahmed Hossain", type: "Withdrawal", amount: "$5,000", status: "pending", date: "2026-01-22" },
  { id: "TXN002", user: "Rahela Khatun", type: "Deposit", amount: "$10,000", status: "completed", date: "2026-01-22" },
  { id: "TXN003", user: "Karim Uddin", type: "Withdrawal", amount: "$3,500", status: "approved", date: "2026-01-21" },
  { id: "TXN004", user: "Nazma Begum", type: "Deposit", amount: "$8,000", status: "completed", date: "2026-01-21" },
  { id: "TXN005", user: "Sohel Rana", type: "Withdrawal", amount: "$2,000", status: "rejected", date: "2026-01-20" },
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

// Mobile Card Renderer for Recent Transactions
const mobileTransactionCard = (row: RecentTransaction, index: number) => {
  const isWithdrawal = row.type === "Withdrawal";
  
  return (
    <div
      key={row.id}
      className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-primary-foreground shrink-0",
            isWithdrawal ? "gradient-warning" : "gradient-success"
          )}>
            {row.user.charAt(0)}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground truncate text-sm">{row.user}</h4>
            <p className="text-xs text-muted-foreground font-mono">{row.id}</p>
          </div>
        </div>
        <StatusBadge status={row.status} size="sm" />
      </div>

      {/* Details */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          {isWithdrawal ? (
            <TrendingDown className="w-4 h-4 text-destructive" />
          ) : (
            <TrendingUp className="w-4 h-4 text-success" />
          )}
          <span className={cn(
            "font-bold",
            isWithdrawal ? "text-destructive" : "text-success"
          )}>
            {isWithdrawal ? "-" : "+"}{row.amount}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{row.date}</span>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AdminLayout title="Overview">
      <div className="space-y-6 lg:space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-6 md:p-8 text-primary-foreground animate-fade-in shadow-glow">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, Admin! 👋</h1>
            <p className="text-white/80 text-sm md:text-base max-w-xl">
              View today's overview and manage everything from here.
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
            value="$452,300"
            change="+8% from last month"
            changeType="positive"
            icon={TrendingUp}
            variant="success"
            index={1}
          />
          <StatCard
            title="Total Withdrawals"
            value="$321,500"
            change="+5% from last month"
            changeType="neutral"
            icon={TrendingDown}
            variant="warning"
            index={2}
          />
          <StatCard
            title="Net Balance"
            value="$130,800"
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
            value="$12,500"
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
          mobileCardRender={mobileTransactionCard}
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
