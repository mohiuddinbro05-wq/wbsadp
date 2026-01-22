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
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
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
      { title: "Withdrawals", icon: TrendingDown, path: "/withdrawals" },
      { title: "Deposits", icon: TrendingUp, path: "/deposits" },
      { title: "Users", icon: Users, path: "/users" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { title: "Referrals", icon: Gift, path: "/referrals" },
      { title: "Transactions", icon: CreditCard, path: "/transactions" },
      { title: "Reports", icon: FileText, path: "/reports" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { title: "Notifications", icon: Bell, path: "/notifications" },
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
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-5 border-b border-sidebar-border">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground">Control Panel</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto lg:hidden"
              onClick={onToggle}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Menu */}
          <ScrollArea className="flex-1 px-3 py-4">
            {menuSections.map((section) => (
              <div key={section.label} className="mb-6">
                <p className="text-xs font-medium text-muted-foreground mb-3 px-3">
                  {section.label}
                </p>
                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-5 h-5",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </ScrollArea>

          {/* Logout */}
          <div className="p-3 border-t border-sidebar-border">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
