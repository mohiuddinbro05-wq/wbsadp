import { AdminLayout } from "@/components/admin/AdminLayout";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileText, BarChart3, PieChart, TrendingUp, Calendar, Clock, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const reports = [
  {
    title: "Daily Report",
    description: "Daily transaction summary with detailed breakdown",
    icon: FileText,
    lastGenerated: "2026-01-22, 11:30 AM",
    status: "ready",
    color: "primary",
  },
  {
    title: "Weekly Report",
    description: "Weekly performance metrics and analytics",
    icon: BarChart3,
    lastGenerated: "2026-01-19, 09:00 AM",
    status: "ready",
    color: "success",
  },
  {
    title: "Monthly Report",
    description: "Monthly financial overview and KPIs",
    icon: PieChart,
    lastGenerated: "2026-01-01, 12:00 AM",
    status: "ready",
    color: "warning",
  },
  {
    title: "User Growth Report",
    description: "User acquisition, retention and churn analysis",
    icon: TrendingUp,
    lastGenerated: "2026-01-15, 03:45 PM",
    status: "ready",
    color: "info",
  },
];

const handleDownload = (reportName: string) => {
  toast({
    title: "Download Started",
    description: `${reportName} is being downloaded.`,
  });
};

const handleGenerate = (reportName: string) => {
  toast({
    title: "Report Generation Started",
    description: `${reportName} is being generated. This may take a few minutes.`,
  });
};

const Reports = () => {
  return (
    <AdminLayout title="Reports">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MiniStat title="Total Reports Generated" value="156" icon={FileText} variant="info" index={0} />
          <MiniStat title="This Month" value="22" icon={Calendar} variant="success" index={1} />
          <MiniStat title="Processing" value="3" icon={Clock} variant="warning" index={2} />
        </div>

        {/* Report Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {reports.map((report, index) => {
            const Icon = report.icon;
            return (
              <Card 
                key={report.title} 
                className="card-hover animate-fade-in-up animation-fill-forwards opacity-0 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-start gap-4 pb-4">
                  <div className={`p-3 rounded-xl gradient-${report.color} text-primary-foreground shadow-glow`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Last: {report.lastGenerated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => handleGenerate(report.title)}
                      >
                        <TrendingUp className="w-4 h-4" />
                        Generate
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => handleDownload(report.title)}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Report Builder */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Custom Report Builder
            </CardTitle>
            <CardDescription>
              Create custom reports with your preferred date range and filters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-4 rounded-xl bg-muted/50 border border-dashed border-border text-center">
                <p className="text-sm text-muted-foreground mb-2">Select date range and filters to generate a custom report</p>
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Reports;
