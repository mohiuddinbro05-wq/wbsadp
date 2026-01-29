import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Eye, Copy, Gift, Users, TrendingUp, Calendar, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Referral {
  id: string;
  referrer: string;
  referrerPhone: string;
  referred: string;
  referredPhone: string;
  code: string;
  bonus: string;
  date: string;
}

const referrals: Referral[] = [
  { id: "REF001", referrer: "আহমেদ হোসেন", referrerPhone: "01712345678", referred: "মোহাম্মদ আলী", referredPhone: "01812345678", code: "AHMED123", bonus: "৳100", date: "2026-01-22" },
  { id: "REF002", referrer: "রাহেলা খাতুন", referrerPhone: "01898765432", referred: "ফাতেমা আক্তার", referredPhone: "01556789012", code: "RAHELA456", bonus: "৳100", date: "2026-01-21" },
  { id: "REF003", referrer: "করিম উদ্দিন", referrerPhone: "01556789012", referred: "জাহিদ হাসান", referredPhone: "01612345678", code: "KARIM789", bonus: "৳100", date: "2026-01-20" },
  { id: "REF004", referrer: "নাজমা বেগম", referrerPhone: "01612345678", referred: "সাবরিনা ইসলাম", referredPhone: "01912345678", code: "NAZMA012", bonus: "৳100", date: "2026-01-19" },
  { id: "REF005", referrer: "সোহেল রানা", referrerPhone: "01812345678", referred: "মাহমুদুল হক", referredPhone: "01312345678", code: "SOHEL345", bonus: "৳100", date: "2026-01-18" },
  { id: "REF006", referrer: "আহমেদ হোসেন", referrerPhone: "01712345678", referred: "রফিক ইসলাম", referredPhone: "01412345678", code: "AHMED123", bonus: "৳100", date: "2026-01-17" },
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

// Mobile Card Renderer for Referrals
const mobileReferralCard = (row: Referral, index: number) => {
  return (
    <div
      key={row.id}
      className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header with Code */}
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

      {/* Referrer & Referred */}
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

      {/* Footer */}
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

const Referrals = () => {
  return (
    <AdminLayout title="Referrals">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MiniStat title="Total Referrals" value="3,456" icon={Gift} variant="info" index={0} />
          <MiniStat title="This Month" value="234" icon={Users} variant="success" index={1} />
          <MiniStat title="Total Bonus Paid" value="৳3,45,600" icon={TrendingUp} variant="warning" index={2} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={referrals}
          title="Referral History"
          searchPlaceholder="Search by user, code..."
          mobileCardRender={mobileReferralCard}
          onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
        />
      </div>
    </AdminLayout>
  );
};

export default Referrals;
