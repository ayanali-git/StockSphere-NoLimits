
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

// Sample data for asset allocation
const data = [
  { name: "Stocks", value: 60, color: "hsl(221, 83%, 53%)" },
  { name: "Bonds", value: 15, color: "hsl(142, 76%, 36%)" },
  { name: "Cash", value: 10, color: "hsl(31, 77%, 52%)" },
  { name: "Real Estate", value: 8, color: "hsl(339, 90%, 51%)" },
  { name: "Crypto", value: 7, color: "hsl(262, 80%, 50%)" },
];

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-md">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-foreground font-semibold">
          {`${payload[0].value}%`}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: entry.color }} 
          />
          <span className="text-sm text-muted-foreground">{entry.name}</span>
          <span className="text-sm font-medium ml-1">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
};

const AssetAllocation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Breakdown of your portfolio by asset class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CustomLegend />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AssetAllocation;
