import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, ChevronRight, Calendar, TrendingUp, Loader2 } from "lucide-react";
import UserLayout from "@/components/user/UserLayout";
import VideoPlayerDialog from "@/components/user/VideoPlayerDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";

interface Video {
  id: string;
  title: string;
  youtube_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  reward: number;
}

export default function VideosPage() {
  const { toast } = useToast();
  const { profile, refetch: refetchProfile } = useProfile();
  const [videos, setVideos] = useState<Video[]>([]);
  const [watchedToday, setWatchedToday] = useState<string[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ count: 0, earnings: 0 });
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const totalVideosPerDay = 20; // This should come from user's plan
  const watchedCount = watchedToday.length;
  const progressPercent = (watchedCount / totalVideosPerDay) * 100;
  const todayEarnings = watchedCount * 20; // Earning per video

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get today's date range
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      // Fetch videos and today's watch history in parallel
      const [videosRes, todayWatchRes, profileRes] = await Promise.all([
        supabase
          .from('videos')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true }),
        supabase
          .from('video_watch_history')
          .select('video_id')
          .eq('user_id', user.id)
          .gte('watched_at', todayStart.toISOString())
          .lte('watched_at', todayEnd.toISOString()),
        supabase
          .from('profiles')
          .select('plan_purchased_at')
          .eq('user_id', user.id)
          .maybeSingle()
      ]);

      if (videosRes.data) {
        setVideos(videosRes.data);
      }

      if (todayWatchRes.data) {
        setWatchedToday(todayWatchRes.data.map(w => w.video_id));
      }

      // Calculate monthly stats from plan purchase date
      if (profileRes.data?.plan_purchased_at) {
        const planStartDate = new Date(profileRes.data.plan_purchased_at);
        const monthlyWatchRes = await supabase
          .from('video_watch_history')
          .select('reward_amount')
          .eq('user_id', user.id)
          .gte('watched_at', planStartDate.toISOString());

        if (monthlyWatchRes.data) {
          const totalEarnings = monthlyWatchRes.data.reduce((sum, w) => sum + Number(w.reward_amount), 0);
          setMonthlyStats({
            count: monthlyWatchRes.data.length,
            earnings: totalEarnings
          });
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video: Video) => {
    if (watchedToday.includes(video.id)) {
      toast({
        title: "ইতিমধ্যে দেখা হয়েছে",
        description: "এই ভিডিও আজকে আগেই দেখা হয়েছে",
      });
      return;
    }
    setSelectedVideo(video);
    setDialogOpen(true);
  };

  const handleVideoComplete = async (videoId: string, reward: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Record watch history
      await supabase
        .from('video_watch_history')
        .insert({
          user_id: user.id,
          video_id: videoId,
          reward_amount: reward
        });

      // Update user balance
      if (profile) {
        const newBalance = (profile.balance || 0) + reward;
        await supabase
          .from('profiles')
          .update({ balance: newBalance })
          .eq('user_id', user.id);
      }

      // Update local state
      setWatchedToday(prev => [...prev, videoId]);
      setMonthlyStats(prev => ({
        count: prev.count + 1,
        earnings: prev.earnings + reward
      }));

      // Refetch profile to update balance
      refetchProfile();

      toast({
        title: "অভিনন্দন! 🎉",
        description: `আপনি ৳${reward} আয় করেছেন!`,
      });
    } catch (err) {
      console.error('Error completing video:', err);
      toast({
        title: "ত্রুটি",
        description: "ভিডিও কমপ্লিট করতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    }
  };

  // Filter out already watched videos for today
  const availableVideos = videos.filter(v => !watchedToday.includes(v.id));

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Play className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-bold">Videos</span>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Monthly Progress Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold">মাসিক প্রগ্রেস</span>
              <span className="text-xs text-muted-foreground ml-auto">
                প্যাকেজ শুরু থেকে
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Play className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">মোট ভিডিও</span>
                </div>
                <p className="text-xl font-bold text-primary">{monthlyStats.count}টি</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">মোট আয়</span>
                </div>
                <p className="text-xl font-bold text-primary">৳{monthlyStats.earnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Progress Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">আজকের প্রগ্রেস</span>
              <span className="text-sm text-muted-foreground">{watchedCount} / {totalVideosPerDay} ভিডিও</span>
            </div>
            <Progress value={progressPercent} className="h-2 mb-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {watchedCount >= totalVideosPerDay ? "আজকের লিমিট শেষ!" : `আরো ${totalVideosPerDay - watchedCount}টি ভিডিও দেখুন`}
              </span>
              <span className="text-primary font-medium">+৳{todayEarnings} আয়</span>
            </div>
          </CardContent>
        </Card>

        {/* Available Videos */}
        {availableVideos.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">আজকের ভিডিওসমূহ</h2>
              <span className="text-sm text-muted-foreground">{availableVideos.length} বাকি</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">প্রতিটি ভিডিওতে ৳20 আয় করুন</p>

            <div className="space-y-3">
              {availableVideos.slice(0, totalVideosPerDay - watchedCount).map((video) => (
                <Card
                  key={video.id}
                  className="hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{video.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {video.duration || "3:00"}
                        </span>
                        <span className="text-xs font-medium text-primary">+৳{video.reward}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">আজকের সব ভিডিও দেখা হয়ে গেছে!</h3>
              <p className="text-muted-foreground text-sm">
                আগামীকাল আবার নতুন ভিডিও দেখতে পারবেন
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Video Player Dialog */}
      {selectedVideo && (
        <VideoPlayerDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          video={{
            id: selectedVideo.id,
            title: selectedVideo.title,
            duration: selectedVideo.duration || "3:00",
            reward: selectedVideo.reward,
            videoUrl: selectedVideo.youtube_url
          }}
          onComplete={(videoId, reward) => handleVideoComplete(videoId, reward)}
        />
      )}
    </UserLayout>
  );
}