import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Copy, Gift, Users, TrendingUp, Calendar, User, Clock, Settings, Check, Plus, Trash2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Referral {
  id: string;
  referrer: string;
  referrerPhone: string;
  referred: string;
  referredPhone: string;
  code: string;
  bonus: string;
  date: string;
  status?: "completed" | "pending";
}

interface PendingReferral {
  id: string;
  referrer: string;
  referrerPhone: string;
  referred: string;
  referredPhone: string;
  depositAmount: number;
  commission: number;
  depositDate: string;
  estimatedCredit: string;
  status: "pending" | "processing";
}

interface CommissionTier {
  id: string;
  minReferrals: number;
  maxReferrals: number | null;
  percentage: number;
}

const referrals: Referral[] = [
  { id: "REF001", referrer: "Ahmed Hossain", referrerPhone: "01712345678", referred: "Mohammad Ali", referredPhone: "01812345678", code: "AHMED123", bonus: "$100", date: "2026-01-22", status: "completed" },
  { id: "REF002", referrer: "Rahela Khatun", referrerPhone: "01898765432", referred: "Fatema Akter", referredPhone: "01556789012", code: "RAHELA456", bonus: "$100", date: "2026-01-21", status: "completed" },
  { id: "REF003", referrer: "Karim Uddin", referrerPhone: "01556789012", referred: "Zahid Hassan", referredPhone: "01612345678", code: "KARIM789", bonus: "$100", date: "2026-01-20", status: "completed" },
  { id: "REF004", referrer: "Nazma Begum", referrerPhone: "01612345678", referred: "Sabrina Islam", referredPhone: "01912345678", code: "NAZMA012", bonus: "$100", date: "2026-01-19", status: "completed" },
  { id: "REF005", referrer: "Sohel Rana", referrerPhone: "01812345678", referred: "Mahmudul Haque", referredPhone: "01312345678", code: "SOHEL345", bonus: "$100", date: "2026-01-18", status: "completed" },
  { id: "REF006", referrer: "Ahmed Hossain", referrerPhone: "01712345678", referred: "Rafiq Islam", referredPhone: "01412345678", code: "AHMED123", bonus: "$100", date: "2026-01-17", status: "completed" },
];

const pendingReferrals: PendingReferral[] = [
  { id: "PR001", referrer: "Ahmed Hossain", referrerPhone: "01712345678", referred: "New User 1", referredPhone: "01512345678", depositAmount: 1000, commission: 100, depositDate: "2026-02-03 10:30", estimatedCredit: "2026-02-03 12:45", status: "pending" },
  { id: "PR002", referrer: "Rahela Khatun", referrerPhone: "01898765432", referred: "New User 2", referredPhone: "01612345679", depositAmount: 500, commission: 50, depositDate: "2026-02-03 09:15", estimatedCredit: "2026-02-03 11:30", status: "processing" },
  { id: "PR003", referrer: "Karim Uddin", referrerPhone: "01556789012", referred: "New User 3", referredPhone: "01712345679", depositAmount: 2000, commission: 200, depositDate: "2026-02-03 08:00", estimatedCredit: "2026-02-03 10:15", status: "pending" },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({ title: "Copied!", description: "Referral code copied to clipboard." });
};

const columns: Column<Referral>[] = [
  { key: "id", label: "ID", className: "font-mono" },
  { 
    key: "referrer", 
    label: "Referrer",
    render: (value, row) => (
      <div>
        <p className="font-medium">{String(value)}</p>
        <p className="text-xs text-muted-foreground">{row.referrerPhone}</p>
      </div>
    ),
  },
  { 
    key: "referred", 
    label: "Referred User",
    render: (value, row) => (
      <div>
        <p className="font-medium">{String(value)}</p>
        <p className="text-xs text-muted-foreground">{row.referredPhone}</p>
      </div>
    ),
  },
  { 
    key: "code", 
    label: "Code",
    render: (value) => (
      <div className="flex items-center gap-2">
        <code className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-sm font-bold">{String(value)}</code>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-6 w-6"
          onClick={() => copyToClipboard(String(value))}
        >
          <Copy className="w-3 h-3" />
        </Button>
      </div>
    ),
  },
  { 
    key: "bonus", 
    label: "Bonus",
    render: (value) => <span className="font-bold text-success">{String(value)}</span>,
  },
  { key: "date", label: "Date" },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <Button size="icon" variant="ghost" className="h-8 w-8">
        <Eye className="w-4 h-4" />
      </Button>
    ),
  },
];

const pendingColumns: Column<PendingReferral>[] = [
  { key: "id", label: "ID", className: "font-mono" },
  { 
    key: "referrer", 
    label: "Referrer",
    render: (value, row) => (
      <div>
        <p className="font-medium">{String(value)}</p>
        <p className="text-xs text-muted-foreground">{row.referrerPhone}</p>
      </div>
    ),
  },
  { 
    key: "referred", 
    label: "Referred User",
    render: (value, row) => (
      <div>
        <p className="font-medium">{String(value)}</p>
        <p className="text-xs text-muted-foreground">{row.referredPhone}</p>
      </div>
    ),
  },
  { 
    key: "depositAmount", 
    label: "Deposit",
    render: (value) => <span className="font-medium">${Number(value)}</span>,
  },
  { 
    key: "commission", 
    label: "Commission",
    render: (value) => <span className="font-bold text-success">${Number(value)}</span>,
  },
  { key: "depositDate", label: "Deposit Date" },
  { 
    key: "estimatedCredit", 
    label: "Est. Credit",
    render: (value) => <span className="text-muted-foreground text-sm">{String(value)}</span>,
  },
  { 
    key: "status", 
    label: "Status",
    render: (value) => {
      const statusColors = {
        pending: "bg-warning/10 text-warning",
        processing: "bg-info/10 text-info",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </span>
      );
    },
  },
];

// Mobile Card Renderer for Referrals
const mobileReferralCard = (row: Referral, index: number) => {
  return (
    <div
      key={row.id}
      className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <code className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-bold">{row.code}</code>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            onClick={() => copyToClipboard(row.code)}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <span className="font-bold text-success text-lg">{row.bonus}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <User className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs text-muted-foreground">Referrer</p>
          </div>
          <p className="font-semibold text-sm truncate">{row.referrer}</p>
          <p className="text-xs text-muted-foreground">{row.referrerPhone}</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-success" />
            <p className="text-xs text-muted-foreground">Referred</p>
          </div>
          <p className="font-semibold text-sm truncate">{row.referred}</p>
          <p className="text-xs text-muted-foreground">{row.referredPhone}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded-lg font-mono">{row.id}</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {row.date}
          </span>
        </div>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const mobilePendingCard = (row: PendingReferral, index: number) => {
  const statusColors = {
    pending: "bg-warning/10 text-warning",
    processing: "bg-info/10 text-info",
  };

  return (
    <div
      key={row.id}
      className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="bg-muted px-2 py-1 rounded-lg font-mono text-xs">{row.id}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <User className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs text-muted-foreground">Referrer</p>
          </div>
          <p className="font-semibold text-sm truncate">{row.referrer}</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-success" />
            <p className="text-xs text-muted-foreground">Referred</p>
          </div>
          <p className="font-semibold text-sm truncate">{row.referred}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">Deposit</p>
          <p className="font-medium">${row.depositAmount}</p>
        </div>
        <div className="text-center p-2 bg-success/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Commission</p>
          <p className="font-bold text-success">${row.commission}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Est: {row.estimatedCredit}
        </span>
        <Button size="sm" variant="outline" className="h-7">
          <Check className="w-3 h-3 mr-1" />
          Approve Now
        </Button>
      </div>
    </div>
  );
};

const Referrals = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [autoApproval, setAutoApproval] = useState(true);
  const [commissionTiers, setCommissionTiers] = useState<CommissionTier[]>([
    { id: "1", minReferrals: 1, maxReferrals: 10, percentage: 10 },
    { id: "2", minReferrals: 11, maxReferrals: 50, percentage: 9 },
    { id: "3", minReferrals: 51, maxReferrals: 100, percentage: 8 },
    { id: "4", minReferrals: 101, maxReferrals: null, percentage: 7 },
  ]);

  const stats = {
    totalReferrals: referrals.length,
    thisMonth: referrals.filter(r => r.date.startsWith("2026-01")).length,
    totalBonusPaid: referrals.reduce((acc, r) => acc + parseInt(r.bonus.replace("$", "")), 0),
    pending: pendingReferrals.length,
  };

  const handleApproveNow = (id: string) => {
    toast({
      title: "Approved",
      description: `Referral commission ${id} has been credited immediately.`,
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Commission settings have been updated.",
    });
    setSettingsOpen(false);
  };

  const addTier = () => {
    const lastTier = commissionTiers[commissionTiers.length - 1];
    const newId = Date.now().toString();
    setCommissionTiers([
      ...commissionTiers,
      { id: newId, minReferrals: (lastTier?.maxReferrals || 0) + 1, maxReferrals: null, percentage: 5 }
    ]);
  };

  const removeTier = (id: string) => {
    setCommissionTiers(commissionTiers.filter(t => t.id !== id));
  };

  const updateTier = (id: string, field: keyof CommissionTier, value: number | null) => {
    setCommissionTiers(commissionTiers.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  return (
    <AdminLayout title="Referrals">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Referrals" value={stats.totalReferrals.toString()} icon={Gift} variant="info" index={0} />
          <MiniStat title="This Month" value={stats.thisMonth.toString()} icon={Users} variant="success" index={1} />
          <MiniStat title="Total Bonus Paid" value={`$${stats.totalBonusPaid}`} icon={TrendingUp} variant="warning" index={2} />
          <MiniStat title="Pending" value={stats.pending.toString()} icon={Clock} variant="info" index={3} />
        </div>

        {/* Settings Button */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setSettingsOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Commission Settings
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="history">Referral History</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({stats.pending})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <DataTable
              columns={columns}
              data={referrals}
              title="Referral History"
              searchPlaceholder="Search by user, code..."
              mobileCardRender={mobileReferralCard}
              onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
              onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
            />
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <DataTable
              columns={pendingColumns}
              data={pendingReferrals}
              title="Pending Referral Commissions"
              searchPlaceholder="Search pending..."
              mobileCardRender={mobilePendingCard}
              onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
              onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Commission Settings</DialogTitle>
            <DialogDescription>
              Configure referral commission tiers and auto-approval settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Auto Approval Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Auto Approval</p>
                <p className="text-sm text-muted-foreground">
                  Automatically credit referral commission (2 min - 3 hours random delay)
                </p>
              </div>
              <Switch checked={autoApproval} onCheckedChange={setAutoApproval} />
            </div>

            {/* Commission Tiers */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Commission Tiers</Label>
              <p className="text-sm text-muted-foreground">
                Set commission percentages based on total referral count
              </p>
              <div className="space-y-2">
                {commissionTiers.map((tier, index) => (
                  <div key={tier.id} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">From</Label>
                        <Input
                          type="number"
                          value={tier.minReferrals}
                          onChange={(e) => updateTier(tier.id, "minReferrals", parseInt(e.target.value))}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">To</Label>
                        <Input
                          type="number"
                          value={tier.maxReferrals || ""}
                          placeholder="∞"
                          onChange={(e) => updateTier(tier.id, "maxReferrals", e.target.value ? parseInt(e.target.value) : null)}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Rate %</Label>
                        <Input
                          type="number"
                          value={tier.percentage}
                          onChange={(e) => updateTier(tier.id, "percentage", parseInt(e.target.value))}
                          className="h-8"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-destructive"
                      onClick={() => removeTier(tier.id)}
                      disabled={commissionTiers.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addTier} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Tier
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Referrals;
