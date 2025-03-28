
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: React.ReactNode;
  delay: number;
}

const StatsCard = ({ title, value, description, trend, trendValue, icon, delay }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "flex items-center text-xs font-medium",
                trend === "up" && "text-emerald-500",
                trend === "down" && "text-rose-500",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trend === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
              {trend === "down" && <TrendingDown className="mr-1 h-3 w-3" />}
              {trendValue}
            </span>
            <CardDescription className="text-xs ml-2">
              {description}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PortfolioSummary = () => {
  const stats = [
    {
      title: "Total Portfolio Value",
      value: "$247,892.04",
      description: "since last month",
      trend: "up" as const,
      trendValue: "+5.25%",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Total Return",
      value: "$32,418.75",
      description: "all time",
      trend: "up" as const,
      trendValue: "+15.08%",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Daily Change",
      value: "$1,243.10",
      description: "today",
      trend: "down" as const,
      trendValue: "-0.5%",
      icon: <TrendingDown className="h-4 w-4" />,
    },
    {
      title: "Dividend Yield",
      value: "2.4%",
      description: "annual",
      trend: "neutral" as const,
      trendValue: "0.1%",
      icon: <Percent className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} delay={index} />
      ))}
    </div>
  );
};

export default PortfolioSummary;
