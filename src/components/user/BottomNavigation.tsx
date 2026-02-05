 import { Home, Play, Wallet, Gift, User } from "lucide-react";
 import { Link, useLocation } from "react-router-dom";
 import { cn } from "@/lib/utils";
 
 const navItems = [
   { icon: Home, label: "Home", path: "/dashboard" },
   { icon: Play, label: "Videos", path: "/videos" },
   { icon: Wallet, label: "Wallet", path: "/wallet" },
   { icon: Gift, label: "Refer", path: "/refer" },
   { icon: User, label: "Profile", path: "/profile" },
 ];
 
 export default function BottomNavigation() {
   const location = useLocation();
 
   return (
     <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
       <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
         {navItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
             <Link
               key={item.path}
               to={item.path}
               className={cn(
                 "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                 isActive ? "text-primary" : "text-muted-foreground"
               )}
             >
               <div
                 className={cn(
                   "p-2 rounded-xl transition-all",
                   isActive && "bg-primary/10"
                 )}
               >
                 <item.icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
               </div>
               <span className="text-xs font-medium">{item.label}</span>
               {isActive && (
                 <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
               )}
             </Link>
           );
         })}
       </div>
     </nav>
   );
 }