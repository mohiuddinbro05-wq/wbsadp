import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Gift, Users, TrendingUp, Copy, Share2, MessageCircle, Facebook, Send } from "lucide-react";
import { Link } from "react-router-dom";
import UserLayout from "@/components/user/UserLayout";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";

const howItWorks = [
  { step: 1, title: "Share Your Link", desc: "Send your referral link to friends via WhatsApp, Facebook, or any platform" },
  { step: 2, title: "Friend Signs Up", desc: "Your friend creates an account using your referral code" },
  { step: 3, title: "Friend Buys Membership", desc: "When they purchase any membership plan" },
  { step: 4, title: "Both Get Bonus!", desc: "You and your friend each receive ৳50 bonus!" },
];

export default function ReferPage() {
  const { toast } = useToast();
  const { profile } = useProfile();
  
  const referralCode = profile?.referral_code || "LOADING...";
  const referralLink = `https://wbsadp1.lovable.app/auth?ref=${referralCode}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const shareVia = (platform: string) => {
    const message = encodeURIComponent(`EarnTube এ জয়েন করুন এবং ভিডিও দেখে আয় করুন! আমার রেফারাল কোড ব্যবহার করুন: ${referralCode}\n\n${referralLink}`);
    
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${message}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${message}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${message}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: "EarnTube - ভিডিও দেখে আয় করুন",
            text: `EarnTube এ জয়েন করুন! রেফারাল কোড: ${referralCode}`,
            url: referralLink,
          });
          return;
        }
        copyToClipboard(referralLink, "Link");
        return;
    }
    
    window.open(url, "_blank");
  };

  return (
    <UserLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <span className="text-lg font-bold">Refer & Earn</span>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Invite Banner */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Invite Friends</h3>
                <p className="text-sm opacity-90">Earn ৳50 per referral</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Share your referral link with friends. When they sign up and purchase a membership, you both get ৳50 bonus!
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <p className="text-xl font-bold">0</p>
                <p className="text-xs opacity-80">Total</p>
              </div>
              <div className="text-center">
                <div className="w-5 h-5 mx-auto mb-1 rounded-full border-2 border-white/60" />
                <p className="text-xl font-bold">0</p>
                <p className="text-xs opacity-80">Active</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <p className="text-xl font-bold">৳0</p>
                <p className="text-xs opacity-80">Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Code */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-4 h-4 text-primary" />
              <span className="font-semibold">Your Referral Code</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Code</label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    value={referralCode} 
                    readOnly 
                    className="font-mono text-primary font-bold bg-primary/5 border-primary/20"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(referralCode, "Referral code")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Link</label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    value={referralLink} 
                    readOnly 
                    className="text-xs bg-muted/50"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(referralLink, "Referral link")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Via */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-3">Share via</p>
            <div className="flex gap-3">
              <Button onClick={() => shareVia("whatsapp")} className="flex-1 bg-green-500 hover:bg-green-600">
                <MessageCircle className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">WhatsApp</span>
              </Button>
              <Button onClick={() => shareVia("facebook")} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Facebook className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Facebook</span>
              </Button>
              <Button onClick={() => shareVia("telegram")} className="flex-1 bg-sky-500 hover:bg-sky-600">
                <Send className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Telegram</span>
              </Button>
              <Button onClick={() => shareVia("share")} variant="outline" className="flex-1">
                <Share2 className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">More</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-4 h-4 text-primary" />
              <span className="font-semibold">How It Works</span>
            </div>
            <div className="space-y-4">
              {howItWorks.map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Referrals */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-semibold">My Referrals</span>
              </div>
              <span className="text-sm text-muted-foreground">0 total</span>
            </div>
            <div className="flex flex-col items-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium">No Referrals Yet</p>
              <p className="text-sm text-muted-foreground">Start sharing your link to earn bonuses!</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </UserLayout>
  );
}
