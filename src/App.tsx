import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Pages
import LandingPage from "./pages/user/LandingPage";
import UserLogin from "./pages/user/UserLogin";
import Register from "./pages/user/Register";
import UserDashboard from "./pages/user/UserDashboard";

// Admin Pages
import AdminDashboard from "./pages/Index";
import AdminLogin from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
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
import Terms from "./pages/Terms";
import Salary from "./pages/Salary";

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
          {/* User Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/withdrawals" element={<Withdrawals />} />
          <Route path="/admin/deposits" element={<Deposits />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/referrals" element={<Referrals />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/videos" element={<Videos />} />
          <Route path="/admin/subscription" element={<Subscription />} />
          <Route path="/admin/payment-methods" element={<PaymentMethods />} />
          <Route path="/admin/history" element={<History />} />
          <Route path="/admin/requests" element={<Requests />} />
          <Route path="/admin/user-credentials" element={<UserCredentials />} />
          <Route path="/admin/terms" element={<Terms />} />
          <Route path="/admin/salary" element={<Salary />} />
          
          {/* Editor Routes */}
          <Route path="/admin/editor/hero" element={<HeroEditor />} />
          <Route path="/admin/editor/about" element={<AboutEditor />} />
          <Route path="/admin/editor/features" element={<FeaturesEditor />} />
          <Route path="/admin/editor/testimonials" element={<TestimonialsEditor />} />
          <Route path="/admin/editor/faq" element={<FAQEditor />} />
          <Route path="/admin/editor/contact" element={<ContactEditor />} />
          
          {/* Team Management Routes */}
          <Route path="/admin/team/admins" element={<AdminUsers />} />
          <Route path="/admin/team/agents" element={<Agents />} />
          <Route path="/admin/team/support" element={<SupportTeam />} />
          <Route path="/admin/team/moderators" element={<Moderators />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
