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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Smartphone, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentAccount {
  id: string;
  provider: string;
  account_number: string;
  account_name: string | null;
  is_primary: boolean;
}

interface PaymentAccountsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const providers = [
  { value: "bkash", label: "বিকাশ", color: "bg-pink-500" },
  { value: "nagad", label: "নগদ", color: "bg-orange-500" },
  { value: "rocket", label: "রকেট", color: "bg-purple-500" },
];

export default function PaymentAccountsDialog({
  open,
  onOpenChange,
}: PaymentAccountsDialogProps) {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<PaymentAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newProvider, setNewProvider] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  const maxAccounts = 2;

  useEffect(() => {
    if (open) {
      fetchAccounts();
    }
  }, [open]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_payment_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setAccounts(data || []);
    } catch (err) {
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async () => {
    if (!newProvider || !newNumber) {
      toast({
        title: "ত্রুটি",
        description: "পেমেন্ট মেথড এবং নম্বর দিন",
        variant: "destructive"
      });
      return;
    }

    if (newNumber.length !== 11) {
      toast({
        title: "ত্রুটি",
        description: "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_payment_accounts')
        .insert({
          user_id: user.id,
          provider: newProvider,
          account_number: newNumber,
          account_name: newName || null,
          is_primary: accounts.length === 0
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "ত্রুটি",
            description: "এই নম্বরটি ইতিমধ্যে যোগ করা হয়েছে",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "সফল! ✓",
        description: "পেমেন্ট অ্যাকাউন্ট যোগ করা হয়েছে",
      });

      setNewProvider("");
      setNewNumber("");
      setNewName("");
      setShowAddForm(false);
      fetchAccounts();
    } catch (err) {
      console.error('Error adding account:', err);
      toast({
        title: "ত্রুটি",
        description: "অ্যাকাউন্ট যোগ করতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getProviderInfo = (provider: string) => {
    return providers.find(p => p.value === provider) || { label: provider, color: "bg-gray-500" };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            পেমেন্ট অ্যাকাউন্ট
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Existing Accounts */}
              {accounts.length > 0 && (
                <div className="space-y-3">
                  {accounts.map((account) => {
                    const providerInfo = getProviderInfo(account.provider);
                    return (
                      <Card key={account.id} className="border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${providerInfo.color} flex items-center justify-center`}>
                              <Smartphone className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{providerInfo.label}</span>
                                {account.is_primary && (
                                  <Badge variant="secondary" className="text-xs">প্রাইমারি</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{account.account_number}</p>
                              {account.account_name && (
                                <p className="text-xs text-muted-foreground">{account.account_name}</p>
                              )}
                            </div>
                            <CheckCircle className="w-5 h-5 text-primary" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Add Account Form */}
              {accounts.length < maxAccounts && (
                <>
                  {showAddForm ? (
                    <Card className="border-dashed">
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>পেমেন্ট মেথড</Label>
                          <Select value={newProvider} onValueChange={setNewProvider}>
                            <SelectTrigger>
                              <SelectValue placeholder="নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              {providers.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                  {p.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>মোবাইল নম্বর</Label>
                          <Input
                            type="tel"
                            placeholder="01XXXXXXXXX"
                            value={newNumber}
                            onChange={(e) => setNewNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>অ্যাকাউন্ট হোল্ডারের নাম (ঐচ্ছিক)</Label>
                          <Input
                            placeholder="আপনার নাম"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowAddForm(false)}
                          >
                            বাতিল
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={handleAddAccount}
                            disabled={saving}
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "যোগ করুন"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full h-14 border-dashed"
                      onClick={() => setShowAddForm(true)}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      নতুন অ্যাকাউন্ট যোগ করুন ({accounts.length}/{maxAccounts})
                    </Button>
                  )}
                </>
              )}

              {/* Info */}
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  সর্বোচ্চ ২টি পেমেন্ট অ্যাকাউন্ট যোগ করতে পারবেন। একবার যোগ করলে শুধুমাত্র এডমিন ডিলেট করতে পারবে।
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
