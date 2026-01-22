import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react";

const reports = [
  {
    title: "Daily Report",
    description: "Daily transaction summary",
    icon: FileText,
    lastGenerated: "2026-01-22",
  },
  {
    title: "Weekly Report",
    description: "Weekly performance metrics",
    icon: BarChart3,
    lastGenerated: "2026-01-19",
  },
  {
    title: "Monthly Report",
    description: "Monthly financial overview",
    icon: PieChart,
    lastGenerated: "2026-01-01",
  },
  {
    title: "User Growth Report",
    description: "User acquisition and retention",
    icon: TrendingUp,
    lastGenerated: "2026-01-15",
  },
];

const Reports = () => {
  return (
    <AdminLayout title="Reports">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Reports Generated</p>
            <p className="text-2xl font-bold text-foreground">156</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-success">22</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">3</p>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {reports.map((report) => (
            <Card key={report.title}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Last generated: {report.lastGenerated}
                  </p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
