import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Video
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  status: "active" | "inactive" | "banned";
  joinDate: string;
  lastActive: string;
  package: {
    name: string;
    price: number;
    expiryDate: string;
  };
  balance: {
    current: number;
    totalEarned: number;
    totalWithdrawn: number;
    pending: number;
  };
  referral: {
    code: string;
    totalReferred: number;
    totalEarnings: number;
    referredBy?: string;
  };
  stats: {
    totalVideosWatched: number;
    todayVideosWatched: number;
    totalDeposits: number;
    totalWithdrawals: number;
  };
  deposits: Transaction[];
  withdrawals: Transaction[];
}

interface Transaction {
  id: string;
  amount: number;
  method: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  accountNumber?: string;
}

// Mock user database
const mockUsers: Record<string, UserData> = {
  "USR001": {
    id: "USR001",
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    phone: "+880 1712-345678",
    address: "Dhaka, Bangladesh",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-03-20 14:30",
    package: {
      name: "Premium",
      price: 999,
      expiryDate: "2024-04-15",
    },
    balance: {
      current: 2500,
      totalEarned: 15000,
      totalWithdrawn: 12500,
      pending: 500,
    },
    referral: {
      code: "RAHIM2024",
      totalReferred: 25,
      totalEarnings: 5000,
      referredBy: "USR005",
    },
    stats: {
      totalVideosWatched: 450,
      todayVideosWatched: 8,
      totalDeposits: 5,
      totalWithdrawals: 12,
    },
    deposits: [
      { id: "DEP001", amount: 999, method: "bKash", status: "approved", date: "2024-03-15", accountNumber: "01712345678" },
      { id: "DEP002", amount: 500, method: "Nagad", status: "approved", date: "2024-02-20", accountNumber: "01812345678" },
      { id: "DEP003", amount: 1000, method: "bKash", status: "pending", date: "2024-03-20", accountNumber: "01712345678" },
    ],
    withdrawals: [
      { id: "WTH001", amount: 2000, method: "bKash", status: "approved", date: "2024-03-18", accountNumber: "01712345678" },
      { id: "WTH002", amount: 1500, method: "Nagad", status: "approved", date: "2024-03-10", accountNumber: "01812345678" },
      { id: "WTH003", amount: 500, method: "bKash", status: "pending", date: "2024-03-20", accountNumber: "01712345678" },
    ],
  },
  "USR002": {
    id: "USR002",
    name: "Fatima Begum",
    email: "fatima@example.com",
    phone: "+880 1812-987654",
    address: "Chittagong, Bangladesh",
    status: "active",
    joinDate: "2024-02-10",
    lastActive: "2024-03-19 10:15",
    package: {
      name: "Basic",
      price: 499,
      expiryDate: "2024-04-10",
    },
    balance: {
      current: 1200,
      totalEarned: 8000,
      totalWithdrawn: 6800,
      pending: 0,
    },
    referral: {
      code: "FATIMA24",
      totalReferred: 10,
      totalEarnings: 2000,
    },
    stats: {
      totalVideosWatched: 280,
      todayVideosWatched: 5,
      totalDeposits: 3,
      totalWithdrawals: 8,
    },
    deposits: [
      { id: "DEP004", amount: 499, method: "Rocket", status: "approved", date: "2024-03-10", accountNumber: "01912345678" },
    ],
    withdrawals: [
      { id: "WTH004", amount: 1000, method: "bKash", status: "approved", date: "2024-03-15", accountNumber: "01812987654" },
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
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userData.avatar} />
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {userData.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-foreground">{userData.name}</h2>
                        <Badge className={statusConfig[userData.status].color}>
                          {statusConfig[userData.status].label}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">ID: {userData.id}</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">সর্বশেষ: {userData.lastActive}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-green-500/10">
                      <Wallet className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">বর্তমান ব্যালেন্স</p>
                      <p className="text-2xl font-bold text-foreground">৳{userData.balance.current}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <TrendingUp className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">মোট আয়</p>
                      <p className="text-2xl font-bold text-foreground">৳{userData.balance.totalEarned}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-orange-500/10">
                      <TrendingDown className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">মোট উত্তোলন</p>
                      <p className="text-2xl font-bold text-foreground">৳{userData.balance.totalWithdrawn}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-yellow-500/10">
                      <AlertCircle className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">পেন্ডিং</p>
                      <p className="text-2xl font-bold text-foreground">৳{userData.balance.pending}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid grid-cols-4 w-full max-w-lg">
                <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
                <TabsTrigger value="deposits">ডিপোজিট</TabsTrigger>
                <TabsTrigger value="withdrawals">উত্তোলন</TabsTrigger>
                <TabsTrigger value="referrals">রেফারেল</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Package Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Crown className="w-5 h-5 text-primary" />
                        প্যাকেজ তথ্য
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">প্যাকেজ</span>
                        <Badge>{userData.package.name}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">মূল্য</span>
                        <span className="font-medium">৳{userData.package.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">মেয়াদ শেষ</span>
                        <span className="font-medium">{userData.package.expiryDate}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                        অ্যাকাউন্ট তথ্য
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">যোগদান</span>
                        <span className="font-medium">{userData.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">সর্বশেষ সক্রিয়</span>
                        <span className="font-medium">{userData.lastActive}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">স্ট্যাটাস</span>
                        <Badge className={statusConfig[userData.status].color}>
                          {statusConfig[userData.status].label}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activity Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Video className="w-5 h-5 text-primary" />
                        কার্যক্রম
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">মোট ভিডিও দেখেছে</span>
                        <span className="font-medium">{userData.stats.totalVideosWatched}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">আজ দেখেছে</span>
                        <span className="font-medium">{userData.stats.todayVideosWatched}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transaction Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <CreditCard className="w-5 h-5 text-primary" />
                        লেনদেন সারসংক্ষেপ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">মোট ডিপোজিট</span>
                        <span className="font-medium">{userData.stats.totalDeposits} টি</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">মোট উত্তোলন</span>
                        <span className="font-medium">{userData.stats.totalWithdrawals} টি</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="deposits">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      ডিপোজিট ইতিহাস
                    </CardTitle>
                    <CardDescription>সকল ডিপোজিটের তালিকা</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.deposits.map((deposit) => (
                        <div
                          key={deposit.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-green-500/10">
                              <TrendingUp className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">৳{deposit.amount}</p>
                              <p className="text-sm text-muted-foreground">
                                {deposit.method} • {deposit.accountNumber}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={transactionStatusConfig[deposit.status].color}>
                              {transactionStatusConfig[deposit.status].label}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{deposit.date}</p>
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

              <TabsContent value="withdrawals">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5" />
                      উত্তোলন ইতিহাস
                    </CardTitle>
                    <CardDescription>সকল উত্তোলনের তালিকা</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.withdrawals.map((withdrawal) => (
                        <div
                          key={withdrawal.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-orange-500/10">
                              <TrendingDown className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                              <p className="font-medium">৳{withdrawal.amount}</p>
                              <p className="text-sm text-muted-foreground">
                                {withdrawal.method} • {withdrawal.accountNumber}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={transactionStatusConfig[withdrawal.status].color}>
                              {transactionStatusConfig[withdrawal.status].label}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{withdrawal.date}</p>
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

              <TabsContent value="referrals">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      রেফারেল তথ্য
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">রেফারেল কোড</p>
                        <p className="text-lg font-bold text-primary">{userData.referral.code}</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">রেফার করেছে</p>
                        <p className="text-lg font-bold">{userData.referral.totalReferred} জন</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-1">রেফারেল আয়</p>
                        <p className="text-lg font-bold text-green-500">৳{userData.referral.totalEarnings}</p>
                      </div>
                      {userData.referral.referredBy && (
                        <div className="p-4 border rounded-lg bg-muted/30">
                          <p className="text-sm text-muted-foreground mb-1">রেফার করেছে</p>
                          <p className="text-lg font-bold">{userData.referral.referredBy}</p>
                        </div>
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
