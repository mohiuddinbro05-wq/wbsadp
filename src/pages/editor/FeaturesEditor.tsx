import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Save, Eye, Plus, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function FeaturesEditor() {
  const { toast } = useToast();
  const [sectionTitle, setSectionTitle] = useState("Our Features");
  const [sectionSubtitle, setSectionSubtitle] = useState("Why choose our platform?");
  
  const [features, setFeatures] = useState<Feature[]>([
    { id: "1", title: "Easy Earning", description: "Watch videos and earn instantly", icon: "💰" },
    { id: "2", title: "Quick Withdrawal", description: "Get your money within 24 hours", icon: "⚡" },
    { id: "3", title: "Secure Platform", description: "Your earnings are safe with us", icon: "🔒" },
    { id: "4", title: "24/7 Support", description: "We're always here to help", icon: "💬" },
  ]);

  const handleSave = () => {
    toast({
      title: "সফল!",
      description: "Features section সফলভাবে আপডেট হয়েছে।",
    });
  };

  const addFeature = () => {
    const newId = Date.now().toString();
    setFeatures([...features, { id: newId, title: "", description: "", icon: "✨" }]);
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  return (
    <AdminLayout title="Features Section Editor">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Features Section Editor</h1>
            <p className="text-muted-foreground">হোম পেজের Features section এডিট করুন</p>
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

        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
            <CardDescription>Features section এর হেডার</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sectionTitle">Section Title</Label>
                <Input
                  id="sectionTitle"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sectionSubtitle">Section Subtitle</Label>
                <Input
                  id="sectionSubtitle"
                  value={sectionSubtitle}
                  onChange={(e) => setSectionSubtitle(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features List</CardTitle>
            <CardDescription>ফিচার আইটেমগুলো এডিট করুন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature) => (
              <div key={feature.id} className="flex gap-3 p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center text-muted-foreground">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex-1 grid gap-4 sm:grid-cols-4">
                  <div className="space-y-2">
                    <Label>Icon (Emoji)</Label>
                    <Input
                      value={feature.icon}
                      onChange={(e) => updateFeature(feature.id, "icon", e.target.value)}
                      className="text-center text-xl"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-1">
                    <Label>Title</Label>
                    <Input
                      value={feature.title}
                      onChange={(e) => updateFeature(feature.id, "title", e.target.value)}
                      placeholder="Feature title"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Description</Label>
                    <Input
                      value={feature.description}
                      onChange={(e) => updateFeature(feature.id, "description", e.target.value)}
                      placeholder="Feature description"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive shrink-0"
                  onClick={() => removeFeature(feature.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addFeature} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
