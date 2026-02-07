-- Create announcements table for managing platform notifications
CREATE TABLE public.announcements (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    icon TEXT DEFAULT 'bell',
    icon_color TEXT DEFAULT 'primary',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Everyone can read active announcements
CREATE POLICY "Anyone can view active announcements"
ON public.announcements
FOR SELECT
USING (is_active = true);

-- Create subscription_plans table
CREATE TABLE public.subscription_plans (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    videos_per_day INTEGER NOT NULL DEFAULT 10,
    earning_per_video NUMERIC NOT NULL DEFAULT 5,
    monthly_earning NUMERIC NOT NULL DEFAULT 0,
    features TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- Everyone can read active plans
CREATE POLICY "Anyone can view active plans"
ON public.subscription_plans
FOR SELECT
USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscription_plans_updated_at
BEFORE UPDATE ON public.subscription_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default plans
INSERT INTO public.subscription_plans (name, price, videos_per_day, earning_per_video, monthly_earning, features, sort_order) VALUES
('Starter', 500, 10, 5, 1500, ARRAY['১০ ভিডিও/দিন', '৳৫ প্রতি ভিডিও', 'বেসিক সাপোর্ট'], 1),
('Basic', 1000, 15, 10, 4500, ARRAY['১৫ ভিডিও/দিন', '৳১০ প্রতি ভিডিও', 'স্ট্যান্ডার্ড সাপোর্ট'], 2),
('Standard', 2000, 20, 20, 12000, ARRAY['২০ ভিডিও/দিন', '৳২০ প্রতি ভিডিও', 'প্রায়োরিটি সাপোর্ট'], 3),
('Premium', 5000, 30, 35, 31500, ARRAY['৩০ ভিডিও/দিন', '৳৩৫ প্রতি ভিডিও', 'VIP সাপোর্ট'], 4),
('VIP', 10000, 50, 50, 75000, ARRAY['৫০ ভিডিও/দিন', '৳৫০ প্রতি ভিডিও', 'ডেডিকেটেড সাপোর্ট'], 5);

-- Insert default announcements
INSERT INTO public.announcements (title, content, icon, icon_color) VALUES
('রেফারাল বোনাস বাড়ানো হয়েছে!', 'এখন প্রতি রেফারালে আরো বেশি বোনাস পাবেন। আপনার রেফারাল লিংক শেয়ার করুন এবং প্রতিটি সফল রেফারালে ৳১০০ বোনাস পান!', 'gift', 'primary'),
('নতুন ভিডিও যোগ করা হয়েছে', 'আরো বেশি ভিডিও দেখে আয় করুন। প্রতিদিন নতুন নতুন ভিডিও আপলোড করা হচ্ছে। মিস করবেন না!', 'video', 'blue');