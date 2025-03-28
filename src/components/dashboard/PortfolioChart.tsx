
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

// Sample data for charts
const dailyData = [
  { date: "9:30 AM", value: 232340 },
  { date: "10:30 AM", value: 232586 },
  { date: "11:30 AM", value: 233085 },
  { date: "12:30 PM", value: 233950 },
  { date: "1:30 PM", value: 233560 },
  { date: "2:30 PM", value: 233825 },
  { date: "3:30 PM", value: 234001 },
  { date: "4:00 PM", value: 234892 },
];

const weeklyData = [
  { date: "Mon", value: 228450 },
  { date: "Tue", value: 230250 },
  { date: "Wed", value: 229800 },
  { date: "Thu", value: 231500 },
  { date: "Fri", value: 234892 },
];

const monthlyData = [
  { date: "May 1", value: 220120 },
  { date: "May 8", value: 223450 },
  { date: "May 15", value: 225800 },
  { date: "May 22", value: 228300 },
  { date: "May 29", value: 234892 },
];

const yearlyData = [
  { date: "Jun", value: 180250 },
  { date: "Jul", value: 185400 },
  { date: "Aug", value: 190200 },
  { date: "Sep", value: 195800 },
  { date: "Oct", value: 205450 },
  { date: "Nov", value: 210350 },
  { date: "Dec", value: 215600 },
  { date: "Jan", value: 218900 },
  { date: "Feb", value: 223100 },
  { date: "Mar", value: 228400 },
  { date: "Apr", value: 231300 },
  { date: "May", value: 234892 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-md">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-primary font-semibold text-base">
          {formatCurrency(payload[0].value as number)}
        </p>
      </div>
    );
  }
  return null;
};

const PortfolioChart = () => {
  const [timeframe, setTimeframe] = useState("day");
  
  const chartData = {
    day: dailyData,
    week: weeklyData,
    month: monthlyData,
    year: yearlyData,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Track the growth of your investments</CardDescription>
            </div>
            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-fit">
              <TabsList className="grid grid-cols-4 w-fit">
                <TabsTrigger value="day">1D</TabsTrigger>
                <TabsTrigger value="week">1W</TabsTrigger>
                <TabsTrigger value="month">1M</TabsTrigger>
                <TabsTrigger value="year">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData[timeframe as keyof typeof chartData]}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid  strokeDasharray="0 0" vertical={false} stroke="#444" />
                <XAxis
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  stroke="#ffffff"
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis 
                  domain={['dataMin - 10000', 'dataMax + 10000']}
                  axisLine={false} 
                  tickLine={false} 
                  stroke="#ffffff"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "var(--background)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioChart;
