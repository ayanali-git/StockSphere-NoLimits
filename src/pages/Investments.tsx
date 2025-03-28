
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";

const Investments = () => {
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
              <BreadcrumbLink href="/investments">Investments</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Investments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your investment portfolio and track performance
          </p>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Investments</TabsTrigger>
            <TabsTrigger value="history">Investment History</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Stocks</CardTitle>
                    <CardDescription>U.S. and international equities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$135,842.50</div>
                    <div className="text-sm text-muted-foreground mt-1">18 positions</div>
                    <div className="text-sm text-green-500 font-medium mt-2">+$12,546.38 (10.2%)</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">ETFs</CardTitle>
                    <CardDescription>Index and sector funds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$85,420.75</div>
                    <div className="text-sm text-muted-foreground mt-1">7 positions</div>
                    <div className="text-sm text-green-500 font-medium mt-2">+$6,842.25 (8.7%)</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Fixed Income</CardTitle>
                    <CardDescription>Bonds and treasuries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$42,350.00</div>
                    <div className="text-sm text-muted-foreground mt-1">4 positions</div>
                    <div className="text-sm text-blue-500 font-medium mt-2">+$1,268.50 (3.1%)</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest investment activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Symbol</th>
                          <th className="text-left py-3 px-2">Type</th>
                          <th className="text-left py-3 px-2">Shares</th>
                          <th className="text-left py-3 px-2">Price</th>
                          <th className="text-left py-3 px-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-2">03/15/2025</td>
                          <td className="py-3 px-2">AAPL</td>
                          <td className="py-3 px-2">Buy</td>
                          <td className="py-3 px-2">5</td>
                          <td className="py-3 px-2">$182.50</td>
                          <td className="py-3 px-2">$912.50</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2">03/10/2025</td>
                          <td className="py-3 px-2">MSFT</td>
                          <td className="py-3 px-2">Buy</td>
                          <td className="py-3 px-2">2</td>
                          <td className="py-3 px-2">$415.27</td>
                          <td className="py-3 px-2">$830.54</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2">03/05/2025</td>
                          <td className="py-3 px-2">TSLA</td>
                          <td className="py-3 px-2">Sell</td>
                          <td className="py-3 px-2">3</td>
                          <td className="py-3 px-2">$177.83</td>
                          <td className="py-3 px-2">$533.49</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2">02/28/2025</td>
                          <td className="py-3 px-2">VOO</td>
                          <td className="py-3 px-2">Buy</td>
                          <td className="py-3 px-2">2</td>
                          <td className="py-3 px-2">$485.63</td>
                          <td className="py-3 px-2">$971.26</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment History</CardTitle>
                <CardDescription>Past investment activity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your complete investment history will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="watchlist" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Watchlist</CardTitle>
                <CardDescription>Assets you're monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Assets you're watching will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Investments;
