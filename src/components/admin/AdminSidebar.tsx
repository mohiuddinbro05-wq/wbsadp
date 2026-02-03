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
  ChevronRight,
  Video,
  Crown,
  Wallet,
  Home,
  Image,
  Type,
  Layers,
  Star,
  HelpCircle,
  Phone,
  UserCog,
  UserPlus,
  Headphones,
  UserCheck,
  History,
  ClipboardList,
  Key,
  FileQuestion,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SubMenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  badge?: number;
  subItems?: SubMenuItem[];
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
      { title: "User Credentials", icon: Key, path: "/user-credentials" },
      { title: "History", icon: History, path: "/history" },
      { title: "Requests", icon: ClipboardList, path: "/requests", badge: 4 },
    ],
  },
  {
    label: "CONTENT",
    items: [
      { title: "Videos", icon: Video, path: "/videos" },
      { title: "Subscription", icon: Crown, path: "/subscription" },
      {
        title: "Home Page Editor",
        icon: Home,
        subItems: [
          { title: "Hero Section", icon: Image, path: "/editor/hero" },
          { title: "About Section", icon: Type, path: "/editor/about" },
          { title: "Features", icon: Layers, path: "/editor/features" },
          { title: "Testimonials", icon: Star, path: "/editor/testimonials" },
          { title: "FAQ", icon: HelpCircle, path: "/editor/faq" },
          { title: "Contact Info", icon: Phone, path: "/editor/contact" },
        ],
      },
    ],
  },
  {
    label: "TEAM MANAGEMENT",
    items: [
      { title: "Admin Users", icon: UserCog, path: "/team/admins" },
      { title: "Agents", icon: UserPlus, path: "/team/agents" },
      { title: "Support Team", icon: Headphones, path: "/team/support" },
      { title: "Moderators", icon: UserCheck, path: "/team/moderators" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { title: "Payment Methods", icon: Wallet, path: "/payment-methods" },
      { title: "Referrals", icon: Gift, path: "/referrals" },
      { title: "Salary", icon: DollarSign, path: "/salary" },
      { title: "Transactions", icon: CreditCard, path: "/transactions" },
      { title: "Reports", icon: FileText, path: "/reports" },
      { title: "Terms", icon: FileQuestion, path: "/terms" },
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
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isSubMenuOpen = (title: string) => openSubMenus.includes(title);

  const isSubItemActive = (subItems?: SubMenuItem[]) => {
    if (!subItems) return false;
    return subItems.some((sub) => location.pathname === sub.path);
  };

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
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isActive = item.path ? location.pathname === item.path : false;
                    const isSubActive = isSubItemActive(item.subItems);
                    const isExpanded = isSubMenuOpen(item.title) || isSubActive;

                    if (hasSubItems) {
                      return (
                        <Collapsible
                          key={item.title}
                          open={isExpanded}
                          onOpenChange={() => toggleSubMenu(item.title)}
                        >
                          <CollapsibleTrigger asChild>
                            <button
                              className={cn(
                                "sidebar-link group w-full animate-fade-in",
                                isSubActive ? "sidebar-link-active" : "sidebar-link-inactive"
                              )}
                              style={{ animationDelay: `${(sectionIndex * 4 + itemIndex) * 50}ms` }}
                            >
                              <item.icon
                                className={cn(
                                  "w-5 h-5 transition-colors",
                                  isSubActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}
                              />
                              <span className="flex-1 text-left">{item.title}</span>
                              <ChevronRight
                                className={cn(
                                  "w-4 h-4 transition-transform duration-200",
                                  isExpanded && "rotate-90"
                                )}
                              />
                            </button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 mt-1 space-y-1">
                            {item.subItems?.map((subItem) => {
                              const isSubItemActive = location.pathname === subItem.path;
                              return (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  onClick={() => window.innerWidth < 1024 && onToggle()}
                                  className={cn(
                                    "sidebar-link group text-sm",
                                    isSubItemActive ? "sidebar-link-active" : "sidebar-link-inactive"
                                  )}
                                >
                                  <subItem.icon
                                    className={cn(
                                      "w-4 h-4 transition-colors",
                                      isSubItemActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                  />
                                  <span className="flex-1">{subItem.title}</span>
                                </Link>
                              );
                            })}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }

                    return (
                      <Link
                        key={item.path}
                        to={item.path!}
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
