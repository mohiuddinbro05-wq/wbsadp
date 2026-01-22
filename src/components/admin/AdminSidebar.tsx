import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  Users,
  Gift,
  CreditCard,
  FileText,
  Bell,
  Settings,
  LogOut,
  Shield,
  X,
  ChevronDown,
  Video,
  Crown,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

interface MenuSection {
  label: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    label: "MAIN MENU",
    items: [
      { title: "Overview", icon: LayoutDashboard, path: "/" },
      { title: "Withdrawals", icon: TrendingDown, path: "/withdrawals", badge: 23 },
      { title: "Deposits", icon: TrendingUp, path: "/deposits", badge: 8 },
      { title: "Users", icon: Users, path: "/users" },
    ],
  },
  {
    label: "CONTENT",
    items: [
      { title: "Videos", icon: Video, path: "/videos" },
      { title: "Subscription", icon: Crown, path: "/subscription" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { title: "Payment Methods", icon: Wallet, path: "/payment-methods" },
      { title: "Referrals", icon: Gift, path: "/referrals" },
      { title: "Transactions", icon: CreditCard, path: "/transactions" },
      { title: "Reports", icon: FileText, path: "/reports" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { title: "Notifications", icon: Bell, path: "/notifications", badge: 5 },
      { title: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border transition-all duration-300 lg:translate-x-0 lg:static shadow-soft",
          isOpen ? "translate-x-0 animate-slide-in-left" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-5 border-b border-sidebar-border">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-primary shadow-glow">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-lg text-foreground truncate">Control Panel</h1>
              <p className="text-sm text-muted-foreground truncate">Admin Dashboard</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0"
              onClick={onToggle}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Menu */}
          <ScrollArea className="flex-1 px-3 py-4">
            {menuSections.map((section, sectionIndex) => (
              <div key={section.label} className="mb-6">
                <p className="text-xs font-semibold text-muted-foreground mb-3 px-3 tracking-wider">
                  {section.label}
                </p>
                <nav className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => window.innerWidth < 1024 && onToggle()}
                        className={cn(
                          "sidebar-link group animate-fade-in",
                          isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                        )}
                        style={{ animationDelay: `${(sectionIndex * 4 + itemIndex) * 50}ms` }}
                      >
                        <item.icon
                          className={cn(
                            "w-5 h-5 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <span className={cn(
                            "px-2 py-0.5 text-xs font-semibold rounded-full",
                            isActive 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-destructive/10 text-destructive"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </ScrollArea>

          {/* User Profile & Logout */}
          <div className="p-3 border-t border-sidebar-border space-y-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
