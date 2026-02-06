import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, CheckCircle, Clock } from "lucide-react";

interface VideoPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: {
    id: number;
    title: string;
    duration: string;
    reward: number;
    videoUrl?: string;
  };
  onComplete: (videoId: number, reward: number) => void;
}

export default function VideoPlayerDialog({
  open,
  onOpenChange,
  video,
  onComplete,
}: VideoPlayerDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds to watch
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setProgress(0);
      setCompleted(false);
      setTimeLeft(30);
      setIsPlaying(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  useEffect(() => {
    if (isPlaying && !completed) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCompleted(true);
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
        setProgress((prev) => Math.min(prev + 100 / 30, 100));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, completed]);

  const handlePlayPause = () => {
    if (!completed) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleClaim = () => {
    onComplete(video.id, video.reward);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base truncate pr-8">{video.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
            
            {completed ? (
              <div className="text-center z-10">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-2" />
                <p className="font-semibold text-primary">ভিডিও সম্পন্ন!</p>
              </div>
            ) : (
              <button
                onClick={handlePlayPause}
                className="z-10 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>
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
          {!completed && !isPlaying && (
            <p className="text-xs text-muted-foreground text-center">
              ভিডিও দেখতে প্লে বাটনে ক্লিক করুন। পুরো ভিডিও দেখলে টাকা পাবেন।
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
