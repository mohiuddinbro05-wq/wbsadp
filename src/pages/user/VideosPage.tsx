 import { Card, CardContent } from "@/components/ui/card";
 import { Progress } from "@/components/ui/progress";
 import { Play, Clock, ChevronRight } from "lucide-react";
 import UserLayout from "@/components/user/UserLayout";
 
 const videos = [
   { id: 1, title: "Tech Review: Latest Smartphones...", duration: "3:38", reward: 20 },
   { id: 2, title: "Travel Vlog: Beautiful Bangladesh", duration: "4:59", reward: 20 },
   { id: 3, title: "Cooking Tutorial: Traditional Biryani", duration: "4:36", reward: 20 },
   { id: 4, title: "Financial Tips for Young...", duration: "3:39", reward: 20 },
   { id: 5, title: "Gaming Highlights: Epic Moments", duration: "4:39", reward: 20 },
   { id: 6, title: "Fitness Routine: Morning Workout", duration: "3:35", reward: 20 },
   { id: 7, title: "Health & Wellness: Yoga", duration: "2:07", reward: 20 },
   { id: 8, title: "Business Ideas: Startups", duration: "2:58", reward: 20 },
 ];
 
 export default function VideosPage() {
   const watchedCount = 0;
   const totalVideos = 20;
   const progressPercent = (watchedCount / totalVideos) * 100;
 
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
         {/* Progress Card */}
         <Card>
           <CardContent className="p-4">
             <div className="flex items-center justify-between mb-2">
               <span className="font-semibold">আজকের প্রগ্রেস</span>
               <span className="text-sm text-muted-foreground">{watchedCount} / {totalVideos} ভিডিও</span>
             </div>
             <Progress value={progressPercent} className="h-2 mb-2" />
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted-foreground">আরো {totalVideos - watchedCount}টি ভিডিও দেখুন</span>
               <span className="text-primary font-medium">+৳০ আয়</span>
             </div>
           </CardContent>
         </Card>
 
         {/* Videos List */}
         <div>
           <div className="flex items-center justify-between mb-3">
             <h2 className="font-bold text-lg">আজকের ভিডিওসমূহ</h2>
             <span className="text-sm text-muted-foreground">{totalVideos} বাকি</span>
           </div>
           <p className="text-sm text-muted-foreground mb-4">প্রতিটি ভিডিওতে ৳20 আয় করুন</p>
 
           <div className="space-y-3">
             {videos.map((video) => (
               <Card key={video.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                 <CardContent className="p-4 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                     <Play className="w-5 h-5 text-primary" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="font-medium text-sm truncate">{video.title}</p>
                     <div className="flex items-center gap-3 mt-1">
                       <span className="flex items-center gap-1 text-xs text-muted-foreground">
                         <Clock className="w-3 h-3" />
                         {video.duration}
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
       </main>
     </UserLayout>
   );
 }