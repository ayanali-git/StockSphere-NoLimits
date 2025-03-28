
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import AIAdvisor from "@/components/dashboard/AIAdvisor";
import MarketOverview from "@/components/dashboard/MarketOverview";
import TaxInsights from "@/components/dashboard/TaxInsights";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // In a real app, you would check if the user is authenticated
    // This is a simulated authentication for demo purposes
    const user = localStorage.getItem("user");
    
    if (user) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in to your WealthInsight dashboard.",
      });
    } else {
      setIsAuthenticated(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  return (
    <MainLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, here's an overview of your investments
          </p>
        </div>
        
        <PortfolioSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PortfolioChart />
          </div>
          <div>
            <AssetAllocation />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIAdvisor />
          </div>
          <div>
            <MarketOverview />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaxInsights />
          <div className="md:col-span-1">
            {/* Additional widget could go here */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
