import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Loader2 } from "lucide-react";
import { Profile, useProfile } from "@/hooks/useProfile";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Profile | null;
  onSuccess: () => void;
}

export default function EditProfileDialog({ open, onOpenChange, profile, onSuccess }: EditProfileDialogProps) {
  const { toast } = useToast();
  const { updateProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      toast({
        title: "Error",
        description: "নাম লিখুন",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await updateProfile({
      full_name: fullName.trim(),
      phone: phone.trim() || null,
    });
    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "আপডেট করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "সফল!",
      description: "প্রোফাইল আপডেট হয়েছে",
    });
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            প্রোফাইল এডিট করুন
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>নাম</Label>
            <Input
              placeholder="আপনার নাম"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>ফোন নম্বর</Label>
            <Input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            সেভ করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
