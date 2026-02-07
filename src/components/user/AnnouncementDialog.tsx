import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bell, Gift, Video, Megaphone, Info } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  icon: string;
  icon_color: string;
  created_at: string;
}

interface AnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement: Announcement | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bell: Bell,
  gift: Gift,
  video: Video,
  megaphone: Megaphone,
  info: Info,
};

const colorMap: Record<string, string> = {
  primary: "text-primary",
  blue: "text-blue-500",
  green: "text-green-500",
  red: "text-red-500",
  orange: "text-orange-500",
  purple: "text-purple-500",
};

export default function AnnouncementDialog({ open, onOpenChange, announcement }: AnnouncementDialogProps) {
  if (!announcement) return null;

  const IconComponent = iconMap[announcement.icon] || Bell;
  const iconColor = colorMap[announcement.icon_color] || "text-primary";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className={`w-5 h-5 ${iconColor}`} />
            {announcement.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {announcement.content}
          </p>
          <p className="text-xs text-muted-foreground">
            প্রকাশিত: {formatDate(announcement.created_at)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
