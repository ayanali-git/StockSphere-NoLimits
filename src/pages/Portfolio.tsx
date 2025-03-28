
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";

const portfolioData = [
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 12000 },
  { date: "Mar", value: 9800 },
  { date: "Apr", value: 13000 },
  { date: "May", value: 15000 },
  { date: "Jun", value: 14500 },
  { date: "Jul", value: 18000 },
];

const allocationData = [
  { name: "Stocks", value: 60 },
  { name: "Bonds", value: 15 },
  { name: "Cash", value: 10 },
  { name: "Real Estate", value: 10 },
  { name: "Crypto", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Portfolio = () => {
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
              <BreadcrumbLink href="/portfolio">Portfolio</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
          <p className="text-muted-foreground mt-1">
            Track your investment performance and asset allocation
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
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Track your portfolio's growth over time</CardDescription>
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
                      <LineChart data={portfolioData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
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
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current distribution of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
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
              <CardTitle>Holdings</CardTitle>
              <CardDescription>Your current investment positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Asset</th>
                      <th className="text-left py-3 px-2">Quantity</th>
                      <th className="text-left py-3 px-2">Price</th>
                      <th className="text-left py-3 px-2">Value</th>
                      <th className="text-left py-3 px-2">Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2">AAPL</td>
                      <td className="py-3 px-2">10</td>
                      <td className="py-3 px-2">$182.50</td>
                      <td className="py-3 px-2">$1,825.00</td>
                      <td className="py-3 px-2 text-green-500">+15.3%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">MSFT</td>
                      <td className="py-3 px-2">5</td>
                      <td className="py-3 px-2">$415.27</td>
                      <td className="py-3 px-2">$2,076.35</td>
                      <td className="py-3 px-2 text-green-500">+22.7%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">TSLA</td>
                      <td className="py-3 px-2">8</td>
                      <td className="py-3 px-2">$177.83</td>
                      <td className="py-3 px-2">$1,422.64</td>
                      <td className="py-3 px-2 text-red-500">-5.2%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">AMZN</td>
                      <td className="py-3 px-2">3</td>
                      <td className="py-3 px-2">$178.87</td>
                      <td className="py-3 px-2">$536.61</td>
                      <td className="py-3 px-2 text-green-500">+18.9%</td>
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

export default Portfolio;
