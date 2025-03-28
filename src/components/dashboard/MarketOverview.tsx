
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketIndexProps {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

const marketIndices: MarketIndexProps[] = [
  {
    name: "S&P 500",
    value: "4,232.54",
    change: "+0.85%",
    trend: "up",
  },
  {
    name: "NASDAQ",
    value: "14,367.92",
    change: "+1.24%",
    trend: "up",
  },
  {
    name: "DOW JONES",
    value: "33,876.43",
    change: "+0.42%",
    trend: "up",
  },
  {
    name: "RUSSELL 2000",
    value: "2,114.78",
    change: "-0.35%",
    trend: "down",
  },
];

const MarketOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle>Market Overview</CardTitle>
          <CardDescription>
            Current state of major market indices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketIndices.map((index, i) => (
              <div key={index.name} className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{index.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{index.value}</span>
                  <span
                    className={cn(
                      "flex items-center text-xs font-medium rounded-full px-2 py-0.5",
                      index.trend === "up" 
                        ? "text-emerald-500 bg-emerald-500/10" 
                        : "text-rose-500 bg-rose-500/10"
                    )}
                  >
                    {index.trend === "up" ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {index.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketOverview;
