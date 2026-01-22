import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { 
  Search, 
  User, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Crown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Gift,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Eye,
  Video,
  Target,
  Shield,
  Copy,
  Smartphone,
  Building,
  UserPlus,
  DollarSign,
  Activity,
  Award,
  Banknote,
  CircleDollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  ShieldCheck,
  Ban,
  Hash
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  nidNumber: string;
  avatar?: string;
  status: "active" | "inactive" | "banned";
  joinDate: string;
  lastActive: string;
  ipAddress: string;
  deviceInfo: string;
  package: {
    name: string;
    price: number;
    expiryDate: string;
    purchaseDate: string;
    videosPerDay: number;
    perVideoRate: number;
  };
  balance: {
    current: number;
    totalEarned: number;
    totalWithdrawn: number;
    pending: number;
    totalDeposited: number;
  };
  turnover: {
    required: number;
    current: number;
  };
  referral: {
    code: string;
    totalReferred: number;
    totalEarnings: number;
    referredBy?: string;
    referredById?: string;
    level1Count: number;
    level2Count: number;
    level3Count: number;
  };
  stats: {
    totalVideosWatched: number;
    todayVideosWatched: number;
    totalDeposits: number;
    totalWithdrawals: number;
    pendingWithdrawals: number;
    rejectedWithdrawals: number;
    loginCount: number;
    lastLoginDate: string;
  };
  paymentMethods: PaymentMethod[];
  deposits: Transaction[];
  withdrawals: Transaction[];
  activityLog: ActivityItem[];
}

interface PaymentMethod {
  id: string;
  type: string;
  accountNumber: string;
  accountName: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  amount: number;
  method: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  accountNumber?: string;
  note?: string;
  processedBy?: string;
  processedAt?: string;
}

interface ActivityItem {
  id: string;
  action: string;
  details: string;
  date: string;
  ip?: string;
}

// Mock user database
const mockUsers: Record<string, UserData> = {
  "USR001": {
    id: "USR001",
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    phone: "+880 1712-345678",
    address: "House 12, Road 5, Dhanmondi, Dhaka-1205, Bangladesh",
    nidNumber: "1990123456789",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-03-20 14:30",
    ipAddress: "103.56.123.45",
    deviceInfo: "Android 13, Samsung Galaxy S23",
    package: {
      name: "Premium",
      price: 999,
      expiryDate: "2024-04-15",
      purchaseDate: "2024-03-15",
      videosPerDay: 20,
      perVideoRate: 15,
    },
    balance: {
      current: 2500,
      totalEarned: 15000,
      totalWithdrawn: 12500,
      pending: 500,
      totalDeposited: 5000,
    },
    turnover: {
      required: 50000,
      current: 45000,
    },
    referral: {
      code: "RAHIM2024",
      totalReferred: 25,
      totalEarnings: 5000,
      referredBy: "Karim Uddin",
      referredById: "USR005",
      level1Count: 15,
      level2Count: 8,
      level3Count: 2,
    },
    stats: {
      totalVideosWatched: 450,
      todayVideosWatched: 8,
      totalDeposits: 5,
      totalWithdrawals: 12,
      pendingWithdrawals: 1,
      rejectedWithdrawals: 2,
      loginCount: 156,
      lastLoginDate: "2024-03-20",
    },
    paymentMethods: [
      { id: "PM1", type: "bKash", accountNumber: "01712345678", accountName: "Rahim Ahmed", isDefault: true },
      { id: "PM2", type: "Nagad", accountNumber: "01812345678", accountName: "Rahim Ahmed", isDefault: false },
    ],
    deposits: [
      { id: "DEP001", amount: 999, method: "bKash", status: "approved", date: "2024-03-15", accountNumber: "01712345678", processedBy: "Admin", processedAt: "2024-03-15 10:30" },
      { id: "DEP002", amount: 500, method: "Nagad", status: "approved", date: "2024-02-20", accountNumber: "01812345678", processedBy: "Admin", processedAt: "2024-02-20 14:15" },
      { id: "DEP003", amount: 1000, method: "bKash", status: "pending", date: "2024-03-20", accountNumber: "01712345678" },
    ],
    withdrawals: [
      { id: "WTH001", amount: 2000, method: "bKash", status: "approved", date: "2024-03-18", accountNumber: "01712345678", processedBy: "Agent Karim", processedAt: "2024-03-18 16:45" },
      { id: "WTH002", amount: 1500, method: "Nagad", status: "approved", date: "2024-03-10", accountNumber: "01812345678", processedBy: "Agent Karim", processedAt: "2024-03-10 11:20" },
      { id: "WTH003", amount: 500, method: "bKash", status: "pending", date: "2024-03-20", accountNumber: "01712345678" },
    ],
    activityLog: [
      { id: "ACT1", action: "লগইন", details: "সফল লগইন", date: "2024-03-20 14:30", ip: "103.56.123.45" },
      { id: "ACT2", action: "উত্তোলন অনুরোধ", details: "৳500 bKash এ উত্তোলন অনুরোধ", date: "2024-03-20 14:25" },
      { id: "ACT3", action: "ভিডিও দেখা", details: "8টি ভিডিও দেখে ৳120 আয়", date: "2024-03-20 13:00" },
      { id: "ACT4", action: "প্যাকেজ কেনা", details: "Premium প্যাকেজ কেনা ৳999", date: "2024-03-15 10:00" },
    ],
  },
  "USR002": {
    id: "USR002",
    name: "Fatima Begum",
    email: "fatima@example.com",
    phone: "+880 1812-987654",
    address: "Station Road, Chittagong, Bangladesh",
    nidNumber: "1985987654321",
    status: "active",
    joinDate: "2024-02-10",
    lastActive: "2024-03-19 10:15",
    ipAddress: "103.56.124.78",
    deviceInfo: "iOS 17, iPhone 14",
    package: {
      name: "Basic",
      price: 499,
      expiryDate: "2024-04-10",
      purchaseDate: "2024-03-10",
      videosPerDay: 10,
      perVideoRate: 10,
    },
    balance: {
      current: 1200,
      totalEarned: 8000,
      totalWithdrawn: 6800,
      pending: 0,
      totalDeposited: 2500,
    },
    turnover: {
      required: 30000,
      current: 30000,
    },
    referral: {
      code: "FATIMA24",
      totalReferred: 10,
      totalEarnings: 2000,
      level1Count: 7,
      level2Count: 3,
      level3Count: 0,
    },
    stats: {
      totalVideosWatched: 280,
      todayVideosWatched: 5,
      totalDeposits: 3,
      totalWithdrawals: 8,
      pendingWithdrawals: 0,
      rejectedWithdrawals: 0,
      loginCount: 89,
      lastLoginDate: "2024-03-19",
    },
    paymentMethods: [
      { id: "PM3", type: "bKash", accountNumber: "01812987654", accountName: "Fatima Begum", isDefault: true },
    ],
    deposits: [
      { id: "DEP004", amount: 499, method: "Rocket", status: "approved", date: "2024-03-10", accountNumber: "01912345678", processedBy: "Admin", processedAt: "2024-03-10 09:30" },
    ],
    withdrawals: [
      { id: "WTH004", amount: 1000, method: "bKash", status: "approved", date: "2024-03-15", accountNumber: "01812987654", processedBy: "Agent Rahim", processedAt: "2024-03-15 15:00" },
    ],
    activityLog: [
      { id: "ACT5", action: "লগইন", details: "সফল লগইন", date: "2024-03-19 10:15", ip: "103.56.124.78" },
      { id: "ACT6", action: "ভিডিও দেখা", details: "5টি ভিডিও দেখে ৳50 আয়", date: "2024-03-19 09:30" },
    ],
  },
};

const statusConfig = {
  active: { label: "সক্রিয়", color: "bg-green-500/10 text-green-500", icon: CheckCircle },
  inactive: { label: "নিষ্ক্রিয়", color: "bg-yellow-500/10 text-yellow-500", icon: AlertCircle },
  banned: { label: "ব্যান", color: "bg-red-500/10 text-red-500", icon: XCircle },
};

const transactionStatusConfig = {
  pending: { label: "পেন্ডিং", color: "bg-yellow-500/10 text-yellow-500" },
  approved: { label: "অনুমোদিত", color: "bg-green-500/10 text-green-500" },
  rejected: { label: "বাতিল", color: "bg-red-500/10 text-red-500" },
};

export default function History() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে ইউজার আইডি লিখুন",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setNotFound(false);
    
    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[searchQuery.toUpperCase()];
      if (user) {
        setUserData(user);
        setNotFound(false);
      } else {
        setUserData(null);
        setNotFound(true);
        toast({
          title: "ইউজার পাওয়া যায়নি",
          description: `"${searchQuery}" আইডি দিয়ে কোনো ইউজার পাওয়া যায়নি`,
          variant: "destructive",
        });
      }
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AdminLayout title="User History">
      <div className="space-y-6">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              ইউজার খুঁজুন
            </CardTitle>
            <CardDescription>
              ইউজার আইডি দিয়ে সার্চ করে সম্পূর্ণ তথ্য দেখুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ইউজার আইডি লিখুন (যেমন: USR001)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? "খুঁজছে..." : "সার্চ করুন"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ডেমো আইডি: USR001, USR002
            </p>
          </CardContent>
        </Card>

        {/* Not Found Message */}
        {notFound && (
          <Card className="border-destructive/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <XCircle className="w-16 h-16 text-destructive mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">ইউজার পাওয়া যায়নি</h3>
              <p className="text-muted-foreground text-center">
                "{searchQuery}" আইডি দিয়ে কোনো ইউজার খুঁজে পাওয়া যায়নি।
                <br />
                অনুগ্রহ করে সঠিক আইডি দিয়ে আবার চেষ্টা করুন।
              </p>
            </CardContent>
          </Card>
        )}

        {/* User Data Display */}
        {userData && (
          <div className="space-y-6 animate-fade-in">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userData.avatar} />
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {userData.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-2xl font-bold text-foreground">{userData.name}</h2>
                        <Badge className={statusConfig[userData.status].color}>
                          {statusConfig[userData.status].label}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground font-mono">ID: {userData.id}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            navigator.clipboard.writeText(userData.id);
                            toast({ title: "কপি হয়েছে", description: "ইউজার আইডি কপি হয়েছে" });
                          }}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          ID কপি
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Contact & Device Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> ইমেইল
                    </p>
                    <p className="font-medium truncate">{userData.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> ফোন
                    </p>
                    <p className="font-medium font-mono">{userData.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5" /> NID
                    </p>
                    <p className="font-medium font-mono">{userData.nidNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> ঠিকানা
                    </p>
                    <p className="font-medium text-xs">{userData.address}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5" /> ডিভাইস
                    </p>
                    <p className="font-medium text-xs">{userData.deviceInfo}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> IP Address
                    </p>
                    <p className="font-medium font-mono text-xs">{userData.ipAddress}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> যোগদান
                    </p>
                    <p className="font-medium">{userData.joinDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> সর্বশেষ সক্রিয়
                    </p>
                    <p className="font-medium">{userData.lastActive}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Balance & Turnover Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-success/10">
                      <Wallet className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">বর্তমান ব্যালেন্স</p>
                      <p className="text-lg font-bold text-success">৳{userData.balance.current.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">মোট আয়</p>
                      <p className="text-lg font-bold text-primary">৳{userData.balance.totalEarned.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-warning/10">
                      <TrendingDown className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">মোট উত্তোলন</p>
                      <p className="text-lg font-bold text-warning">৳{userData.balance.totalWithdrawn.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-info/10">
                      <CircleDollarSign className="w-5 h-5 text-info" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">মোট ডিপোজিট</p>
                      <p className="text-lg font-bold text-info">৳{userData.balance.totalDeposited.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">পেন্ডিং</p>
                      <p className="text-lg font-bold text-destructive">৳{userData.balance.pending.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Turnover Card */}
            <Card className="border-2 border-warning/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5 text-warning" />
                  টার্নওভার তথ্য
                  {userData.turnover.current >= userData.turnover.required ? (
                    <Badge className="bg-success/10 text-success ml-2">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      উত্তোলনযোগ্য
                    </Badge>
                  ) : (
                    <Badge className="bg-destructive/10 text-destructive ml-2">
                      <Ban className="w-3 h-3 mr-1" />
                      উত্তোলন অযোগ্য
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">প্রয়োজনীয় টার্নওভার</p>
                    <p className="text-xl font-bold text-warning">৳{userData.turnover.required.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">বর্তমান টার্নওভার</p>
                    <p className="text-xl font-bold text-primary">৳{userData.turnover.current.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">বাকি টার্নওভার</p>
                    <p className={cn(
                      "text-xl font-bold",
                      userData.turnover.current >= userData.turnover.required ? "text-success" : "text-destructive"
                    )}>
                      ৳{Math.max(0, userData.turnover.required - userData.turnover.current).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">অগ্রগতি</p>
                    <p className={cn(
                      "text-xl font-bold",
                      userData.turnover.current >= userData.turnover.required ? "text-success" : "text-warning"
                    )}>
                      {userData.turnover.required > 0 
                        ? Math.min(100, (userData.turnover.current / userData.turnover.required) * 100).toFixed(0)
                        : 100
                      }%
                    </p>
                  </div>
                </div>
                <Progress 
                  value={userData.turnover.required > 0 
                    ? Math.min(100, (userData.turnover.current / userData.turnover.required) * 100)
                    : 100
                  } 
                  className={cn(
                    "h-3",
                    userData.turnover.current >= userData.turnover.required && "[&>div]:bg-success"
                  )} 
                />
                {userData.turnover.current < userData.turnover.required && (
                  <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    এই ইউজার এখনও উত্তোলন করতে পারবে না। আরো ৳{(userData.turnover.required - userData.turnover.current).toLocaleString()} টার্নওভার প্রয়োজন।
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Detailed Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="flex flex-wrap h-auto gap-1 w-full max-w-2xl">
                <TabsTrigger value="overview" className="text-xs sm:text-sm">ওভারভিউ</TabsTrigger>
                <TabsTrigger value="package" className="text-xs sm:text-sm">প্যাকেজ</TabsTrigger>
                <TabsTrigger value="deposits" className="text-xs sm:text-sm">ডিপোজিট</TabsTrigger>
                <TabsTrigger value="withdrawals" className="text-xs sm:text-sm">উত্তোলন</TabsTrigger>
                <TabsTrigger value="referrals" className="text-xs sm:text-sm">রেফারেল</TabsTrigger>
                <TabsTrigger value="payments" className="text-xs sm:text-sm">পেমেন্ট মেথড</TabsTrigger>
                <TabsTrigger value="activity" className="text-xs sm:text-sm">এক্টিভিটি</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Video Stats */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Video className="w-4 h-4 text-primary" />
                        ভিডিও কার্যক্রম
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">মোট ভিডিও দেখেছে</span>
                        <span className="font-bold text-primary">{userData.stats.totalVideosWatched}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">আজ দেখেছে</span>
                        <span className="font-bold">{userData.stats.todayVideosWatched}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">দৈনিক লিমিট</span>
                        <span className="font-medium">{userData.package.videosPerDay}</span>
                      </div>
                      <Progress 
                        value={(userData.stats.todayVideosWatched / userData.package.videosPerDay) * 100} 
                        className="h-2 mt-2" 
                      />
                    </CardContent>
                  </Card>

                  {/* Login Stats */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Activity className="w-4 h-4 text-primary" />
                        লগইন তথ্য
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">মোট লগইন</span>
                        <span className="font-bold">{userData.stats.loginCount} বার</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">শেষ লগইন</span>
                        <span className="font-medium">{userData.stats.lastLoginDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">IP Address</span>
                        <span className="font-mono text-xs">{userData.ipAddress}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transaction Summary */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <CreditCard className="w-4 h-4 text-primary" />
                        লেনদেন সারসংক্ষেপ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">মোট ডিপোজিট</span>
                        <span className="font-bold text-success">{userData.stats.totalDeposits} টি</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">মোট উত্তোলন</span>
                        <span className="font-bold">{userData.stats.totalWithdrawals} টি</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">পেন্ডিং উত্তোলন</span>
                        <span className="font-bold text-warning">{userData.stats.pendingWithdrawals} টি</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">বাতিল উত্তোলন</span>
                        <span className="font-bold text-destructive">{userData.stats.rejectedWithdrawals} টি</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Package Tab */}
              <TabsContent value="package">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-primary" />
                      প্যাকেজ বিস্তারিত
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="p-4 rounded-lg bg-primary/5 border">
                        <p className="text-sm text-muted-foreground mb-1">প্যাকেজ নাম</p>
                        <p className="text-xl font-bold text-primary">{userData.package.name}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 border">
                        <p className="text-sm text-muted-foreground mb-1">মূল্য</p>
                        <p className="text-xl font-bold">৳{userData.package.price}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 border">
                        <p className="text-sm text-muted-foreground mb-1">কেনার তারিখ</p>
                        <p className="text-xl font-bold">{userData.package.purchaseDate}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 border">
                        <p className="text-sm text-muted-foreground mb-1">মেয়াদ শেষ</p>
                        <p className="text-xl font-bold">{userData.package.expiryDate}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-success/10 border">
                        <p className="text-sm text-muted-foreground mb-1">দৈনিক ভিডিও লিমিট</p>
                        <p className="text-xl font-bold text-success">{userData.package.videosPerDay} টি</p>
                      </div>
                      <div className="p-4 rounded-lg bg-success/10 border">
                        <p className="text-sm text-muted-foreground mb-1">প্রতি ভিডিও আয়</p>
                        <p className="text-xl font-bold text-success">৳{userData.package.perVideoRate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Deposits Tab */}
              <TabsContent value="deposits">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      ডিপোজিট ইতিহাস
                    </CardTitle>
                    <CardDescription>মোট ডিপোজিট: ৳{userData.balance.totalDeposited.toLocaleString()} ({userData.stats.totalDeposits} টি)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.deposits.map((deposit) => (
                        <div
                          key={deposit.id}
                          className="p-4 border rounded-lg bg-card"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-success/10">
                                <ArrowDownRight className="w-5 h-5 text-success" />
                              </div>
                              <div>
                                <p className="font-bold text-lg">৳{deposit.amount.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground font-mono">
                                  #{deposit.id}
                                </p>
                              </div>
                            </div>
                            <Badge className={transactionStatusConfig[deposit.status].color}>
                              {transactionStatusConfig[deposit.status].label}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-3 pt-3 border-t">
                            <div>
                              <p className="text-muted-foreground text-xs">মেথড</p>
                              <p className="font-medium">{deposit.method}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">একাউন্ট</p>
                              <p className="font-mono">{deposit.accountNumber}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">তারিখ</p>
                              <p>{deposit.date}</p>
                            </div>
                            {deposit.processedBy && (
                              <div>
                                <p className="text-muted-foreground text-xs">প্রসেস করেছে</p>
                                <p>{deposit.processedBy}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {userData.deposits.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          কোনো ডিপোজিট নেই
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Withdrawals Tab */}
              <TabsContent value="withdrawals">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-warning" />
                      উত্তোলন ইতিহাস
                    </CardTitle>
                    <CardDescription>
                      মোট উত্তোলন: ৳{userData.balance.totalWithdrawn.toLocaleString()} ({userData.stats.totalWithdrawals} টি) | 
                      পেন্ডিং: {userData.stats.pendingWithdrawals} টি | বাতিল: {userData.stats.rejectedWithdrawals} টি
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.withdrawals.map((withdrawal) => (
                        <div
                          key={withdrawal.id}
                          className="p-4 border rounded-lg bg-card"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-warning/10">
                                <ArrowUpRight className="w-5 h-5 text-warning" />
                              </div>
                              <div>
                                <p className="font-bold text-lg">৳{withdrawal.amount.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground font-mono">
                                  #{withdrawal.id}
                                </p>
                              </div>
                            </div>
                            <Badge className={transactionStatusConfig[withdrawal.status].color}>
                              {transactionStatusConfig[withdrawal.status].label}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-3 pt-3 border-t">
                            <div>
                              <p className="text-muted-foreground text-xs">মেথড</p>
                              <p className="font-medium">{withdrawal.method}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">একাউন্ট</p>
                              <p className="font-mono">{withdrawal.accountNumber}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">তারিখ</p>
                              <p>{withdrawal.date}</p>
                            </div>
                            {withdrawal.processedBy && (
                              <div>
                                <p className="text-muted-foreground text-xs">প্রসেস করেছে</p>
                                <p>{withdrawal.processedBy}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {userData.withdrawals.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          কোনো উত্তোলন নেই
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Referrals Tab */}
              <TabsContent value="referrals">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-primary" />
                      রেফারেল তথ্য
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="p-4 border rounded-lg bg-primary/5">
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Copy className="w-3 h-3" /> রেফারেল কোড
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-primary font-mono">{userData.referral.code}</p>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => {
                              navigator.clipboard.writeText(userData.referral.code);
                              toast({ title: "কপি হয়েছে" });
                            }}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">মোট রেফার</p>
                        <p className="text-xl font-bold">{userData.referral.totalReferred} জন</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-success/10">
                        <p className="text-sm text-muted-foreground mb-1">রেফারেল আয়</p>
                        <p className="text-xl font-bold text-success">৳{userData.referral.totalEarnings.toLocaleString()}</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">লেভেল ১</p>
                        <p className="text-xl font-bold">{userData.referral.level1Count} জন</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">লেভেল ২</p>
                        <p className="text-xl font-bold">{userData.referral.level2Count} জন</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">লেভেল ৩</p>
                        <p className="text-xl font-bold">{userData.referral.level3Count} জন</p>
                      </div>
                      {userData.referral.referredBy && (
                        <div className="p-4 border rounded-lg bg-muted/30 md:col-span-2 lg:col-span-3">
                          <p className="text-sm text-muted-foreground mb-1">রেফার করেছে</p>
                          <p className="text-lg font-bold">
                            {userData.referral.referredBy} 
                            {userData.referral.referredById && (
                              <span className="text-muted-foreground font-normal text-sm ml-2">
                                ({userData.referral.referredById})
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-primary" />
                      পেমেন্ট মেথড
                    </CardTitle>
                    <CardDescription>ইউজারের সংরক্ষিত পেমেন্ট মেথডসমূহ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary/10">
                              <Banknote className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold">{method.type}</p>
                                {method.isDefault && (
                                  <Badge variant="secondary" className="text-xs">ডিফল্ট</Badge>
                                )}
                              </div>
                              <p className="font-mono text-muted-foreground">{method.accountNumber}</p>
                              <p className="text-sm text-muted-foreground">{method.accountName}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {userData.paymentMethods.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          কোনো পেমেন্ট মেথড নেই
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Log Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      এক্টিভিটি লগ
                    </CardTitle>
                    <CardDescription>ইউজারের সাম্প্রতিক কার্যকলাপ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.activityLog.map((activity, index) => (
                        <div
                          key={activity.id}
                          className="flex gap-4 p-3 border-l-2 border-primary/30 bg-muted/30 rounded-r-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">{activity.action}</Badge>
                              <span className="text-xs text-muted-foreground">{activity.date}</span>
                            </div>
                            <p className="text-sm">{activity.details}</p>
                            {activity.ip && (
                              <p className="text-xs text-muted-foreground font-mono mt-1">
                                IP: {activity.ip}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      {userData.activityLog.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          কোনো এক্টিভিটি নেই
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Initial State */}
        {!userData && !notFound && !isSearching && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="p-4 rounded-full bg-muted mb-4">
                <Eye className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">ইউজার তথ্য দেখুন</h3>
              <p className="text-muted-foreground text-center max-w-md">
                উপরের সার্চ বক্সে ইউজার আইডি লিখে সার্চ করুন।
                <br />
                ইউজারের প্রোফাইল, ব্যালেন্স, ডিপোজিট, উত্তোলন সহ সকল তথ্য দেখতে পারবেন।
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
