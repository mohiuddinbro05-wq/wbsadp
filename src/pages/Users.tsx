import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Ban, UserCheck, Users, UserPlus, UserX, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: string;
  status: "active" | "banned" | "pending";
  joinDate: string;
  referrals: number;
}

const users: User[] = [
  { id: "USR001", name: "আহমেদ হোসেন", phone: "01712345678", email: "ahmed@example.com", balance: "৳15,000", status: "active", joinDate: "2025-12-15", referrals: 12 },
  { id: "USR002", name: "রাহেলা খাতুন", phone: "01898765432", email: "rahela@example.com", balance: "৳8,500", status: "active", joinDate: "2025-12-20", referrals: 8 },
  { id: "USR003", name: "করিম উদ্দিন", phone: "01556789012", email: "karim@example.com", balance: "৳0", status: "banned", joinDate: "2025-11-10", referrals: 0 },
  { id: "USR004", name: "নাজমা বেগম", phone: "01612345678", email: "nazma@example.com", balance: "৳22,300", status: "active", joinDate: "2026-01-05", referrals: 15 },
  { id: "USR005", name: "সোহেল রানা", phone: "01812345678", email: "sohel@example.com", balance: "৳5,750", status: "pending", joinDate: "2026-01-20", referrals: 3 },
  { id: "USR006", name: "মাহমুদ হাসান", phone: "01912345678", email: "mahmud@example.com", balance: "৳18,200", status: "active", joinDate: "2025-10-25", referrals: 20 },
  { id: "USR007", name: "ফারজানা আক্তার", phone: "01312345678", email: "farzana@example.com", balance: "৳3,100", status: "pending", joinDate: "2026-01-21", referrals: 0 },
];

function UserStatusBadge({ status }: { status: User["status"] }) {
  const config = {
    active: { label: "Active", className: "badge-success" },
    banned: { label: "Banned", className: "badge-destructive" },
    pending: { label: "Pending", className: "badge-warning" },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={cn("font-medium border", className)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1.5",
        status === "active" && "bg-success",
        status === "banned" && "bg-destructive",
        status === "pending" && "bg-warning"
      )} />
      {label}
    </Badge>
  );
}

const handleBan = (id: string) => {
  toast({
    title: "User Banned",
    description: `User ${id} has been banned.`,
    variant: "destructive",
  });
};

const handleUnban = (id: string) => {
  toast({
    title: "User Unbanned",
    description: `User ${id} has been unbanned.`,
  });
};

const columns: Column<User>[] = [
  { key: "id", label: "ID", className: "font-mono" },
  { 
    key: "name", 
    label: "User",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
          {String(value).charAt(0)}
        </div>
        <div>
          <p className="font-medium">{String(value)}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
  },
  { key: "phone", label: "Phone", className: "font-mono text-sm" },
  { 
    key: "balance", 
    label: "Balance",
    render: (value) => <span className="font-bold">{String(value)}</span>,
  },
  { 
    key: "referrals", 
    label: "Referrals",
    render: (value) => (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
        {String(value)}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <UserStatusBadge status={value as User["status"]} />,
  },
  { key: "joinDate", label: "Joined" },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Eye className="w-4 h-4" />
        </Button>
        {row.status === "active" ? (
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => handleBan(row.id)}
          >
            <Ban className="w-4 h-4" />
          </Button>
        ) : row.status === "banned" ? (
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
            onClick={() => handleUnban(row.id)}
          >
            <UserCheck className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    ),
  },
];

const statusFilters = [
  { value: "active", label: "Active" },
  { value: "banned", label: "Banned" },
  { value: "pending", label: "Pending" },
];

const UsersPage = () => {
  return (
    <AdminLayout title="Users">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Users" value="12,847" icon={Users} variant="info" index={0} />
          <MiniStat title="Active" value="11,523" icon={UserPlus} variant="success" index={1} />
          <MiniStat title="Banned" value="156" icon={UserX} variant="destructive" index={2} />
          <MiniStat title="Pending" value="1,168" icon={UserCog} variant="warning" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={users}
          title="All Users"
          searchPlaceholder="Search by name, email, phone..."
          filters={[
            { key: "status", label: "Status", options: statusFilters },
          ]}
          onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
        />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
