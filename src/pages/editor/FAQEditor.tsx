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
      question: "How do I start earning?", 
      answer: "First register, then start watching videos. Each video you watch will credit money to your account."
    },
    { 
      id: "2", 
      question: "How do I withdraw?", 
      answer: "Go to the withdrawal option from your profile and select your preferred payment method."
    },
    { 
      id: "3", 
      question: "What is the minimum withdrawal?", 
      answer: "The minimum withdrawal is $500. You can withdraw once this amount is accumulated."
    },
    { 
      id: "4", 
      question: "How long does withdrawal take?", 
      answer: "Withdrawals are processed within 24-48 hours on business days."
    },
    { 
      id: "5", 
      question: "How does the referral program work?", 
      answer: "Share your referral code with friends. When they join and make a deposit, you earn commission based on the tiered structure."
    },
  ]);

  const handleSave = () => {
    toast({
      title: "Success!",
      description: "FAQ section has been updated. Changes are synced to Terms page.",
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
            <p className="text-muted-foreground">Edit FAQ section (synced with Terms page)</p>
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
            <CardDescription>Edit questions and answers (changes sync to Terms page)</CardDescription>
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
