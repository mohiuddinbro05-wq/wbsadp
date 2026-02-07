import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, TrendingUp, Video, ArrowDownToLine, ArrowUpFromLine, Gift, History, User } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import UserLayout from "@/components/user/UserLayout";
import DepositDialog from "@/components/user/DepositDialog";
import WithdrawDialog from "@/components/user/WithdrawDialog";
import { useProfile } from "@/hooks/useProfile";

export default function WalletPage() {
  const [searchParams] = useSearchParams();
  const { profile, loading } = useProfile();
  
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const balance = profile?.balance || 0;

  // Open deposit dialog if tab=deposit in URL
  useEffect(() => {
    if (searchParams.get('tab') === 'deposit') {
      setDepositOpen(true);
    }
  }, [searchParams]);

  const quickActions = [
    { icon: ArrowDownToLine, label: "Deposit", color: "bg-primary/10 text-primary", onClick: () => setDepositOpen(true) },
    { icon: ArrowUpFromLine, label: "Withdraw", color: "bg-blue-500/10 text-blue-500", onClick: () => setWithdrawOpen(true) },
    { icon: Gift, label: "Refer", color: "bg-amber-500/10 text-amber-500", path: "/refer" },
    { icon: History, label: "History", color: "bg-primary/10 text-primary", path: "/profile" },
    { icon: User, label: "Account", color: "bg-purple-500/10 text-purple-500", path: "/profile" },
  ];

  return (
    <UserLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <span className="text-lg font-bold">My Wallet</span>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">মোট ব্যালেন্স</p>
                <p className="text-4xl font-bold">৳{loading ? "..." : balance}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Wallet className="w-7 h-7" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">৳{balance}</p>
              <p className="text-sm text-muted-foreground">মোট আয়</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                <Video className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">দেখা ভিডিও</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">দ্রুত অ্যাকশন</h3>
            <div className="grid grid-cols-3 gap-4">
              {quickActions.slice(0, 3).map((action) => (
                action.path ? (
                  <Link key={action.label} to={action.path}>
                    <div className="flex flex-col items-center gap-2 cursor-pointer">
                      <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                    </div>
                  </Link>
                ) : (
                  <div key={action.label} onClick={action.onClick} className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                )
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {quickActions.slice(3).map((action) => (
                action.path ? (
                  <Link key={action.label} to={action.path}>
                    <div className="flex flex-col items-center gap-2 cursor-pointer">
                      <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                    </div>
                  </Link>
                ) : (
                  <div key={action.label} onClick={action.onClick} className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => setDepositOpen(true)} className="h-12" size="lg">
            <ArrowDownToLine className="w-5 h-5 mr-2" />
            ডিপোজিট
          </Button>
          <Button onClick={() => setWithdrawOpen(true)} variant="outline" className="h-12" size="lg">
            <ArrowUpFromLine className="w-5 h-5 mr-2" />
            উইথড্র
          </Button>
        </div>
      </main>

      {/* Dialogs */}
      <DepositDialog open={depositOpen} onOpenChange={setDepositOpen} />
      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} balance={balance} />
    </UserLayout>
  );
}
