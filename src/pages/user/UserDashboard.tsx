import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  Play, 
  Wallet, 
  Users, 
  TrendingUp, 
  PlayCircle, 
  ArrowUpRight,
  Bell,
  Settings,
  LogOut,
  Gift,
  Clock,
  CheckCircle2
} from "lucide-react";

const userStats = {
  balance: "৳12,450",
  todayEarnings: "৳450",
  totalEarnings: "৳45,680",
  referrals: 12,
  videosToday: 15,
  videosCompleted: 8,
  plan: "Premium"
};

const recentTransactions = [
  { id: 1, type: "earning", description: "Video watched - Tech Review", amount: "+৳25", time: "2 min ago" },
  { id: 2, type: "earning", description: "Video watched - Gaming", amount: "+৳25", time: "15 min ago" },
  { id: 3, type: "referral", description: "Referral bonus - Karim", amount: "+৳150", time: "1 hour ago" },
  { id: 4, type: "withdrawal", description: "Withdrawal to bKash", amount: "-৳5,000", time: "Yesterday" },
];

const availableVideos = [
  { id: 1, title: "Tech Product Review", duration: "3:45", reward: "৳25", thumbnail: "🎬" },
  { id: 2, title: "Mobile Gaming Highlights", duration: "2:30", reward: "৳25", thumbnail: "🎮" },
  { id: 3, title: "Cooking Tutorial", duration: "4:15", reward: "৳25", thumbnail: "🍳" },
  { id: 4, title: "Travel Vlog Bangladesh", duration: "5:00", reward: "৳25", thumbnail: "✈️" },
];

export default function UserDashboard() {
  const progressPercent = (userStats.videosCompleted / userStats.videosToday) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold text-foreground">EarnTube</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <LogOut className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back, Rahim! 👋</h1>
          <p className="text-muted-foreground">Here's your earning overview for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{userStats.plan}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.balance}</p>
              <p className="text-sm text-muted-foreground">Current Balance</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-accent/20">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs text-success flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 12%
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.todayEarnings}</p>
              <p className="text-sm text-muted-foreground">Today's Earnings</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <Gift className="w-5 h-5 text-success" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.totalEarnings}</p>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-info/10">
                  <Users className="w-5 h-5 text-info" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.referrals}</p>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                Daily Video Progress
              </CardTitle>
              <CardDescription>
                Complete all videos to maximize your earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{userStats.videosCompleted} of {userStats.videosToday} videos completed</span>
                  <span className="text-sm text-primary font-medium">{Math.round(progressPercent)}%</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {availableVideos.map((video) => (
                  <div key={video.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{video.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </span>
                        <span className="text-primary font-medium">{video.reward}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      tx.type === 'earning' ? 'bg-success/10 text-success' :
                      tx.type === 'referral' ? 'bg-info/10 text-info' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {tx.type === 'earning' ? <PlayCircle className="w-4 h-4" /> :
                       tx.type === 'referral' ? <Users className="w-4 h-4" /> :
                       <Wallet className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      tx.amount.startsWith('+') ? 'text-success' : 'text-destructive'
                    }`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <Button className="h-auto py-4 flex-col gap-2" variant="outline">
            <Wallet className="w-6 h-6" />
            <span>Withdraw Funds</span>
          </Button>
          <Button className="h-auto py-4 flex-col gap-2" variant="outline">
            <Users className="w-6 h-6" />
            <span>Invite Friends</span>
          </Button>
          <Button className="h-auto py-4 flex-col gap-2" variant="outline">
            <TrendingUp className="w-6 h-6" />
            <span>Upgrade Plan</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
