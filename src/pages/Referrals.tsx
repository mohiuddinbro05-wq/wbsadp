import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Eye, Copy, Gift, Users, TrendingUp } from "lucide-react";
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
          onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
        />
      </div>
    </AdminLayout>
  );
};

export default Referrals;
