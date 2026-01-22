import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Save, Eye, Plus, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQEditor() {
  const { toast } = useToast();
  const [sectionTitle, setSectionTitle] = useState("Frequently Asked Questions");
  
  const [faqs, setFaqs] = useState<FAQ[]>([
    { 
      id: "1", 
      question: "কিভাবে আয় শুরু করব?", 
      answer: "প্রথমে রেজিস্ট্রেশন করুন, তারপর ভিডিও দেখা শুরু করুন। প্রতিটি ভিডিও দেখলে আপনার একাউন্টে টাকা জমা হবে।"
    },
    { 
      id: "2", 
      question: "উইথড্রয়াল কিভাবে করব?", 
      answer: "আপনার প্রোফাইল থেকে উইথড্রয়াল অপশনে গিয়ে আপনার পছন্দের পেমেন্ট মেথড সিলেক্ট করুন।"
    },
    { 
      id: "3", 
      question: "মিনিমাম উইথড্রয়াল কত?", 
      answer: "মিনিমাম উইথড্রয়াল ৫০০ টাকা। এই পরিমাণ জমা হলে আপনি উইথড্রয়াল করতে পারবেন।"
    },
  ]);

  const handleSave = () => {
    toast({
      title: "সফল!",
      description: "FAQ section সফলভাবে আপডেট হয়েছে।",
    });
  };

  const addFAQ = () => {
    const newId = Date.now().toString();
    setFaqs([...faqs, { id: newId, question: "", answer: "" }]);
  };

  const removeFAQ = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const updateFAQ = (id: string, field: keyof FAQ, value: string) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  return (
    <AdminLayout title="FAQ Editor">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">FAQ Editor</h1>
            <p className="text-muted-foreground">প্রশ্ন ও উত্তর সেকশন এডিট করুন</p>
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

        <Card>
          <CardHeader>
            <CardTitle>FAQ Items</CardTitle>
            <CardDescription>প্রশ্ন ও উত্তরগুলো এডিট করুন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="flex gap-3 p-4 border rounded-lg bg-muted/30">
                <div className="flex items-start pt-2 text-muted-foreground">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Q{index + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
                      placeholder="Enter question"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                      placeholder="Enter answer"
                      rows={3}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive shrink-0"
                  onClick={() => removeFAQ(faq.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addFAQ} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
