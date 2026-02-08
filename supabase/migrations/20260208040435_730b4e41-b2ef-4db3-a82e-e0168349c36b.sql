-- Add subscription tracking to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS current_plan_id uuid REFERENCES public.subscription_plans(id),
ADD COLUMN IF NOT EXISTS plan_purchased_at timestamp with time zone;

-- Create video watch history table
CREATE TABLE public.video_watch_history (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    video_id text NOT NULL,
    reward_amount numeric NOT NULL DEFAULT 0,
    watched_at timestamp with time zone NOT NULL DEFAULT now(),
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create videos table for admin to manage
CREATE TABLE public.videos (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    youtube_url text NOT NULL,
    thumbnail_url text,
    duration text,
    reward numeric NOT NULL DEFAULT 20,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- RLS policies for video_watch_history
CREATE POLICY "Users can view their own watch history"
ON public.video_watch_history
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own watch history"
ON public.video_watch_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS policies for videos (public read)
CREATE POLICY "Anyone can view active videos"
ON public.videos
FOR SELECT
USING (is_active = true);

-- Create indexes for performance
CREATE INDEX idx_video_watch_history_user_id ON public.video_watch_history(user_id);
CREATE INDEX idx_video_watch_history_watched_at ON public.video_watch_history(watched_at);
CREATE INDEX idx_videos_is_active ON public.videos(is_active);

-- Add trigger for videos updated_at
CREATE TRIGGER update_videos_updated_at
BEFORE UPDATE ON public.videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample videos
INSERT INTO public.videos (title, youtube_url, duration, reward, sort_order) VALUES
('Tech Review: Latest Smartphones', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '3:38', 20, 1),
('Travel Vlog: Beautiful Bangladesh', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '4:59', 20, 2),
('Cooking Tutorial: Traditional Biryani', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '4:36', 20, 3),
('Financial Tips for Young Adults', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '3:39', 20, 4),
('Gaming Highlights: Epic Moments', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '4:39', 20, 5),
('Fitness Routine: Morning Workout', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '3:35', 20, 6),
('Health & Wellness: Yoga Basics', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2:07', 20, 7),
('Business Ideas: Startups 2024', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2:58', 20, 8),
('Music Production Tips', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '4:12', 20, 9),
('Photography Basics Tutorial', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '3:45', 20, 10);