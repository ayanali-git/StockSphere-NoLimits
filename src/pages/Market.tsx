
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";

const marketData = [
  { date: "Jan", value: 15000 },
  { date: "Feb", value: 15200 },
  { date: "Mar", value: 14800 },
  { date: "Apr", value: 16000 },
  { date: "May", value: 16500 },
  { date: "Jun", value: 17000 },
  { date: "Jul", value: 16800 },
];

const sectorData = [
  { name: "Technology", value: 28 },
  { name: "Healthcare", value: 17 },
  { name: "Consumer", value: 15 },
  { name: "Finance", value: 12 },
  { name: "Energy", value: 10 },
  { name: "Industry", value: 8 },
  { name: "Others", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658"];

const Market = () => {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/market">Market Data</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
          <p className="text-muted-foreground mt-1">
            Stay informed with real-time market trends and analyses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="col-span-1 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Market Performance</CardTitle>
                <CardDescription>S&P 500 Index performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="6m">
                  <TabsList className="mb-4">
                    <TabsTrigger value="1m">1M</TabsTrigger>
                    <TabsTrigger value="3m">3M</TabsTrigger>
                    <TabsTrigger value="6m">6M</TabsTrigger>
                    <TabsTrigger value="1y">1Y</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={marketData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sector Breakdown</CardTitle>
                <CardDescription>Market distribution by sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Best performing assets in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Symbol</th>
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Sector</th>
                      <th className="text-left py-3 px-2">Price</th>
                      <th className="text-left py-3 px-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2">NVDA</td>
                      <td className="py-3 px-2">NVIDIA Corporation</td>
                      <td className="py-3 px-2">Technology</td>
                      <td className="py-3 px-2">$880.53</td>
                      <td className="py-3 px-2 text-green-500">+22.8%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">AMD</td>
                      <td className="py-3 px-2">Advanced Micro Devices, Inc.</td>
                      <td className="py-3 px-2">Technology</td>
                      <td className="py-3 px-2">$155.42</td>
                      <td className="py-3 px-2 text-green-500">+18.3%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">GOOG</td>
                      <td className="py-3 px-2">Alphabet Inc.</td>
                      <td className="py-3 px-2">Technology</td>
                      <td className="py-3 px-2">$175.98</td>
                      <td className="py-3 px-2 text-green-500">+15.2%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">META</td>
                      <td className="py-3 px-2">Meta Platforms, Inc.</td>
                      <td className="py-3 px-2">Technology</td>
                      <td className="py-3 px-2">$510.92</td>
                      <td className="py-3 px-2 text-green-500">+13.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Market;
