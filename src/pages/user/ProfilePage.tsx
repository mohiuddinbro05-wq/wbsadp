import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Copy, Wallet, Video, TrendingUp, User, Star, Award, History, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import UserLayout from "@/components/user/UserLayout";
import EditProfileDialog from "@/components/user/EditProfileDialog";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

const achievements = [
  { icon: Star, label: "First 10", sublabel: "Videos", unlocked: false },
  { icon: Video, label: "50 Videos", sublabel: "Watcher", unlocked: false },
  { icon: TrendingUp, label: "৳1000+", sublabel: "Earner", unlocked: false },
];

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { profile, loading, refetch } = useProfile();
  const { toast } = useToast();
  const [editOpen, setEditOpen] = useState(false);

  const userName = profile?.full_name || user?.user_metadata?.full_name || "User";
  const userEmail = user?.email || "user@email.com";
  const referralCode = profile?.referral_code || "------";
  const balance = profile?.balance || 0;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <span className="text-lg font-bold">My Profile</span>
          </div>
          <Button variant="outline" size="sm" className="text-xs" onClick={() => setEditOpen(true)}>
            <User className="w-3 h-3 mr-1" />
            Edit Profile
          </Button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold">
                {userName.charAt(0).toUpperCase()}{userName.split(' ')[1]?.charAt(0).toUpperCase() || 'A'}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-background">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold">{userName}</h2>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </CardContent>
        </Card>

        {/* Referral Code */}
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg text-muted-foreground">#</span>
              <div>
                <p className="text-xs text-muted-foreground">Your Unique Code</p>
                <p className="text-xl font-bold text-primary">{referralCode}</p>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={() => copyToClipboard(referralCode)}>
              <Copy className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Wallet className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold">৳{balance}</p>
              <p className="text-xs text-muted-foreground">Balance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Video className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold">0</p>
              <p className="text-xs text-muted-foreground">Videos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold">৳{balance}</p>
              <p className="text-xs text-muted-foreground">Earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Go to Wallet Button */}
        <Link to="/wallet">
          <Button className="w-full h-12" size="lg">
            <Wallet className="w-5 h-5 mr-2" />
            Go to My Wallet
          </Button>
        </Link>

        {/* Personal Information */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 py-2 border-b border-border">
                <User className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium">{userName}</p>
                </div>
              </div>
              {profile?.phone && (
                <div className="flex items-center gap-3 py-2 border-b border-border">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold">Achievements</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.label} className="text-center opacity-50">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-2">
                    <achievement.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-medium">{achievement.label}</p>
                  <p className="text-xs text-muted-foreground">{achievement.sublabel}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Total Earned</p>
                  <p className="text-xs text-muted-foreground">Lifetime earnings</p>
                </div>
                <span className="text-primary font-bold">৳{balance}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Videos Watched</p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
                <span className="font-bold">0</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <History className="w-4 h-4 mr-2" />
              View Full History
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="destructive" className="w-full" onClick={signOut}>
          Logout
        </Button>
      </main>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
        onSuccess={refetch}
      />
    </UserLayout>
  );
}
