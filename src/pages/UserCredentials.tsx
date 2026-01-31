import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, EyeOff, Copy, Search, Key, Users, Shield, ShieldCheck, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserCredential {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: "active" | "banned" | "pending";
  joinDate: string;
}

const userCredentials: UserCredential[] = [
  { id: "USR001", name: "আহমেদ হোসেন", email: "ahmed@example.com", phone: "01712345678", password: "Ahmed@123", status: "active", joinDate: "2025-12-15" },
  { id: "USR002", name: "রাহেলা খাতুন", email: "rahela@example.com", phone: "01898765432", password: "Rahela@456", status: "active", joinDate: "2025-12-20" },
  { id: "USR003", name: "করিম উদ্দিন", email: "karim@example.com", phone: "01556789012", password: "Karim@789", status: "banned", joinDate: "2025-11-10" },
  { id: "USR004", name: "নাজমা বেগম", email: "nazma@example.com", phone: "01612345678", password: "Nazma@321", status: "active", joinDate: "2026-01-05" },
  { id: "USR005", name: "সোহেল রানা", email: "sohel@example.com", phone: "01812345678", password: "Sohel@654", status: "pending", joinDate: "2026-01-20" },
  { id: "USR006", name: "মাহমুদ হাসান", email: "mahmud@example.com", phone: "01912345678", password: "Mahmud@987", status: "active", joinDate: "2025-10-25" },
  { id: "USR007", name: "ফারজানা আক্তার", email: "farzana@example.com", phone: "01312345678", password: "Farzana@111", status: "pending", joinDate: "2026-01-21" },
];

function PasswordCell({ password }: { password: string }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm min-w-[100px]">
        {showPassword ? password : "••••••••"}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => {
          navigator.clipboard.writeText(password);
          toast({ title: "কপি হয়েছে", description: "পাসওয়ার্ড কপি করা হয়েছে" });
        }}
      >
        <Copy className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

function UserStatusBadge({ status }: { status: UserCredential["status"] }) {
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
        status === "pending" && "bg-warning animate-pulse"
      )} />
      {label}
    </Badge>
  );
}

// Mobile Card Component
function CredentialCard({ user }: { user: UserCredential }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <UserStatusBadge status={user.status} />
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
            <div>
              <span className="text-xs text-muted-foreground block">ইউজার আইডি</span>
              <span className="font-mono text-sm font-medium">{user.id}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                navigator.clipboard.writeText(user.id);
                toast({ title: "কপি হয়েছে", description: "ইউজার আইডি কপি করা হয়েছে" });
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
            <div>
              <span className="text-xs text-muted-foreground block">পাসওয়ার্ড</span>
              <span className="font-mono text-sm font-medium">
                {showPassword ? user.password : "••••••••"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  navigator.clipboard.writeText(user.password);
                  toast({ title: "কপি হয়েছে", description: "পাসওয়ার্ড কপি করা হয়েছে" });
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">ফোন</span>
            <span className="font-mono">{user.phone}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">যোগদান</span>
            <span>{user.joinDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UserCredentials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredUsers = userCredentials.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: userCredentials.length,
    active: userCredentials.filter((u) => u.status === "active").length,
    pending: userCredentials.filter((u) => u.status === "pending").length,
  };

  return (
    <AdminLayout title="User Credentials">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Key className="w-6 h-6 text-primary" />
            User Credentials
          </h1>
          <p className="text-muted-foreground">ইউজারদের লগইন তথ্য দেখুন এবং ম্যানেজ করুন</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
              <div className="p-2 sm:p-3 rounded-xl bg-primary/10">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold">{stats.total}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">মোট ইউজার</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
              <div className="p-2 sm:p-3 rounded-xl bg-success/10">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-success">{stats.active}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">সক্রিয় ইউজার</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 lg:col-span-1">
            <CardContent className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
              <div className="p-2 sm:p-3 rounded-xl bg-warning/10">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-warning">{stats.pending}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">পেন্ডিং ইউজার</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">লগইন তথ্য তালিকা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ইউজার আইডি, নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>ইউজার</TableHead>
                    <TableHead>ইউজার আইডি</TableHead>
                    <TableHead>পাসওয়ার্ড</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead>যোগদান</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{user.id}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => {
                              navigator.clipboard.writeText(user.id);
                              toast({ title: "কপি হয়েছে", description: "ইউজার আইডি কপি করা হয়েছে" });
                            }}
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <PasswordCell password={user.password} />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{user.phone}</TableCell>
                      <TableCell>
                        <UserStatusBadge status={user.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {filteredUsers.map((user) => (
                <CredentialCard key={user.id} user={user} />
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Key className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>কোনো ইউজার পাওয়া যায়নি</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
