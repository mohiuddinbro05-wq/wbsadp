import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Save, Eye, Plus, Trash2, Star, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export default function TestimonialsEditor() {
  const { toast } = useToast();
  const [sectionTitle, setSectionTitle] = useState("What Our Users Say");
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { 
      id: "1", 
      name: "Rahim Ahmed", 
      role: "Regular User",
      content: "এই প্ল্যাটফর্মে আমি প্রতিদিন ভিডিও দেখে আয় করছি। খুবই সহজ এবং বিশ্বস্ত।",
      rating: 5,
      avatar: ""
    },
    { 
      id: "2", 
      name: "Fatima Begum", 
      role: "Premium Member",
      content: "উইথড্রয়াল খুব দ্রুত হয়। ২৪ ঘণ্টার মধ্যে টাকা পেয়ে যাই।",
      rating: 5,
      avatar: ""
    },
  ]);

  const handleSave = () => {
    toast({
      title: "সফল!",
      description: "Testimonials section সফলভাবে আপডেট হয়েছে।",
    });
  };

  const addTestimonial = () => {
    const newId = Date.now().toString();
    setTestimonials([...testimonials, { 
      id: newId, 
      name: "", 
      role: "",
      content: "", 
      rating: 5,
      avatar: ""
    }]);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  const updateTestimonial = (id: string, field: keyof Testimonial, value: string | number) => {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  return (
    <AdminLayout title="Testimonials Editor">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Testimonials Editor</h1>
            <p className="text-muted-foreground">ইউজার রিভিউ সেকশন এডিট করুন</p>
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
            <CardTitle>Section Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="Section title"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={testimonial.name}
                          onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                          placeholder="User name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role/Title</Label>
                        <Input
                          value={testimonial.role}
                          onChange={(e) => updateTestimonial(testimonial.id, "role", e.target.value)}
                          placeholder="e.g., Premium Member"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Testimonial</Label>
                      <Textarea
                        value={testimonial.content}
                        onChange={(e) => updateTestimonial(testimonial.id, "content", e.target.value)}
                        placeholder="User's testimonial..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label>Rating:</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => updateTestimonial(testimonial.id, "rating", star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => removeTestimonial(testimonial.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" onClick={addTestimonial} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>
    </AdminLayout>
  );
}
