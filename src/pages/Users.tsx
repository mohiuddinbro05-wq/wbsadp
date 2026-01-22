import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Ban, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: string;
  status: "active" | "banned" | "pending";
  joinDate: string;
}

const users: User[] = [
  { id: "USR001", name: "আহমেদ হোসেন", phone: "01712345678", email: "ahmed@example.com", balance: "৳15,000", status: "active", joinDate: "2025-12-15" },
  { id: "USR002", name: "রাহেলা খাতুন", phone: "01898765432", email: "rahela@example.com", balance: "৳8,500", status: "active", joinDate: "2025-12-20" },
  { id: "USR003", name: "করিম উদ্দিন", phone: "01556789012", email: "karim@example.com", balance: "৳0", status: "banned", joinDate: "2025-11-10" },
  { id: "USR004", name: "নাজমা বেগম", phone: "01612345678", email: "nazma@example.com", balance: "৳22,300", status: "active", joinDate: "2026-01-05" },
  { id: "USR005", name: "সোহেল রানা", phone: "01812345678", email: "sohel@example.com", balance: "৳5,750", status: "pending", joinDate: "2026-01-20" },
];

function UserStatusBadge({ status }: { status: User["status"] }) {
  const variants = {
    active: "bg-success/10 text-success border-success/20",
    banned: "bg-destructive/10 text-destructive border-destructive/20",
    pending: "bg-warning/10 text-warning border-warning/20",
  };

  const labels = {
    active: "Active",
    banned: "Banned",
    pending: "Pending",
  };

  return (
    <Badge variant="outline" className={cn("font-medium", variants[status])}>
      {labels[status]}
    </Badge>
  );
}

const columns: Column<User>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "balance", label: "Balance" },
  {
    key: "status",
    label: "Status",
    render: (value) => <UserStatusBadge status={value as User["status"]} />,
  },
  { key: "joinDate", label: "Join Date" },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Eye className="w-4 h-4" />
        </Button>
        {row.status === "active" ? (
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
            <Ban className="w-4 h-4" />
          </Button>
        ) : row.status === "banned" ? (
          <Button size="icon" variant="ghost" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
            <UserCheck className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    ),
  },
];

const UsersPage = () => {
  return (
    <AdminLayout title="Users">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold text-foreground">12,847</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">11,523</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Banned</p>
            <p className="text-2xl font-bold text-destructive">156</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">1,168</p>
          </div>
        </div>

        {/* Table */}
        <DataTable columns={columns} data={users} />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
