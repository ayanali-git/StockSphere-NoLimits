import { useState } from "react";
import { 
  Sparkles, 
  Brain, 
  ArrowRight, 
  Briefcase, 
  PiggyBank,
  HelpCircle, 
  TrendingUp, 
  Calculator, 
  ScrollText, 
  Leaf,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import  AIAdvisor  from "@/components/dashboard/AIAdvisor";
import MainLayout from "../components/layout/MainLayout";

const advisorCategories = [
  {
    id: "investment",
    name: "Investment Strategy",
    icon: <Briefcase className="h-5 w-5" />,
    description: "Get personalized advice on portfolio allocation and investment strategies based on your goals",
  },
  {
    id: "retirement",
    name: "Retirement Planning",
    icon: <PiggyBank className="h-5 w-5" />,
    description: "Plan your ideal retirement with AI-powered forecasting and recommendations",
  },
  {
    id: "taxes",
    name: "Tax Optimization",
    icon: <Calculator className="h-5 w-5" />,
    description: "Minimize your tax liability with strategies tailored to your investment activities",
  },
  {
    id: "risk",
    name: "Risk Analysis",
    icon: <TrendingUp className="h-5 w-5" />,
    description: "Understand and manage the risks in your portfolio with AI analysis",
  },
  {
    id: "esg",
    name: "ESG Investing",
    icon: <Leaf className="h-5 w-5" />,
    description: "Discover environmental, social, and governance-focused investment opportunities",
  },
  {
    id: "regulations",
    name: "Regulatory Guidance",
    icon: <ScrollText className="h-5 w-5" />,
    description: "Stay compliant with the latest financial regulations affecting your investments",
  },
];

const Advisor = () => {
  const [selectedCategory, setSelectedCategory] = useState("investment");

  return (
    <MainLayout>
      <div className="animate-fade-in space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" />
            AI Investment Advisor
          </h2>
          <p className="text-muted-foreground mt-1">
            Get personalized financial advice powered by advanced AI
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="topics" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Advisor Topics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 h-[600px]">
                <AIAdvisor className="h-full" />
              </div>

              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium">Help & Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <HelpCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">How it works</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Our AI advisor uses market data and financial principles to provide personalized guidance.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <TrendingUp className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Regulatory Compliance</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            All advice is compliant with current regulatory standards and is regularly updated.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Sparkles className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">AI Limitations</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Our AI provides guidance, but it's not a substitute for professional financial advice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {advisorCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`overflow-hidden cursor-pointer transition-colors hover:bg-accent ${
                    selectedCategory === category.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        {category.icon}
                      </div>
                      {selectedCategory === category.id && (
                        <Button variant="default" size="sm" className="ml-auto">
                          Selected
                        </Button>
                      )}
                    </div>
                    <CardTitle className="text-base font-medium mt-3">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            
            <Card className="mt-6 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {advisorCategories.find(c => c.id === selectedCategory)?.name} Advisor
                </CardTitle>
                <CardDescription>
                  Get personalized {selectedCategory} advice based on your financial situation
                </CardDescription>
              </CardHeader>
              <Separator />
              <AIAdvisor className="border-none shadow-none" />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Advisor;