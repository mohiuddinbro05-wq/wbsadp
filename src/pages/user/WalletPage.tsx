 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { ArrowLeft, Wallet, TrendingUp, Video, ArrowDownToLine, ArrowUpFromLine, Gift, History, User } from "lucide-react";
 import { Link } from "react-router-dom";
 import UserLayout from "@/components/user/UserLayout";
 
 const quickActions = [
   { icon: ArrowDownToLine, label: "Deposit", color: "bg-primary/10 text-primary" },
   { icon: ArrowUpFromLine, label: "Withdraw", color: "bg-blue-100 text-blue-600" },
   { icon: Gift, label: "Refer", color: "bg-amber-100 text-amber-600" },
   { icon: History, label: "History", color: "bg-primary/10 text-primary" },
   { icon: User, label: "Account", color: "bg-purple-100 text-purple-600" },
 ];
 
 export default function WalletPage() {
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
                 <p className="text-sm opacity-90 mb-1">Available Balance</p>
                 <p className="text-4xl font-bold">৳50,000</p>
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
               <p className="text-2xl font-bold">৳0</p>
               <p className="text-sm text-muted-foreground">Total Earned</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4 text-center">
               <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-2">
                 <Video className="w-5 h-5 text-blue-600" />
               </div>
               <p className="text-2xl font-bold">0</p>
               <p className="text-sm text-muted-foreground">Videos Watched</p>
             </CardContent>
           </Card>
         </div>
 
         {/* Quick Actions */}
         <Card>
           <CardContent className="p-4">
             <h3 className="font-semibold mb-4">Quick Actions</h3>
             <div className="grid grid-cols-3 gap-4">
               {quickActions.slice(0, 3).map((action) => (
                 <div key={action.label} className="flex flex-col items-center gap-2 cursor-pointer">
                   <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                     <action.icon className="w-6 h-6" />
                   </div>
                   <span className="text-sm font-medium">{action.label}</span>
                 </div>
               ))}
             </div>
             <div className="grid grid-cols-2 gap-4 mt-4">
               {quickActions.slice(3).map((action) => (
                 <div key={action.label} className="flex flex-col items-center gap-2 cursor-pointer">
                   <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                     <action.icon className="w-6 h-6" />
                   </div>
                   <span className="text-sm font-medium">{action.label}</span>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>
       </main>
     </UserLayout>
   );
 }