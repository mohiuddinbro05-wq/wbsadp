 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Link } from "react-router-dom";
 import { 
   Play, 
   Wallet, 
   Gift,
   ArrowUpRight,
   LogOut,
   Bell,
   Video,
   Sparkles,
   Clock,
   Users
 } from "lucide-react";
 import UserLayout from "@/components/user/UserLayout";
 import { useAuth } from "@/hooks/useAuth";
 
 export default function UserDashboard() {
   const { user, signOut } = useAuth();
   const userName = user?.user_metadata?.full_name || "User";
 
   return (
     <UserLayout>
       {/* Header */}
       <header className="sticky top-0 z-40 bg-background border-b border-border">
         <div className="flex items-center justify-between px-4 h-14">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
               <Play className="w-4 h-4 text-primary-foreground fill-current" />
             </div>
             <span className="text-lg font-bold">EarnTube</span>
           </div>
           <Button variant="ghost" size="icon" onClick={signOut}>
             <LogOut className="w-5 h-5" />
           </Button>
         </div>
       </header>
 
       <main className="px-4 py-4 space-y-4">
         {/* Welcome Section */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-xl font-bold">স্বাগতম, {userName}!</h1>
             <p className="text-sm text-muted-foreground">আজকে ভিডিও দেখে আয় করুন</p>
           </div>
           <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
             ⭐ Standard
           </span>
         </div>
 
         {/* Balance Card */}
         <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 overflow-hidden relative">
           <CardContent className="p-5">
             <div className="flex items-center justify-between mb-4">
               <div>
                 <p className="text-sm opacity-90">মোট ব্যালেন্স</p>
                 <p className="text-4xl font-bold">৳৮০</p>
               </div>
               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                 <Wallet className="w-6 h-6" />
               </div>
             </div>
             <div className="flex gap-3">
               <div className="flex-1 bg-white/10 rounded-lg p-3">
                 <div className="flex items-center gap-2 mb-1">
                   <ArrowUpRight className="w-4 h-4" />
                   <span className="text-xs opacity-80">আজকের আয়</span>
                 </div>
                 <p className="text-lg font-bold">৳০</p>
               </div>
               <div className="flex-1 bg-white/10 rounded-lg p-3">
                 <div className="flex items-center gap-2 mb-1">
                   <Video className="w-4 h-4" />
                   <span className="text-xs opacity-80">মোট ভিডিও</span>
                 </div>
                 <p className="text-lg font-bold">৪টি</p>
               </div>
             </div>
           </CardContent>
         </Card>
 
          {/* Quick Actions */}
          <div>
            <h3 className="text-base font-semibold mb-3">দ্রুত অ্যাকশন</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link to="/videos">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">ভিডিও দেখুন</p>
                      <p className="text-xs text-muted-foreground truncate">আয় করুন</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/wallet">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Wallet className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">উইথড্র</p>
                      <p className="text-xs text-muted-foreground truncate">টাকা তুলুন</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/refer">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">রেফার করুন</p>
                      <p className="text-xs text-muted-foreground truncate">বোনাস পান</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/wallet?tab=deposit">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">ডিপোজিট</p>
                      <p className="text-xs text-muted-foreground truncate">টাকা যোগ করুন</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
 
         {/* Current Plan */}
         <Card>
           <CardContent className="p-4">
             <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-primary" />
                 <span className="font-semibold">Standard প্ল্যান</span>
               </div>
               <Button variant="outline" size="sm" className="text-xs">
                 আপগ্রেড
               </Button>
             </div>
             <div className="grid grid-cols-3 gap-4 text-center">
               <div>
                 <p className="text-xl font-bold text-primary">20</p>
                 <p className="text-xs text-muted-foreground">ভিডিও/দিন</p>
               </div>
               <div>
                 <p className="text-xl font-bold text-primary">৳20</p>
                 <p className="text-xs text-muted-foreground">প্রতি ভিডিও</p>
               </div>
               <div>
                 <p className="text-xl font-bold text-primary">৳12,000</p>
                 <p className="text-xs text-muted-foreground">মাসিক</p>
               </div>
             </div>
           </CardContent>
         </Card>
 
         {/* Tips */}
         <Card className="bg-primary/5 border-primary/20">
           <CardContent className="p-4">
             <div className="flex items-center gap-2 mb-3">
               <Sparkles className="w-5 h-5 text-primary" />
               <span className="font-semibold">টিপস</span>
             </div>
             <div className="space-y-2 text-sm">
               <div className="flex items-center gap-2 text-muted-foreground">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                 প্রতিদিন সব ভিডিও দেখলে বেশি আয় হবে
               </div>
               <div className="flex items-center gap-2 text-muted-foreground">
                 <Users className="w-4 h-4 text-primary" />
                 বন্ধুদের রেফার করে বোনাস পান
               </div>
               <div className="flex items-center gap-2 text-muted-foreground">
                 <Clock className="w-4 h-4 text-primary" />
                 ভিডিও দেখার সময় পজ করবেন না
               </div>
             </div>
           </CardContent>
         </Card>
 
         {/* Announcements */}
         <Card>
           <CardContent className="p-4">
             <div className="flex items-center gap-2 mb-3">
               <Bell className="w-5 h-5 text-muted-foreground" />
               <span className="font-semibold">ঘোষণা</span>
             </div>
             <div className="space-y-3">
               <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                 <Gift className="w-5 h-5 text-primary mt-0.5" />
                 <div>
                   <p className="font-medium text-sm">রেফারাল বোনাস বাড়ানো হয়েছে!</p>
                   <p className="text-xs text-muted-foreground">এখন প্রতি রেফারালে আরো বেশি বোনাস পাবেন।</p>
                 </div>
               </div>
               <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                 <Video className="w-5 h-5 text-blue-500 mt-0.5" />
                 <div>
                   <p className="font-medium text-sm">নতুন ভিডিও যোগ করা হয়েছে</p>
                   <p className="text-xs text-muted-foreground">আরো বেশি ভিডিও দেখে আয় করুন।</p>
                 </div>
               </div>
             </div>
           </CardContent>
         </Card>
       </main>
     </UserLayout>
   );
 }
