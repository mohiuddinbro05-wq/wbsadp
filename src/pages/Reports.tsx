import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Download,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  Users,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCcw,
  FileSpreadsheet,
  FileType,
  FileCode,
  Play,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts
const revenueData = [
  { name: "Jan", deposits: 450000, withdrawals: 320000, net: 130000 },
  { name: "Feb", deposits: 520000, withdrawals: 380000, net: 140000 },
  { name: "Mar", deposits: 480000, withdrawals: 350000, net: 130000 },
  { name: "Apr", deposits: 610000, withdrawals: 420000, net: 190000 },
  { name: "May", deposits: 550000, withdrawals: 400000, net: 150000 },
  { name: "Jun", deposits: 680000, withdrawals: 450000, net: 230000 },
  { name: "Jul", deposits: 720000, withdrawals: 480000, net: 240000 },
];

const userGrowthData = [
  { name: "Jan", newUsers: 1200, activeUsers: 8500 },
  { name: "Feb", newUsers: 1400, activeUsers: 9200 },
  { name: "Mar", newUsers: 1100, activeUsers: 9800 },
  { name: "Apr", newUsers: 1600, activeUsers: 10500 },
  { name: "May", newUsers: 1350, activeUsers: 11200 },
  { name: "Jun", newUsers: 1800, activeUsers: 12100 },
  { name: "Jul", newUsers: 2100, activeUsers: 12847 },
];

const transactionTypeData = [
  { name: "Deposit", value: 45, color: "hsl(var(--success))" },
  { name: "Withdrawal", value: 35, color: "hsl(var(--destructive))" },
  { name: "Transfer", value: 15, color: "hsl(var(--info))" },
  { name: "Bonus", value: 5, color: "hsl(var(--warning))" },
];

const paymentMethodData = [
  { name: "bKash", transactions: 4500, amount: "৳25,00,000" },
  { name: "Nagad", transactions: 3200, amount: "৳18,50,000" },
  { name: "Rocket", transactions: 1800, amount: "৳9,20,000" },
  { name: "Bank", transactions: 950, amount: "৳12,80,000" },
];

const quickReports = [
  {
    id: "daily",
    title: "Daily Summary",
    description: "আজকের সব লেনদেনের সারসংক্ষেপ",
    icon: FileText,
    lastGenerated: "Today, 11:30 AM",
    status: "ready",
  },
  {
    id: "weekly",
    title: "Weekly Report",
    description: "সাপ্তাহিক পারফরম্যান্স রিপোর্ট",
    icon: BarChart3,
    lastGenerated: "Jan 19, 2026",
    status: "ready",
  },
  {
    id: "monthly",
    title: "Monthly Overview",
    description: "মাসিক আর্থিক বিশ্লেষণ",
    icon: PieChart,
    lastGenerated: "Jan 01, 2026",
    status: "ready",
  },
  {
    id: "users",
    title: "User Analytics",
    description: "ইউজার গ্রোথ ও এনগেজমেন্ট",
    icon: Users,
    lastGenerated: "Jan 15, 2026",
    status: "ready",
  },
];

const Reports = () => {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [selectedReportTypes, setSelectedReportTypes] = useState<string[]>([
    "transactions",
    "users",
  ]);

  const handleQuickReport = async (reportId: string) => {
    setIsGenerating(reportId);
    toast({
      title: "রিপোর্ট তৈরি হচ্ছে...",
      description: "অনুগ্রহ করে অপেক্ষা করুন।",
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(null);
    toast({
      title: "রিপোর্ট প্রস্তুত!",
      description: "ডাউনলোড শুরু হচ্ছে...",
    });
  };

  const handleCustomReport = async () => {
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "তারিখ নির্বাচন করুন",
        description: "শুরু ও শেষ তারিখ নির্বাচন করুন।",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating("custom");
    toast({
      title: "কাস্টম রিপোর্ট তৈরি হচ্ছে...",
      description: "এটি কিছু সময় নিতে পারে।",
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsGenerating(null);
    toast({
      title: "কাস্টম রিপোর্ট প্রস্তুত!",
      description: "ডাউনলোড শুরু হচ্ছে...",
    });
  };

  const toggleReportType = (type: string) => {
    setSelectedReportTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <AdminLayout title="Reports & Analytics">
      <div className="space-y-6 animate-fade-in">
        {/* Summary Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400 truncate">৳45.2L</p>
                  <p className="text-xs text-green-600 dark:text-green-500">Total Deposits</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-400 truncate">৳32.1L</p>
                  <p className="text-xs text-red-600 dark:text-red-500">Total Withdrawals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400 truncate">12,847</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Wallet className="w-5 h-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-400 truncate">৳13.1L</p>
                  <p className="text-xs text-purple-600 dark:text-purple-500">Net Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-muted/50 p-1 h-auto">
            <TabsTrigger value="analytics" className="gap-2 whitespace-nowrap">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="quick" className="gap-2 whitespace-nowrap">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Reports</span>
            </TabsTrigger>
            <TabsTrigger value="custom" className="gap-2 whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Custom Builder</span>
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">Revenue Overview</CardTitle>
                    <CardDescription>মাসিক ডিপোজিট ও উইথড্র তুলনা</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCcw className="w-4 h-4" />
                      <span className="hidden sm:inline">Refresh</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorWithdrawals" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `৳${v / 1000}K`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`৳${value.toLocaleString()}`, ""]}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="deposits"
                        name="Deposits"
                        stroke="hsl(var(--success))"
                        fillOpacity={1}
                        fill="url(#colorDeposits)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="withdrawals"
                        name="Withdrawals"
                        stroke="hsl(var(--destructive))"
                        fillOpacity={1}
                        fill="url(#colorWithdrawals)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Two Column Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* User Growth */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">User Growth</CardTitle>
                  <CardDescription>নতুন ও অ্যাক্টিভ ইউজার</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                        <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="newUsers" name="New Users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="activeUsers" name="Active Users" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Types */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Transaction Types</CardTitle>
                  <CardDescription>লেনদেনের ধরন অনুসারে বিভাজন</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={transactionTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {transactionTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {transactionTypeData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods Table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payment Methods Performance</CardTitle>
                <CardDescription>পেমেন্ট মেথড অনুসারে লেনদেন</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethodData.map((method, index) => (
                    <div
                      key={method.name}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-xl animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                          {method.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{method.name}</p>
                          <p className="text-xs text-muted-foreground">{method.transactions.toLocaleString()} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-success">{method.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Reports Tab */}
          <TabsContent value="quick" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {quickReports.map((report, index) => {
                const Icon = report.icon;
                return (
                  <Card
                    key={report.id}
                    className="animate-fade-in-up animation-fill-forwards opacity-0"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl gradient-primary text-primary-foreground shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{report.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                            <CheckCircle className="w-3.5 h-3.5 text-success" />
                            <span>Last: {report.lastGenerated}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => handleQuickReport(report.id)}
                              disabled={isGenerating === report.id}
                            >
                              {isGenerating === report.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                              Generate
                            </Button>
                            <Button size="sm" className="gap-2">
                              <Download className="w-4 h-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Custom Report Builder Tab */}
          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Custom Report Builder
                </CardTitle>
                <CardDescription>
                  আপনার প্রয়োজন অনুযায়ী কাস্টম রিপোর্ট তৈরি করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">From</Label>
                      <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">To</Label>
                      <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Report Types */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Include in Report</Label>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { id: "transactions", label: "Transactions", icon: ArrowUpRight },
                      { id: "users", label: "Users", icon: Users },
                      { id: "deposits", label: "Deposits", icon: TrendingUp },
                      { id: "withdrawals", label: "Withdrawals", icon: TrendingDown },
                      { id: "referrals", label: "Referrals", icon: Users },
                      { id: "revenue", label: "Revenue", icon: Wallet },
                    ].map((type) => (
                      <div
                        key={type.id}
                        className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => toggleReportType(type.id)}
                      >
                        <Checkbox
                          checked={selectedReportTypes.includes(type.id)}
                          onCheckedChange={() => toggleReportType(type.id)}
                        />
                        <type.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Format */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Export Format</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "pdf", label: "PDF", icon: FileType },
                      { id: "excel", label: "Excel", icon: FileSpreadsheet },
                      { id: "json", label: "JSON", icon: FileCode },
                    ].map((format) => (
                      <Button
                        key={format.id}
                        variant={selectedFormat === format.id ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                        onClick={() => setSelectedFormat(format.id)}
                      >
                        <format.icon className="w-4 h-4" />
                        {format.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <Button
                    className="gap-2 flex-1 sm:flex-none"
                    onClick={handleCustomReport}
                    disabled={isGenerating === "custom"}
                  >
                    {isGenerating === "custom" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    Generate Report
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Reports;
