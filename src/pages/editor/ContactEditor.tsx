import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Save, Eye, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
}

export default function ContactEditor() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "support@example.com",
    phone: "+880 1234-567890",
    whatsapp: "+880 1234-567890",
    address: "123 Main Street, Dhaka, Bangladesh",
    workingHours: "Saturday - Thursday: 9:00 AM - 6:00 PM",
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: "1", platform: "Facebook", url: "https://facebook.com/example", isActive: true },
    { id: "2", platform: "YouTube", url: "https://youtube.com/example", isActive: true },
    { id: "3", platform: "Telegram", url: "https://t.me/example", isActive: true },
  ]);

  const handleSave = () => {
    toast({
      title: "সফল!",
      description: "Contact section সফলভাবে আপডেট হয়েছে।",
    });
  };

  const addSocialLink = () => {
    const newId = Date.now().toString();
    setSocialLinks([...socialLinks, { id: newId, platform: "", url: "", isActive: true }]);
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter((s) => s.id !== id));
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string | boolean) => {
    setSocialLinks(socialLinks.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <AdminLayout title="Contact Info Editor">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contact Info Editor</h1>
            <p className="text-muted-foreground">যোগাযোগ তথ্য এডিট করুন</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>মূল যোগাযোগ তথ্য</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input
                  id="workingHours"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>সোশ্যাল মিডিয়া লিংক</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialLinks.map((link) => (
                <div key={link.id} className="flex gap-2 items-end p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1 space-y-2">
                    <Label>Platform</Label>
                    <Input
                      value={link.platform}
                      onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)}
                      placeholder="e.g., Facebook"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={link.url}
                      onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center gap-2 pb-2">
                    <Switch
                      checked={link.isActive}
                      onCheckedChange={(checked) => updateSocialLink(link.id, "isActive", checked)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive shrink-0"
                    onClick={() => removeSocialLink(link.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addSocialLink} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Social Link
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
