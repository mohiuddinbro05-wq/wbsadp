import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Save, Upload, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HeroEditor() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "Watch Videos & Earn Money",
    subtitle: "Start earning today by watching videos. Simple, easy, and rewarding.",
    buttonText: "Get Started",
    buttonLink: "/register",
    backgroundImage: "",
  });

  const handleSave = () => {
    toast({
      title: "সফল!",
      description: "Hero section সফলভাবে আপডেট হয়েছে।",
    });
  };

  return (
    <AdminLayout title="Hero Section Editor">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hero Section Editor</h1>
            <p className="text-muted-foreground">হোম পেজের Hero section এডিট করুন</p>
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
              <CardTitle>Content</CardTitle>
              <CardDescription>Hero section এর টেক্সট কনটেন্ট</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter hero title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter hero subtitle"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    placeholder="Button text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    placeholder="/register"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Background Image</CardTitle>
              <CardDescription>Hero section এর ব্যাকগ্রাউন্ড ইমেজ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  ইমেজ আপলোড করতে এখানে ক্লিক করুন
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Or paste image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.backgroundImage}
                  onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
