import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuth } from "./context/AuthProvider"; // Import useAuth hook
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// Protected route component to check authentication
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

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
          <AuthProvider>
            <AnimatePresence mode="wait">
              <Routes>
                {/* Redirect root to signup for new users */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                
                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Protected routes */}
                <Route path="/portfolio" element={
                  <ProtectedRoute>
                    <Portfolio />
                  </ProtectedRoute>
                } />
                <Route path="/market" element={
                  <ProtectedRoute>
                    <Market />
                  </ProtectedRoute>
                } />
                <Route path="/investments" element={
                  <ProtectedRoute>
                    <Investments />
                  </ProtectedRoute>
                } />
                <Route path="/tax" element={
                  <ProtectedRoute>
                    <Tax />
                  </ProtectedRoute>
                } />
                <Route path="/education" element={
                  <ProtectedRoute>
                    <Education />
                  </ProtectedRoute>
                } />
                <Route path="/advisor" element={
                  <ProtectedRoute>
                    <Advisor />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                {/* Initial entry point for new visitors */}
                <Route path="/welcome" element={<Navigate to="/signup" replace />} />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;