import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Eye, Copy } from "lucide-react";

interface Referral {
  id: string;
  referrer: string;
  referred: string;
  code: string;
  bonus: string;
  date: string;
}

const referrals: Referral[] = [
  { id: "REF001", referrer: "আহমেদ হোসেন", referred: "মোহাম্মদ আলী", code: "AHMED123", bonus: "৳100", date: "2026-01-22" },
  { id: "REF002", referrer: "রাহেলা খাতুন", referred: "ফাতেমা আক্তার", code: "RAHELA456", bonus: "৳100", date: "2026-01-21" },
  { id: "REF003", referrer: "করিম উদ্দিন", referred: "জাহিদ হাসান", code: "KARIM789", bonus: "৳100", date: "2026-01-20" },
  { id: "REF004", referrer: "নাজমা বেগম", referred: "সাবরিনা ইসলাম", code: "NAZMA012", bonus: "৳100", date: "2026-01-19" },
  { id: "REF005", referrer: "সোহেল রানা", referred: "মাহমুদুল হক", code: "SOHEL345", bonus: "৳100", date: "2026-01-18" },
];

const columns: Column<Referral>[] = [
  { key: "id", label: "ID" },
  { key: "referrer", label: "Referrer" },
  { key: "referred", label: "Referred User" },
  { 
    key: "code", 
    label: "Code",
    render: (value) => (
      <div className="flex items-center gap-2">
        <code className="bg-muted px-2 py-1 rounded text-sm">{String(value)}</code>
        <Button size="icon" variant="ghost" className="h-6 w-6">
          <Copy className="w-3 h-3" />
        </Button>
      </div>
    ),
  },
  { key: "bonus", label: "Bonus" },
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
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Referrals</p>
            <p className="text-2xl font-bold text-foreground">3,456</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-success">234</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Bonus Paid</p>
            <p className="text-2xl font-bold text-primary">৳3,45,600</p>
          </div>
        </div>

        {/* Table */}
        <DataTable columns={columns} data={referrals} />
      </div>
    </AdminLayout>
  );
};

export default Referrals;
