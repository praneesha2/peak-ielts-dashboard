import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import PersonalInformation from "./pages/PersonalInformation";
import LoginSecurity from "./pages/LoginSecurity";
import NotificationsSettings from "./pages/NotificationsSettings";
import LanguagePreferences from "./pages/LanguagePreferences";
import ManageBilling from "./pages/ManageBilling";
import HelpFAQ from "./pages/HelpFAQ";
import ContactSupport from "./pages/ContactSupport";
import ReportProblem from "./pages/ReportProblem";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <main className="flex-1 p-8">
                <SidebarTrigger className="mb-4" />
                <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/personal-information" element={<PersonalInformation />} />
              <Route path="/settings/login-security" element={<LoginSecurity />} />
              <Route path="/settings/notifications" element={<NotificationsSettings />} />
              <Route path="/settings/language-preferences" element={<LanguagePreferences />} />
              <Route path="/settings/manage-billing" element={<ManageBilling />} />
              <Route path="/settings/help-faq" element={<HelpFAQ />} />
              <Route path="/settings/contact-support" element={<ContactSupport />} />
              <Route path="/settings/report-problem" element={<ReportProblem />} />
              <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
