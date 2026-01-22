import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Withdrawals from "./pages/Withdrawals";
import Deposits from "./pages/Deposits";
import UsersPage from "./pages/Users";
import Referrals from "./pages/Referrals";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Videos from "./pages/Videos";
import Subscription from "./pages/Subscription";
import PaymentMethods from "./pages/PaymentMethods";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/withdrawals" element={<Withdrawals />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
