import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock } from "lucide-react";

interface VideoPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: {
    id: string;
    title: string;
    duration: string;
    reward: number;
    videoUrl?: string;
  };
  onComplete: (videoId: string, reward: number) => void;
}

// Extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoPlayerDialog({
  open,
  onOpenChange,
  video,
  onComplete,
}: VideoPlayerDialogProps) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds to watch
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const videoId = video.videoUrl ? getYouTubeVideoId(video.videoUrl) : null;

  useEffect(() => {
    if (open) {
      setProgress(0);
      setCompleted(false);
      setTimeLeft(30);
      setStarted(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  // Start countdown when video starts playing
  useEffect(() => {
    if (started && !completed) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCompleted(true);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
        setProgress((prev) => Math.min(prev + 100 / 30, 100));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, completed]);

  // Auto-start when dialog opens
  useEffect(() => {
    if (open && videoId) {
      // Give iframe time to load
      const timer = setTimeout(() => setStarted(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [open, videoId]);

  const handleClaim = () => {
    onComplete(video.id, video.reward);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-base truncate pr-8">{video.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4 pt-2">
          {/* YouTube Video Embed */}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {videoId ? (
              <>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
                {completed && (
                  <div className="absolute inset-0 bg-background/90 flex items-center justify-center z-10">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-primary">ভিডিও সম্পন্ন!</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">ভিডিও লোড হচ্ছে...</p>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{completed ? "সম্পন্ন" : `${timeLeft}s বাকি`}</span>
              </div>
              <span className="text-primary font-medium">+৳{video.reward}</span>
            </div>
          </div>

          {/* Instructions */}
          {!completed && (
            <p className="text-xs text-muted-foreground text-center">
              ৩০ সেকেন্ড ভিডিও দেখুন, তারপর টাকা নিতে পারবেন
            </p>
          )}

          {/* Claim Button */}
          {completed && (
            <Button onClick={handleClaim} className="w-full" size="lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              ৳{video.reward} নিন
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}