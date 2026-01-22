import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Shield, 
  Search, 
  UserCog, 
  UserPlus, 
  Headphones, 
  UserCheck,
  Key,
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  Users,
  History,
  Video,
  Crown,
  Wallet,
  Home,
  Gift,
  CreditCard,
  FileText,
  Bell,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "admin" | "moderator" | "agent" | "support";

interface Permission {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  avatar?: string;
  createdAt: string;
  permissions: string[];
}

const allPermissions: Permission[] = [
  // Main Menu
  { id: "overview", label: "Overview", description: "ড্যাশবোর্ড দেখতে পারবে", icon: LayoutDashboard, category: "Main Menu" },
  { id: "withdrawals", label: "Withdrawals", description: "উত্তোলন ম্যানেজ করতে পারবে", icon: TrendingDown, category: "Main Menu" },
  { id: "deposits", label: "Deposits", description: "ডিপোজিট ম্যানেজ করতে পারবে", icon: TrendingUp, category: "Main Menu" },
  { id: "users", label: "Users", description: "ইউজার দেখতে ও ম্যানেজ করতে পারবে", icon: Users, category: "Main Menu" },
  { id: "history", label: "History", description: "ইউজার হিস্ট্রি সার্চ করতে পারবে", icon: History, category: "Main Menu" },
  
  // Content
  { id: "videos", label: "Videos", description: "ভিডিও ম্যানেজ করতে পারবে", icon: Video, category: "Content" },
  { id: "subscription", label: "Subscription", description: "সাবস্ক্রিপশন প্যাকেজ ম্যানেজ করতে পারবে", icon: Crown, category: "Content" },
  { id: "home_editor", label: "Home Page Editor", description: "হোম পেজ এডিট করতে পারবে", icon: Home, category: "Content" },
  
  // Team Management
  { id: "team_admins", label: "Admin Users", description: "এডমিন ম্যানেজ করতে পারবে", icon: Shield, category: "Team" },
  { id: "team_agents", label: "Agents", description: "এজেন্ট ম্যানেজ করতে পারবে", icon: UserPlus, category: "Team" },
  { id: "team_support", label: "Support Team", description: "সাপোর্ট টিম ম্যানেজ করতে পারবে", icon: Headphones, category: "Team" },
  { id: "team_moderators", label: "Moderators", description: "মডারেটর ম্যানেজ করতে পারবে", icon: UserCheck, category: "Team" },
  
  // Management
  { id: "payment_methods", label: "Payment Methods", description: "পেমেন্ট মেথড ম্যানেজ করতে পারবে", icon: Wallet, category: "Management" },
  { id: "referrals", label: "Referrals", description: "রেফারেল দেখতে পারবে", icon: Gift, category: "Management" },
  { id: "transactions", label: "Transactions", description: "ট্রানজেকশন দেখতে পারবে", icon: CreditCard, category: "Management" },
  { id: "reports", label: "Reports", description: "রিপোর্ট দেখতে পারবে", icon: FileText, category: "Management" },
  
  // System
  { id: "notifications", label: "Notifications", description: "নোটিফিকেশন ম্যানেজ করতে পারবে", icon: Bell, category: "System" },
  { id: "settings", label: "Settings", description: "সেটিংস পরিবর্তন করতে পারবে", icon: Settings, category: "System" },
];

const roleConfig = {
  admin: { label: "Admin", icon: Shield, color: "bg-red-500/10 text-red-500" },
  moderator: { label: "Moderator", icon: UserCheck, color: "bg-purple-500/10 text-purple-500" },
  agent: { label: "Agent", icon: UserPlus, color: "bg-blue-500/10 text-blue-500" },
  support: { label: "Support", icon: Headphones, color: "bg-green-500/10 text-green-500" },
};

const defaultPermissionsByRole: Record<UserRole, string[]> = {
  admin: allPermissions.map(p => p.id), // All permissions
  moderator: ["overview", "users", "videos", "history", "reports"],
  agent: ["overview", "withdrawals", "deposits", "history"],
  support: ["overview", "users", "history"],
};

interface TeamManagementProps {
  filterRole?: UserRole;
  title: string;
  description: string;
}

export default function TeamManagement({ filterRole, title, description }: TeamManagementProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [selectedMemberForPermission, setSelectedMemberForPermission] = useState<TeamMember | null>(null);
  
  const [members, setMembers] = useState<TeamMember[]>([
    { 
      id: "1", 
      name: "Admin User", 
      email: "admin@example.com", 
      role: "admin", 
      status: "active", 
      createdAt: "2024-01-15",
      permissions: defaultPermissionsByRole.admin
    },
    { 
      id: "2", 
      name: "Moderator 1", 
      email: "mod1@example.com", 
      role: "moderator", 
      status: "active", 
      createdAt: "2024-02-10",
      permissions: defaultPermissionsByRole.moderator
    },
    { 
      id: "3", 
      name: "Agent Rahim", 
      email: "rahim@example.com", 
      role: "agent", 
      status: "active", 
      createdAt: "2024-03-05",
      permissions: defaultPermissionsByRole.agent
    },
    { 
      id: "4", 
      name: "Support Karim", 
      email: "karim@example.com", 
      role: "support", 
      status: "active", 
      createdAt: "2024-03-20",
      permissions: defaultPermissionsByRole.support
    },
    { 
      id: "5", 
      name: "Agent Fatima", 
      email: "fatima@example.com", 
      role: "agent", 
      status: "inactive", 
      createdAt: "2024-04-01",
      permissions: defaultPermissionsByRole.agent
    },
    { 
      id: "6", 
      name: "Support Ayesha", 
      email: "ayesha@example.com", 
      role: "support", 
      status: "active", 
      createdAt: "2024-04-15",
      permissions: defaultPermissionsByRole.support
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: filterRole || ("agent" as UserRole),
  });

  const [tempPermissions, setTempPermissions] = useState<string[]>([]);

  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole ? member.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  const handleSubmit = () => {
    const role = formData.role;
    if (editingMember) {
      setMembers(members.map((m) =>
        m.id === editingMember.id
          ? { ...m, name: formData.name, email: formData.email, role: formData.role }
          : m
      ));
      toast({ title: "সফল!", description: "মেম্বার আপডেট হয়েছে।" });
    } else {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: role,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
        permissions: defaultPermissionsByRole[role],
      };
      setMembers([...members, newMember]);
      toast({ title: "সফল!", description: "নতুন মেম্বার যুক্ত হয়েছে।" });
    }
    setIsDialogOpen(false);
    setEditingMember(null);
    setFormData({ name: "", email: "", password: "", role: filterRole || "agent" });
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      password: "",
      role: member.role,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
    toast({ title: "সফল!", description: "মেম্বার মুছে ফেলা হয়েছে।" });
  };

  const toggleStatus = (id: string) => {
    setMembers(members.map((m) =>
      m.id === id
        ? { ...m, status: m.status === "active" ? "inactive" : "active" }
        : m
    ));
  };

  const openPermissionDialog = (member: TeamMember) => {
    setSelectedMemberForPermission(member);
    setTempPermissions([...member.permissions]);
    setIsPermissionDialogOpen(true);
  };

  const togglePermission = (permissionId: string) => {
    setTempPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const selectAllPermissions = () => {
    setTempPermissions(allPermissions.map(p => p.id));
  };

  const clearAllPermissions = () => {
    setTempPermissions([]);
  };

  const savePermissions = () => {
    if (selectedMemberForPermission) {
      setMembers(members.map(m => 
        m.id === selectedMemberForPermission.id
          ? { ...m, permissions: tempPermissions }
          : m
      ));
      toast({ title: "সফল!", description: "পারমিশন আপডেট হয়েছে।" });
    }
    setIsPermissionDialogOpen(false);
    setSelectedMemberForPermission(null);
  };

  // Group permissions by category
  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <AdminLayout title={title}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingMember(null);
                setFormData({ name: "", email: "", password: "", role: filterRole || "agent" });
              }}>
                <Plus className="w-4 h-4 mr-2" />
                নতুন মেম্বার
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingMember ? "মেম্বার এডিট" : "নতুন মেম্বার যুক্ত করুন"}</DialogTitle>
                <DialogDescription>
                  {editingMember ? "মেম্বারের তথ্য আপডেট করুন" : "নতুন টিম মেম্বারের তথ্য দিন"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">নাম</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="নাম লিখুন"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                {!editingMember && (
                  <div className="space-y-2">
                    <Label htmlFor="password">পাসওয়ার্ড</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="পাসওয়ার্ড দিন"
                    />
                  </div>
                )}
                {!filterRole && (
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSubmit}>
                  {editingMember ? "আপডেট করুন" : "যুক্ত করুন"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Permission Dialog */}
        <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                পারমিশন সেটিংস
              </DialogTitle>
              <DialogDescription>
                {selectedMemberForPermission?.name} - এর জন্য এক্সেস পারমিশন সিলেক্ট করুন
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={selectAllPermissions}>
                  সব সিলেক্ট
                </Button>
                <Button variant="outline" size="sm" onClick={clearAllPermissions}>
                  সব বাদ দিন
                </Button>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                      {category}
                    </h4>
                    <div className="grid gap-2">
                      {permissions.map((permission) => {
                        const Icon = permission.icon;
                        const isChecked = tempPermissions.includes(permission.id);
                        return (
                          <div
                            key={permission.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              isChecked 
                                ? "bg-primary/5 border-primary/30" 
                                : "bg-card hover:bg-muted/50"
                            }`}
                            onClick={() => togglePermission(permission.id)}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <Icon className={`w-5 h-5 ${isChecked ? "text-primary" : "text-muted-foreground"}`} />
                            <div className="flex-1">
                              <p className={`font-medium ${isChecked ? "text-foreground" : "text-muted-foreground"}`}>
                                {permission.label}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <div className="flex items-center gap-2 mr-auto">
                <Badge variant="secondary">
                  {tempPermissions.length} / {allPermissions.length} সিলেক্টেড
                </Badge>
              </div>
              <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>
                বাতিল
              </Button>
              <Button onClick={savePermissions}>
                সেভ করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="নাম বা ইমেইল দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => {
                const roleInfo = roleConfig[member.role];
                const RoleIcon = roleInfo.icon;
                return (
                  <div
                    key={member.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors gap-4"
                  >
                    {/* User Info */}
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm sm:text-base">
                          {member.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-foreground text-sm sm:text-base truncate">{member.name}</p>
                          <Badge variant="secondary" className={`${roleInfo.color} text-xs`}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {roleInfo.label}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{member.email}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs text-muted-foreground">
                            {member.permissions.length} পারমিশন
                          </span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">
                            যুক্ত: {member.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pl-12 sm:pl-0">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={member.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {member.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </Badge>
                        <span className="text-xs text-muted-foreground sm:hidden">
                          {member.createdAt}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openPermissionDialog(member)}
                          className="h-8 px-2 sm:px-3"
                        >
                          <Key className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">পারমিশন</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openPermissionDialog(member)}>
                              <Key className="w-4 h-4 mr-2" />
                              পারমিশন
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(member)}>
                              <Edit className="w-4 h-4 mr-2" />
                              এডিট
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleStatus(member.id)}>
                              <UserCog className="w-4 h-4 mr-2" />
                              {member.status === "active" ? "নিষ্ক্রিয় করুন" : "সক্রিয় করুন"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(member.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              মুছুন
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredMembers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  কোনো মেম্বার পাওয়া যায়নি
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
