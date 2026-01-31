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
import History from "./pages/History";
import Requests from "./pages/Requests";
import UserCredentials from "./pages/UserCredentials";

// Editor Pages
import HeroEditor from "./pages/editor/HeroEditor";
import AboutEditor from "./pages/editor/AboutEditor";
import FeaturesEditor from "./pages/editor/FeaturesEditor";
import TestimonialsEditor from "./pages/editor/TestimonialsEditor";
import FAQEditor from "./pages/editor/FAQEditor";
import ContactEditor from "./pages/editor/ContactEditor";

// Team Management Pages
import AdminUsers from "./pages/team/AdminUsers";
import Agents from "./pages/team/Agents";
import SupportTeam from "./pages/team/SupportTeam";
import Moderators from "./pages/team/Moderators";

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
          <Route path="/history" element={<History />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/user-credentials" element={<UserCredentials />} />
          
          {/* Editor Routes */}
          <Route path="/editor/hero" element={<HeroEditor />} />
          <Route path="/editor/about" element={<AboutEditor />} />
          <Route path="/editor/features" element={<FeaturesEditor />} />
          <Route path="/editor/testimonials" element={<TestimonialsEditor />} />
          <Route path="/editor/faq" element={<FAQEditor />} />
          <Route path="/editor/contact" element={<ContactEditor />} />
          
          {/* Team Management Routes */}
          <Route path="/team/admins" element={<AdminUsers />} />
          <Route path="/team/agents" element={<Agents />} />
          <Route path="/team/support" element={<SupportTeam />} />
          <Route path="/team/moderators" element={<Moderators />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
