import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Plus, MoreVertical, Edit, Trash2, Shield, Search, UserCog, UserPlus, Headphones, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "admin" | "moderator" | "agent" | "support";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  avatar?: string;
  createdAt: string;
}

const roleConfig = {
  admin: { label: "Admin", icon: Shield, color: "bg-red-500/10 text-red-500" },
  moderator: { label: "Moderator", icon: UserCheck, color: "bg-purple-500/10 text-purple-500" },
  agent: { label: "Agent", icon: UserPlus, color: "bg-blue-500/10 text-blue-500" },
  support: { label: "Support", icon: Headphones, color: "bg-green-500/10 text-green-500" },
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
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", status: "active", createdAt: "2024-01-15" },
    { id: "2", name: "Moderator 1", email: "mod1@example.com", role: "moderator", status: "active", createdAt: "2024-02-10" },
    { id: "3", name: "Agent Rahim", email: "rahim@example.com", role: "agent", status: "active", createdAt: "2024-03-05" },
    { id: "4", name: "Support Karim", email: "karim@example.com", role: "support", status: "active", createdAt: "2024-03-20" },
    { id: "5", name: "Agent Fatima", email: "fatima@example.com", role: "agent", status: "inactive", createdAt: "2024-04-01" },
    { id: "6", name: "Support Ayesha", email: "ayesha@example.com", role: "support", status: "active", createdAt: "2024-04-15" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: filterRole || ("agent" as UserRole),
  });

  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole ? member.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  const handleSubmit = () => {
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
        role: formData.role,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
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
                    className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{member.name}</p>
                          <Badge variant="secondary" className={roleInfo.color}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {roleInfo.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">যুক্ত হয়েছে: {member.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
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
