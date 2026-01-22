import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning" | "info" | "destructive";
  index?: number;
}

const gradientVariants = {
  default: "bg-card",
  primary: "gradient-primary",
  success: "gradient-success",
  warning: "gradient-warning",
  info: "gradient-info",
  destructive: "gradient-destructive",
};

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
  index = 0,
}: StatCardProps) {
  const isGradient = variant !== "default";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5 card-hover animate-fade-in-up animation-fill-forwards opacity-0",
        isGradient
          ? `${gradientVariants[variant]} border-transparent text-primary-foreground shadow-glow`
          : "bg-card border-border shadow-card hover:shadow-card-hover"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Decorative circles for gradient cards */}
      {isGradient && (
        <>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
        </>
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            isGradient ? "text-white/80" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-2xl md:text-3xl font-bold tracking-tight",
            isGradient ? "text-white" : "text-foreground"
          )}>
            {value}
          </p>
          {change && (
            <div className={cn(
              "inline-flex items-center gap-1 text-sm font-medium rounded-full px-2 py-0.5",
              isGradient
                ? "bg-white/20 text-white"
                : {
                    "bg-success/10 text-success": changeType === "positive",
                    "bg-destructive/10 text-destructive": changeType === "negative",
                    "bg-muted text-muted-foreground": changeType === "neutral",
                  }
            )}>
              {changeType === "positive" && "↑"}
              {changeType === "negative" && "↓"}
              {change}
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl shrink-0",
          isGradient
            ? "bg-white/20"
            : "bg-primary/10"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            isGradient ? "text-white" : "text-primary"
          )} />
        </div>
      </div>
    </div>
  );
}

interface MiniStatProps {
  title: string;
  value: string;
  icon: LucideIcon;
  variant?: "success" | "warning" | "info" | "destructive";
  index?: number;
}

export function MiniStat({ title, value, icon: Icon, variant = "success", index = 0 }: MiniStatProps) {
  const variants = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <div 
      className="bg-card rounded-xl border border-border p-4 md:p-5 shadow-card card-hover animate-fade-in-up animation-fill-forwards opacity-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <div className={cn("p-2.5 md:p-3 rounded-xl", variants[variant])}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground truncate">{title}</p>
          <p className="text-lg md:text-xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}
