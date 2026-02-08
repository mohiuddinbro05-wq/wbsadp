import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  TrendingUp,
  Gift,
  Loader2,
  Wallet
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  payment_method: string | null;
  account_number: string | null;
  notes: string | null;
  created_at: string;
}

interface TransactionHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  deposit: { label: "ডিপোজিট", icon: ArrowDownToLine, color: "text-green-500" },
  withdraw: { label: "উইথড্র", icon: ArrowUpFromLine, color: "text-blue-500" },
  earning: { label: "ভিডিও আয়", icon: TrendingUp, color: "text-primary" },
  referral_bonus: { label: "রেফারাল বোনাস", icon: Gift, color: "text-amber-500" },
  package_purchase: { label: "প্যাকেজ কেনা", icon: Wallet, color: "text-purple-500" },
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "পেন্ডিং", variant: "secondary" },
  approved: { label: "সম্পন্ন", variant: "default" },
  rejected: { label: "বাতিল", variant: "destructive" },
};

export default function TransactionHistoryDialog({
  open,
  onOpenChange,
}: TransactionHistoryDialogProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (open) {
      fetchTransactions();
    }
  }, [open]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === "all") return true;
    if (activeTab === "income") return ["deposit", "earning", "referral_bonus"].includes(t.type);
    if (activeTab === "expense") return ["withdraw", "package_purchase"].includes(t.type);
    return true;
  });

  const totalIncome = transactions
    .filter(t => ["deposit", "earning", "referral_bonus"].includes(t.type) && t.status === "approved")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => ["withdraw", "package_purchase"].includes(t.type) && t.status === "approved")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            লেনদেনের ইতিহাস
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-2">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">মোট আয়</p>
                <p className="text-lg font-bold text-green-600">৳{totalIncome}</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">মোট ব্যয়</p>
                <p className="text-lg font-bold text-blue-600">৳{totalExpense}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">সব</TabsTrigger>
              <TabsTrigger value="income">আয়</TabsTrigger>
              <TabsTrigger value="expense">ব্যয়</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">কোনো লেনদেন নেই</p>
                </div>
              ) : (
                <ScrollArea className="h-[350px] pr-4">
                  <div className="space-y-3">
                    {filteredTransactions.map((transaction) => {
                      const config = typeConfig[transaction.type] || typeConfig.earning;
                      const status = statusConfig[transaction.status] || statusConfig.pending;
                      const Icon = config.icon;
                      const isIncome = ["deposit", "earning", "referral_bonus"].includes(transaction.type);

                      return (
                        <Card key={transaction.id} className="overflow-hidden">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl ${isIncome ? 'bg-green-500/10' : 'bg-blue-500/10'} flex items-center justify-center shrink-0`}>
                                <Icon className={`w-5 h-5 ${config.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-medium text-sm">{config.label}</span>
                                  <span className={`font-bold ${isIncome ? 'text-green-600' : 'text-blue-600'}`}>
                                    {isIncome ? '+' : '-'}৳{transaction.amount}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {format(new Date(transaction.created_at), "dd MMM yyyy, hh:mm a", { locale: bn })}
                                  </span>
                                  <Badge variant={status.variant} className="text-xs">
                                    {status.label}
                                  </Badge>
                                </div>
                                {transaction.payment_method && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {transaction.payment_method} • {transaction.account_number}
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}