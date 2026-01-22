import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  time: string;
}

const initialNotifications: Notification[] = [
  { id: "1", title: "New User Registration", message: "মোহাম্মদ আলী has registered on the platform", type: "info", read: false, time: "5 minutes ago" },
  { id: "2", title: "Withdrawal Request", message: "৳5,000 withdrawal request from আহমেদ হোসেন requires approval", type: "warning", read: false, time: "15 minutes ago" },
  { id: "3", title: "Deposit Completed", message: "৳10,000 deposit completed by রাহেলা খাতুন", type: "success", read: false, time: "1 hour ago" },
  { id: "4", title: "System Alert", message: "High traffic detected on the platform. Consider scaling resources.", type: "error", read: false, time: "2 hours ago" },
  { id: "5", title: "New Referral", message: "করিম উদ্দিন referred a new user successfully", type: "info", read: true, time: "3 hours ago" },
  { id: "6", title: "Payment Processed", message: "Bulk payment of ৳50,000 has been processed", type: "success", read: true, time: "5 hours ago" },
];

const typeConfig = {
  info: { icon: Info, className: "bg-info/10 text-info border-info/20" },
  success: { icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
  warning: { icon: AlertTriangle, className: "bg-warning/10 text-warning border-warning/20" },
  error: { icon: AlertCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({ title: "All notifications marked as read" });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast({ title: "Notification deleted" });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({ title: "All notifications cleared" });
  };

  return (
    <AdminLayout title="Notifications">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl gradient-primary text-primary-foreground">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">All Notifications</h3>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "You're all caught up!"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 text-destructive hover:text-destructive"
              onClick={clearAll}
              disabled={notifications.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No notifications</h3>
            <p className="text-sm text-muted-foreground">You're all caught up! Check back later.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "bg-card rounded-xl border p-4 transition-all duration-200 card-hover animate-fade-in-up animation-fill-forwards opacity-0 cursor-pointer",
                    !notification.read && "border-l-4 border-l-primary bg-primary/5"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("p-2.5 rounded-xl border", config.className)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{notification.title}</h4>
                        {!notification.read && (
                          <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Notifications;
