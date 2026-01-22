import { Menu, Bell, RefreshCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminHeaderProps {
  onMenuToggle: () => void;
  title: string;
}

export function AdminHeader({ onMenuToggle, title }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 h-16 px-4 bg-card border-b border-border lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuToggle}
      >
        <Menu className="w-5 h-5" />
      </Button>

      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-muted border-0"
          />
        </div>
      </div>

      <Button variant="ghost" size="icon" className="relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
      </Button>

      <Button variant="ghost" size="icon">
        <RefreshCcw className="w-5 h-5" />
      </Button>
    </header>
  );
}
