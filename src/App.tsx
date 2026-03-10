import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import HousingGuide from "./pages/HousingGuide";
import FoodGuide from "./pages/FoodGuide";
import CampusLife from "./pages/CampusLife";
import TransportGuide from "./pages/TransportGuide";
import Auth from "./pages/Auth";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";
import FloatingChat from "./components/FloatingChat";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/housing" element={<HousingGuide />} />
            <Route path="/food" element={<FoodGuide />} />
            <Route path="/campus" element={<CampusLife />} />
            <Route path="/transport" element={<TransportGuide />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingChat />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
