
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import Investments from "./pages/Investments";
import Tax from "./pages/Tax";
import Education from "./pages/Education";
import Advisor from "./pages/Advisor";
import Settings from "./pages/Settings";
import { AuthProvider } from "./context/AuthProvider";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/market" element={<Market />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/tax" element={<Tax />} />
                <Route path="/education" element={<Education />} />
                <Route path="/advisor" element={<Advisor />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
