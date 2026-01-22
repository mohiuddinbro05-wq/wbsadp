import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, Play, Pause, Trash2, Video, Clock, TrendingUp, Users, Calendar, AlertTriangle, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  status: "published" | "draft" | "scheduled";
  uploadDate: string;
  category: string;
}

const videos: VideoItem[] = [
  { id: "VID001", title: "How to Earn Money Online", thumbnail: "🎬", duration: "12:45", views: 15420, status: "published", uploadDate: "2026-01-15", category: "Tutorial" },
  { id: "VID002", title: "Investment Tips for Beginners", thumbnail: "💰", duration: "08:30", views: 8750, status: "published", uploadDate: "2026-01-18", category: "Finance" },
  { id: "VID003", title: "Platform Guide 2026", thumbnail: "📱", duration: "15:20", views: 0, status: "draft", uploadDate: "2026-01-20", category: "Guide" },
  { id: "VID004", title: "Success Stories", thumbnail: "🏆", duration: "20:00", views: 0, status: "scheduled", uploadDate: "2026-01-25", category: "Motivation" },
  { id: "VID005", title: "Referral Program Explained", thumbnail: "🎁", duration: "06:15", views: 12300, status: "published", uploadDate: "2026-01-10", category: "Tutorial" },
];

function VideoStatusBadge({ status }: { status: VideoItem["status"] }) {
  const config = {
    published: { label: "Published", className: "badge-success" },
    draft: { label: "Draft", className: "badge-warning" },
    scheduled: { label: "Scheduled", className: "badge-info" },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={cn("font-medium border", className)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1.5",
        status === "published" && "bg-success",
        status === "draft" && "bg-warning",
        status === "scheduled" && "bg-info animate-pulse"
      )} />
      {label}
    </Badge>
  );
}

interface ActionDialogProps {
  open: boolean;
  onClose: () => void;
  video: VideoItem | null;
  action: "view" | "delete" | "publish" | "unpublish" | null;
  onConfirm: () => void;
}

function ActionDialog({ open, onClose, video, action, onConfirm }: ActionDialogProps) {
  if (!video) return null;

  const actionConfig = {
    view: { title: "Video Details", confirmText: "", confirmClass: "", icon: Eye },
    delete: { title: "Delete Video", confirmText: "Confirm Delete", confirmClass: "bg-destructive hover:bg-destructive/90", icon: Trash2 },
    publish: { title: "Publish Video", confirmText: "Confirm Publish", confirmClass: "bg-success hover:bg-success/90", icon: Play },
    unpublish: { title: "Unpublish Video", confirmText: "Confirm Unpublish", confirmClass: "bg-warning hover:bg-warning/90", icon: Pause },
  };

  const config = action ? actionConfig[action] : actionConfig.view;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <config.icon className="w-5 h-5" />
            {config.title}
          </DialogTitle>
          <DialogDescription>
            Video information and details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Preview */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border">
            <div className="flex items-center gap-4">
              <div className="w-20 h-14 rounded-lg bg-muted flex items-center justify-center text-3xl">
                {video.thumbnail}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{video.title}</h3>
                <p className="text-sm text-muted-foreground font-mono">{video.id}</p>
                <VideoStatusBadge status={video.status} />
              </div>
            </div>
          </div>

          {/* Video Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">Duration</span>
              </div>
              <p className="font-mono font-medium">{video.duration}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-xs">Views</span>
              </div>
              <p className="font-medium">{video.views.toLocaleString()}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Category</span>
                <Badge variant="secondary">{video.category}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Upload Date</span>
                <span className="text-sm font-medium">{video.uploadDate}</span>
              </div>
            </div>
          </div>

          {/* Warning for Delete */}
          {action === "delete" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive">Warning: Deleting Video</p>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone. The video will be permanently removed.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {action && action !== "view" && (
            <Button 
              onClick={onConfirm}
              className={cn("text-white", config.confirmClass)}
            >
              {config.confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const VideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [dialogAction, setDialogAction] = useState<"view" | "delete" | "publish" | "unpublish" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = (video: VideoItem, action: "view" | "delete" | "publish" | "unpublish") => {
    setSelectedVideo(video);
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedVideo || !dialogAction) return;

    const messages = {
      delete: { title: "Video Deleted", description: `${selectedVideo.title} has been deleted.`, variant: "destructive" as const },
      publish: { title: "Video Published", description: `${selectedVideo.title} is now live.` },
      unpublish: { title: "Video Unpublished", description: `${selectedVideo.title} has been unpublished.` },
    };

    if (dialogAction !== "view") {
      toast(messages[dialogAction]);
    }

    setDialogOpen(false);
  };

  const columns: Column<VideoItem>[] = [
    { key: "id", label: "ID", className: "font-mono" },
    { 
      key: "title", 
      label: "Video",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-8 rounded-lg bg-muted flex items-center justify-center text-lg">
            {row.thumbnail}
          </div>
          <div>
            <p className="font-medium">{String(value)}</p>
            <p className="text-xs text-muted-foreground">{row.category}</p>
          </div>
        </div>
      ),
    },
    { key: "duration", label: "Duration", className: "font-mono" },
    { 
      key: "views", 
      label: "Views",
      render: (value) => <span className="font-bold">{Number(value).toLocaleString()}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <VideoStatusBadge status={value as VideoItem["status"]} />,
    },
    { key: "uploadDate", label: "Uploaded" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 hover:bg-primary/10"
            onClick={() => openDialog(row, "view")}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {row.status === "published" ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-warning hover:text-warning hover:bg-warning/10"
              onClick={() => openDialog(row, "unpublish")}
            >
              <Pause className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => openDialog(row, "publish")}
            >
              <Play className="w-4 h-4" />
            </Button>
          )}
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => openDialog(row, "delete")}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const statusFilters = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "scheduled", label: "Scheduled" },
  ];

  const mobileCardRender = (video: VideoItem) => (
    <div className="p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-16 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
          {video.thumbnail}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{video.title}</h3>
            <VideoStatusBadge status={video.status} />
          </div>
          <p className="text-xs text-muted-foreground font-mono">{video.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 rounded-lg bg-primary/10">
          <p className="text-[10px] text-muted-foreground">Duration</p>
          <p className="text-sm font-bold">{video.duration}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-success/10">
          <p className="text-[10px] text-muted-foreground">Views</p>
          <p className="text-sm font-bold text-success">{video.views.toLocaleString()}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <p className="text-[10px] text-muted-foreground">Category</p>
          <p className="text-sm font-medium">{video.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={() => openDialog(video, "view")}
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          View
        </Button>
        {video.status === "published" ? (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 text-warning border-warning/30 hover:bg-warning/10"
            onClick={() => openDialog(video, "unpublish")}
          >
            <Pause className="w-3.5 h-3.5 mr-1" />
            Unpublish
          </Button>
        ) : (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 text-success border-success/30 hover:bg-success/10"
            onClick={() => openDialog(video, "publish")}
          >
            <Play className="w-3.5 h-3.5 mr-1" />
            Publish
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <AdminLayout title="Videos">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Videos" value="45" icon={Video} variant="info" index={0} />
          <MiniStat title="Published" value="32" icon={Play} variant="success" index={1} />
          <MiniStat title="Total Views" value="156K" icon={TrendingUp} variant="warning" index={2} />
          <MiniStat title="Scheduled" value="8" icon={Calendar} variant="info" index={3} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={videos}
          title="All Videos"
          searchPlaceholder="Search by title, category..."
          filters={[
            { key: "status", label: "Status", options: statusFilters },
          ]}
          onExport={() => toast({ title: "Export Started", description: "Your file will be downloaded shortly." })}
          onRefresh={() => toast({ title: "Refreshed", description: "Data has been refreshed." })}
          mobileCardRender={mobileCardRender}
        />

        {/* Action Dialog */}
        <ActionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          video={selectedVideo}
          action={dialogAction}
          onConfirm={handleConfirm}
        />
      </div>
    </AdminLayout>
  );
};

export default VideosPage;
