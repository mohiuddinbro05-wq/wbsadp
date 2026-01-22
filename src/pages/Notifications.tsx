import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  time: string;
}

const notifications: Notification[] = [
  { id: "1", title: "New User Registration", message: "মোহাম্মদ আলী has registered", type: "info", read: false, time: "5 minutes ago" },
  { id: "2", title: "Withdrawal Request", message: "৳5,000 withdrawal request from আহমেদ হোসেন", type: "warning", read: false, time: "15 minutes ago" },
  { id: "3", title: "Deposit Completed", message: "৳10,000 deposit completed by রাহেলা খাতুন", type: "success", read: true, time: "1 hour ago" },
  { id: "4", title: "System Alert", message: "High traffic detected on the platform", type: "error", read: true, time: "2 hours ago" },
  { id: "5", title: "New Referral", message: "করিম উদ্দিন referred a new user", type: "info", read: true, time: "3 hours ago" },
];

const typeColors = {
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-destructive/10 text-destructive",
};

const Notifications = () => {
  return (
    <AdminLayout title="Notifications">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {notifications.filter((n) => !n.read).length} unread
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Check className="w-4 h-4" />
              Mark all as read
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
              Clear all
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "bg-card rounded-xl border border-border p-4 transition-colors",
                !notification.read && "border-l-4 border-l-primary"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-lg", typeColors[notification.type])}>
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{notification.title}</h4>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Notifications;
