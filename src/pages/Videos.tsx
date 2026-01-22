import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable, Column } from "@/components/admin/DataTable";
import { MiniStat } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, Play, Pause, Trash2, Video, Clock, TrendingUp, Calendar, AlertTriangle, Edit, Plus, Youtube, ExternalLink, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface VideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  description: string;
  duration: string;
  views: number;
  status: "published" | "draft" | "scheduled";
  uploadDate: string;
  category: string;
}

// Helper function to extract YouTube video ID from URL
function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Helper function to get YouTube thumbnail
function getYoutubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

const initialVideos: VideoItem[] = [
  { 
    id: "VID001", 
    title: "How to Earn Money Online", 
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    description: "Learn the best ways to earn money online in 2026",
    duration: "12:45", 
    views: 15420, 
    status: "published", 
    uploadDate: "2026-01-15", 
    category: "Tutorial" 
  },
  { 
    id: "VID002", 
    title: "Investment Tips for Beginners", 
    youtubeUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    youtubeId: "JGwWNGJdvx8",
    description: "Start your investment journey with these simple tips",
    duration: "08:30", 
    views: 8750, 
    status: "published", 
    uploadDate: "2026-01-18", 
    category: "Finance" 
  },
  { 
    id: "VID003", 
    title: "Platform Guide 2026", 
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    youtubeId: "9bZkp7q19f0",
    description: "Complete guide to using our platform",
    duration: "15:20", 
    views: 0, 
    status: "draft", 
    uploadDate: "2026-01-20", 
    category: "Guide" 
  },
  { 
    id: "VID004", 
    title: "Success Stories", 
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    youtubeId: "kJQP7kiw5Fk",
    description: "Real success stories from our users",
    duration: "20:00", 
    views: 0, 
    status: "scheduled", 
    uploadDate: "2026-01-25", 
    category: "Motivation" 
  },
  { 
    id: "VID005", 
    title: "Referral Program Explained", 
    youtubeUrl: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
    youtubeId: "OPf0YbXqDm0",
    description: "How to maximize earnings with referrals",
    duration: "06:15", 
    views: 12300, 
    status: "published", 
    uploadDate: "2026-01-10", 
    category: "Tutorial" 
  },
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

// YouTube Thumbnail Component
function YouTubeThumbnail({ videoId, title, className }: { videoId: string; title: string; className?: string }) {
  return (
    <div className={cn("relative rounded-lg overflow-hidden bg-muted", className)}>
      <img 
        src={getYoutubeThumbnail(videoId)} 
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg";
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
          <Play className="w-6 h-6 text-white fill-white ml-1" />
        </div>
      </div>
      <div className="absolute bottom-1 right-1">
        <Youtube className="w-5 h-5 text-red-600" />
      </div>
    </div>
  );
}

// Video View Dialog with YouTube Embed
interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  video: VideoItem | null;
}

function ViewDialog({ open, onClose, video }: ViewDialogProps) {
  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-600" />
            {video.title}
          </DialogTitle>
          <DialogDescription>
            Watch video preview
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* YouTube Embed */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Video Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-muted/50 border text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">Duration</span>
              </div>
              <p className="font-mono font-medium">{video.duration}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-xs">Views</span>
              </div>
              <p className="font-medium">{video.views.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-xs">Added</span>
              </div>
              <p className="text-sm font-medium">{video.uploadDate}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Video className="w-3.5 h-3.5" />
                <span className="text-xs">Status</span>
              </div>
              <VideoStatusBadge status={video.status} />
            </div>
          </div>

          {/* Description */}
          {video.description && (
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Description</h4>
              <p className="text-sm">{video.description}</p>
            </div>
          )}

          {/* YouTube Link */}
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-600" />
              <span className="text-sm font-mono truncate max-w-[300px]">{video.youtubeUrl}</span>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="gap-1"
              onClick={() => window.open(video.youtubeUrl, "_blank")}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Add/Edit Video Dialog
interface VideoDialogProps {
  open: boolean;
  onClose: () => void;
  video: VideoItem | null;
  onSave: (data: Partial<VideoItem>) => void;
}

function VideoDialog({ open, onClose, video, onSave }: VideoDialogProps) {
  const [formData, setFormData] = useState<Partial<VideoItem>>(video || {
    title: "",
    youtubeUrl: "",
    description: "",
    category: "Tutorial",
    status: "draft",
  });
  const [previewId, setPreviewId] = useState<string | null>(video?.youtubeId || null);

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, youtubeUrl: url });
    const id = extractYoutubeId(url);
    setPreviewId(id);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.youtubeUrl) {
      toast({ title: "Error", description: "Please fill title and YouTube URL.", variant: "destructive" });
      return;
    }
    
    const youtubeId = extractYoutubeId(formData.youtubeUrl || "");
    if (!youtubeId) {
      toast({ title: "Error", description: "Invalid YouTube URL.", variant: "destructive" });
      return;
    }

    onSave({ ...formData, youtubeId });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-600" />
            {video ? "Edit Video" : "Add New Video"}
          </DialogTitle>
          <DialogDescription>
            Add a YouTube video link
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* YouTube URL */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              YouTube URL *
            </Label>
            <Input 
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.youtubeUrl || ""}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
          </div>

          {/* Preview */}
          {previewId && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${previewId}`}
                  title="Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label>Video Title *</Label>
            <Input 
              placeholder="Enter video title"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              placeholder="Enter video description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Category & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {["Tutorial", "Finance", "Guide", "Motivation"].map((cat) => (
                  <Button
                    key={cat}
                    type="button"
                    size="sm"
                    variant={formData.category === cat ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, category: cat })}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input 
                placeholder="e.g., 10:30"
                value={formData.duration || ""}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex gap-2">
              {(["draft", "published", "scheduled"] as const).map((status) => (
                <Button
                  key={status}
                  type="button"
                  size="sm"
                  variant={formData.status === status ? "default" : "outline"}
                  className={cn(
                    formData.status === status && status === "published" && "bg-success",
                    formData.status === status && status === "scheduled" && "bg-info"
                  )}
                  onClick={() => setFormData({ ...formData, status })}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700 text-white gap-2">
            <Youtube className="w-4 h-4" />
            {video ? "Update Video" : "Add Video"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Action Dialog for Delete/Publish/Unpublish
interface ActionDialogProps {
  open: boolean;
  onClose: () => void;
  video: VideoItem | null;
  action: "delete" | "publish" | "unpublish" | null;
  onConfirm: () => void;
}

function ActionDialog({ open, onClose, video, action, onConfirm }: ActionDialogProps) {
  if (!video || !action) return null;

  const actionConfig = {
    delete: { title: "Delete Video", confirmText: "Confirm Delete", confirmClass: "bg-destructive hover:bg-destructive/90", icon: Trash2, color: "text-destructive" },
    publish: { title: "Publish Video", confirmText: "Confirm Publish", confirmClass: "bg-success hover:bg-success/90", icon: Play, color: "text-success" },
    unpublish: { title: "Unpublish Video", confirmText: "Confirm Unpublish", confirmClass: "bg-warning hover:bg-warning/90", icon: Pause, color: "text-warning" },
  };

  const config = actionConfig[action];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <config.icon className={cn("w-5 h-5", config.color)} />
            {config.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Preview */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
            <YouTubeThumbnail videoId={video.youtubeId} title={video.title} className="w-24 h-16" />
            <div>
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-sm text-muted-foreground">{video.category} • {video.duration}</p>
            </div>
          </div>

          {/* Warning */}
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
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className={cn("text-white", config.confirmClass)}
          >
            {config.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Page Component
const VideosPage = () => {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"delete" | "publish" | "unpublish" | null>(null);

  const openViewDialog = (video: VideoItem) => {
    setSelectedVideo(video);
    setViewDialogOpen(true);
  };

  const openActionDialog = (video: VideoItem, action: "delete" | "publish" | "unpublish") => {
    setSelectedVideo(video);
    setDialogAction(action);
    setActionDialogOpen(true);
  };

  const handleAddVideo = () => {
    setEditingVideo(null);
    setVideoDialogOpen(true);
  };

  const handleEditVideo = (video: VideoItem) => {
    setEditingVideo(video);
    setVideoDialogOpen(true);
  };

  const handleSaveVideo = (data: Partial<VideoItem>) => {
    if (editingVideo) {
      setVideos(videos.map(v => v.id === editingVideo.id ? { ...v, ...data } : v));
      toast({ title: "Video Updated", description: `${data.title} has been updated.` });
    } else {
      const newVideo: VideoItem = {
        id: `VID${String(videos.length + 1).padStart(3, '0')}`,
        title: data.title || "",
        youtubeUrl: data.youtubeUrl || "",
        youtubeId: data.youtubeId || "",
        description: data.description || "",
        duration: data.duration || "00:00",
        views: 0,
        status: data.status || "draft",
        uploadDate: new Date().toISOString().split('T')[0],
        category: data.category || "Tutorial",
      };
      setVideos([newVideo, ...videos]);
      toast({ title: "Video Added", description: `${data.title} has been added.` });
    }
  };

  const handleConfirmAction = () => {
    if (!selectedVideo || !dialogAction) return;

    if (dialogAction === "delete") {
      setVideos(videos.filter(v => v.id !== selectedVideo.id));
      toast({ title: "Video Deleted", description: `${selectedVideo.title} has been deleted.`, variant: "destructive" });
    } else if (dialogAction === "publish") {
      setVideos(videos.map(v => v.id === selectedVideo.id ? { ...v, status: "published" } : v));
      toast({ title: "Video Published", description: `${selectedVideo.title} is now live.` });
    } else if (dialogAction === "unpublish") {
      setVideos(videos.map(v => v.id === selectedVideo.id ? { ...v, status: "draft" } : v));
      toast({ title: "Video Unpublished", description: `${selectedVideo.title} has been unpublished.` });
    }

    setActionDialogOpen(false);
  };

  const columns: Column<VideoItem>[] = [
    { key: "id", label: "ID", className: "font-mono" },
    { 
      key: "title", 
      label: "Video",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <YouTubeThumbnail videoId={row.youtubeId} title={String(value)} className="w-16 h-10" />
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
    { key: "uploadDate", label: "Added" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 hover:bg-primary/10"
            onClick={() => openViewDialog(row)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 hover:bg-primary/10"
            onClick={() => handleEditVideo(row)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          {row.status === "published" ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-warning hover:text-warning hover:bg-warning/10"
              onClick={() => openActionDialog(row, "unpublish")}
            >
              <Pause className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => openActionDialog(row, "publish")}
            >
              <Play className="w-4 h-4" />
            </Button>
          )}
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => openActionDialog(row, "delete")}
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
      <div className="mb-3">
        <YouTubeThumbnail videoId={video.youtubeId} title={video.title} className="w-full aspect-video" />
      </div>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-xs text-muted-foreground font-mono">{video.id}</p>
        </div>
        <VideoStatusBadge status={video.status} />
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
          className="flex-1 gap-1"
          onClick={() => openViewDialog(video)}
        >
          <Play className="w-3.5 h-3.5" />
          Watch
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 gap-1"
          onClick={() => handleEditVideo(video)}
        >
          <Edit className="w-3.5 h-3.5" />
          Edit
        </Button>
        <Button 
          size="icon" 
          variant="outline"
          className="h-9 w-9 text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={() => openActionDialog(video, "delete")}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Videos">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <MiniStat title="Total Videos" value={String(videos.length)} icon={Video} variant="info" index={0} />
          <MiniStat title="Published" value={String(videos.filter(v => v.status === "published").length)} icon={Play} variant="success" index={1} />
          <MiniStat title="Total Views" value={videos.reduce((sum, v) => sum + v.views, 0).toLocaleString()} icon={TrendingUp} variant="warning" index={2} />
          <MiniStat title="Scheduled" value={String(videos.filter(v => v.status === "scheduled").length)} icon={Calendar} variant="info" index={3} />
        </div>

        {/* Add Video Button */}
        <div className="flex justify-end">
          <Button onClick={handleAddVideo} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
            <Plus className="w-4 h-4" />
            Add YouTube Video
          </Button>
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

        {/* Dialogs */}
        <ViewDialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          video={selectedVideo}
        />

        <VideoDialog
          open={videoDialogOpen}
          onClose={() => setVideoDialogOpen(false)}
          video={editingVideo}
          onSave={handleSaveVideo}
        />

        <ActionDialog
          open={actionDialogOpen}
          onClose={() => setActionDialogOpen(false)}
          video={selectedVideo}
          action={dialogAction}
          onConfirm={handleConfirmAction}
        />
      </div>
    </AdminLayout>
  );
};

export default VideosPage;
