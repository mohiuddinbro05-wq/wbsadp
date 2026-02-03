import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MiniStat } from "@/components/admin/StatCard";
import { DataTable, Column } from "@/components/admin/DataTable";
import { useState } from "react";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock,
  Edit,
  Check,
  X,
  Wallet,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  salary: number;
  lastPaid: string;
  status: "paid" | "pending" | "overdue";
}

interface UserEarning {
  id: string;
  userId: string;
  userName: string;
  videoEarnings: number;
  referralEarnings: number;
  totalEarnings: number;
  pendingPayout: number;
  lastPayout: string;
}

const teamMembers: TeamMember[] = [
  { id: "TM001", name: "John Smith", role: "Admin", salary: 5000, lastPaid: "2026-01-15", status: "paid" },
  { id: "TM002", name: "Sarah Johnson", role: "Agent", salary: 3000, lastPaid: "2026-01-15", status: "paid" },
  { id: "TM003", name: "Mike Wilson", role: "Support", salary: 2500, lastPaid: "2026-01-15", status: "pending" },
  { id: "TM004", name: "Emily Brown", role: "Moderator", salary: 2000, lastPaid: "2026-01-01", status: "overdue" },
  { id: "TM005", name: "David Lee", role: "Agent", salary: 3000, lastPaid: "2026-01-15", status: "paid" },
];

const userEarnings: UserEarning[] = [
  { id: "UE001", userId: "U001", userName: "Ahmed Hossain", videoEarnings: 150, referralEarnings: 200, totalEarnings: 350, pendingPayout: 100, lastPayout: "2026-01-20" },
  { id: "UE002", userId: "U002", userName: "Rahela Khatun", videoEarnings: 200, referralEarnings: 150, totalEarnings: 350, pendingPayout: 50, lastPayout: "2026-01-18" },
  { id: "UE003", userId: "U003", userName: "Karim Uddin", videoEarnings: 100, referralEarnings: 300, totalEarnings: 400, pendingPayout: 200, lastPayout: "2026-01-15" },
  { id: "UE004", userId: "U004", userName: "Nazma Begum", videoEarnings: 250, referralEarnings: 100, totalEarnings: 350, pendingPayout: 0, lastPayout: "2026-01-22" },
];

const teamColumns: Column<TeamMember>[] = [
  { key: "id", label: "ID", className: "font-mono" },
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { 
    key: "salary", 
    label: "Salary",
    render: (value) => <span className="font-bold text-success">${Number(value).toLocaleString()}</span>
  },
  { key: "lastPaid", label: "Last Paid" },
  { 
    key: "status", 
    label: "Status",
    render: (value) => {
      const statusColors = {
        paid: "bg-success/10 text-success",
        pending: "bg-warning/10 text-warning",
        overdue: "bg-destructive/10 text-destructive",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </span>
      );
    }
  },
];

const earningsColumns: Column<UserEarning>[] = [
  { key: "userId", label: "User ID", className: "font-mono" },
  { key: "userName", label: "User Name" },
  { 
    key: "videoEarnings", 
    label: "Video Earnings",
    render: (value) => <span className="text-primary font-medium">${Number(value)}</span>
  },
  { 
    key: "referralEarnings", 
    label: "Referral Earnings",
    render: (value) => <span className="text-success font-medium">${Number(value)}</span>
  },
  { 
    key: "totalEarnings", 
    label: "Total",
    render: (value) => <span className="font-bold">${Number(value)}</span>
  },
  { 
    key: "pendingPayout", 
    label: "Pending",
    render: (value) => <span className="text-warning font-medium">${Number(value)}</span>
  },
  { key: "lastPayout", label: "Last Payout" },
];

const mobileTeamCard = (row: TeamMember, index: number) => {
  const statusColors = {
    paid: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    overdue: "bg-destructive/10 text-destructive",
  };

  return (
    <div
      key={row.id}
      className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.role}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Wallet className="w-3.5 h-3.5 text-success" />
            <p className="text-xs text-muted-foreground">Salary</p>
          </div>
          <p className="font-bold text-success">${row.salary.toLocaleString()}</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs text-muted-foreground">Last Paid</p>
          </div>
          <p className="font-medium text-sm">{row.lastPaid}</p>
        </div>
      </div>
    </div>
  );
};

const mobileEarningsCard = (row: UserEarning, index: number) => {
  return (
    <div
      key={row.id}
      className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{row.userName}</p>
            <p className="text-xs text-muted-foreground font-mono">{row.userId}</p>
          </div>
        </div>
        <p className="font-bold text-lg">${row.totalEarnings}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-muted/50 rounded-xl p-2 text-center">
          <p className="text-xs text-muted-foreground">Video</p>
          <p className="font-medium text-primary text-sm">${row.videoEarnings}</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-2 text-center">
          <p className="text-xs text-muted-foreground">Referral</p>
          <p className="font-medium text-success text-sm">${row.referralEarnings}</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-2 text-center">
          <p className="text-xs text-muted-foreground">Pending</p>
          <p className="font-medium text-warning text-sm">${row.pendingPayout}</p>
        </div>
      </div>
    </div>
  );
};

export default function Salary() {
  const { toast } = useToast();
  const [editDialog, setEditDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newSalary, setNewSalary] = useState("");

  const stats = {
    totalTeamSalary: teamMembers.reduce((acc, m) => acc + m.salary, 0),
    pendingPayments: teamMembers.filter(m => m.status === "pending").length,
    totalUserEarnings: userEarnings.reduce((acc, u) => acc + u.totalEarnings, 0),
    pendingPayouts: userEarnings.reduce((acc, u) => acc + u.pendingPayout, 0),
  };

  const handleEditSalary = (member: TeamMember) => {
    setSelectedMember(member);
    setNewSalary(member.salary.toString());
    setEditDialog(true);
  };

  const handleSaveSalary = () => {
    toast({
      title: "Salary Updated",
      description: `${selectedMember?.name}'s salary has been updated to $${newSalary}`,
    });
    setEditDialog(false);
  };

  return (
    <AdminLayout title="Salary Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Team Salary" value={`$${stats.totalTeamSalary.toLocaleString()}`} icon={DollarSign} variant="info" index={0} />
          <MiniStat title="Pending Payments" value={stats.pendingPayments.toString()} icon={Clock} variant="warning" index={1} />
          <MiniStat title="User Earnings" value={`$${stats.totalUserEarnings.toLocaleString()}`} icon={TrendingUp} variant="success" index={2} />
          <MiniStat title="Pending Payouts" value={`$${stats.pendingPayouts}`} icon={Users} variant="info" index={3} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="team">Team Salaries</TabsTrigger>
            <TabsTrigger value="users">User Earnings</TabsTrigger>
          </TabsList>
          <TabsContent value="team" className="mt-4">
            <DataTable
              columns={teamColumns}
              data={teamMembers}
              title="Team Salary Management"
              searchPlaceholder="Search team members..."
              mobileCardRender={mobileTeamCard}
              onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
              onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
            />
          </TabsContent>
          <TabsContent value="users" className="mt-4">
            <DataTable
              columns={earningsColumns}
              data={userEarnings}
              title="User Earnings & Payouts"
              searchPlaceholder="Search users..."
              mobileCardRender={mobileEarningsCard}
              onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
              onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Salary Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Salary</DialogTitle>
            <DialogDescription>
              Update salary for {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Salary</Label>
              <p className="text-lg font-bold">${selectedMember?.salary.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newSalary">New Salary</Label>
              <Input
                id="newSalary"
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                placeholder="Enter new salary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveSalary}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
