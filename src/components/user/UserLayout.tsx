 import { ReactNode } from "react";
 import BottomNavigation from "./BottomNavigation";
 
 interface UserLayoutProps {
   children: ReactNode;
   showNav?: boolean;
 }
 
 export default function UserLayout({ children, showNav = true }: UserLayoutProps) {
   return (
     <div className="min-h-screen bg-background">
       <div className={showNav ? "pb-20" : ""}>
         {children}
       </div>
       {showNav && <BottomNavigation />}
     </div>
   );
 }