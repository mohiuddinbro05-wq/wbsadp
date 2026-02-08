import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Wallet, 
  TrendingUp, 
  Video, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Gift, 
  History, 
  Smartphone,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import UserLayout from "@/components/user/UserLayout";
import DepositDialog from "@/components/user/DepositDialog";
import WithdrawDialog from "@/components/user/WithdrawDialog";
import PaymentAccountsDialog from "@/components/user/PaymentAccountsDialog";
import TransactionHistoryDialog from "@/components/user/TransactionHistoryDialog";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";

export default function WalletPage() {
  const [searchParams] = useSearchParams();
  const { profile, loading } = useProfile();
  
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [stats, setStats] = useState({ totalVideos: 0, totalEarnings: 0 });

  const balance = profile?.balance || 0;

  // Open deposit dialog if tab=deposit in URL
  useEffect(() => {
    if (searchParams.get('tab') === 'deposit') {
      setDepositOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('video_watch_history')
        .select('reward_amount')
        .eq('user_id', user.id);

      if (data) {
        setStats({
          totalVideos: data.length,
          totalEarnings: data.reduce((sum, w) => sum + Number(w.reward_amount), 0)
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const quickActions = [
    { 
      icon: ArrowDownToLine, 
      label: "ডিপোজিট", 
      subtitle: "টাকা জমা",
      gradient: "from-green-500 to-emerald-600",
      onClick: () => setDepositOpen(true) 
    },
    { 
      icon: ArrowUpFromLine, 
      label: "উইথড্র", 
      subtitle: "টাকা তুলুন",
      gradient: "from-blue-500 to-cyan-600",
      onClick: () => setWithdrawOpen(true) 
    },
    { 
      icon: Gift, 
      label: "রেফার", 
      subtitle: "বোনাস পান",
      gradient: "from-amber-500 to-orange-600",
      path: "/refer" 
    },
    { 
      icon: History, 
      label: "হিস্টোরি", 
      subtitle: "লেনদেন দেখুন",
      gradient: "from-purple-500 to-pink-600",
      onClick: () => setHistoryOpen(true) 
    },
    { 
      icon: Smartphone, 
      label: "একাউন্ট", 
      subtitle: "নম্বর যোগ করুন",
      gradient: "from-indigo-500 to-violet-600",
      onClick: () => setAccountsOpen(true) 
    },
  ];

  return (
    <UserLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <span className="text-lg font-bold">My Wallet</span>
        </div>
      </header>

      <main className="px-4 py-4 space-y-5">
        {/* Balance Card - Premium Design */}
        <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 opacity-80" />
                  <p className="text-sm opacity-90">মোট ব্যালেন্স</p>
                </div>
                <p className="text-5xl font-bold tracking-tight">
                  ৳{loading ? "..." : balance.toLocaleString()}
                </p>
                <p className="text-sm opacity-75 mt-2">
                  উইথড্র যোগ্য ব্যালেন্স
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Wallet className="w-8 h-8" />
              </div>
            </div>

            {/* Quick Stats in Balance Card */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs opacity-80">মোট আয়</span>
                </div>
                <p className="text-xl font-bold">৳{stats.totalEarnings}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Video className="w-4 h-4" />
                  <span className="text-xs opacity-80">দেখা ভিডিও</span>
                </div>
                <p className="text-xl font-bold">{stats.totalVideos}টি</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Modern Grid */}
        <div>
          <h3 className="text-base font-semibold mb-3">দ্রুত অ্যাকশন</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {quickActions.map((action) => (
              action.path ? (
                <Link key={action.label} to={action.path} className="block">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-card/50 backdrop-blur">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                      <span className="text-xs text-muted-foreground hidden sm:block">{action.subtitle}</span>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card 
                  key={action.label} 
                  onClick={action.onClick}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-card/50 backdrop-blur"
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                    <span className="text-xs text-muted-foreground hidden sm:block">{action.subtitle}</span>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => setDepositOpen(true)} 
            className="h-14 text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0"
            size="lg"
          >
            <ArrowDownToLine className="w-5 h-5 mr-2" />
            ডিপোজিট
          </Button>
          <Button 
            onClick={() => setWithdrawOpen(true)} 
            variant="outline" 
            className="h-14 text-base font-semibold border-2"
            size="lg"
          >
            <ArrowUpFromLine className="w-5 h-5 mr-2" />
            উইথড্র
          </Button>
        </div>

        {/* Recent Activity Shortcut */}
        <Card 
          className="cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setHistoryOpen(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">লেনদেনের ইতিহাস</p>
                  <p className="text-sm text-muted-foreground">সব আয় ও ব্যয় দেখুন</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <DepositDialog open={depositOpen} onOpenChange={setDepositOpen} />
      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} balance={balance} />
      <PaymentAccountsDialog open={accountsOpen} onOpenChange={setAccountsOpen} />
      <TransactionHistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} />
    </UserLayout>
  );
}