
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Tax = () => {
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
              <BreadcrumbLink href="/tax">Tax Insights</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Insights</h1>
          <p className="text-muted-foreground mt-1">
            Optimize your tax strategy based on your investment portfolio
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="capital-gains">Capital Gains</TabsTrigger>
            <TabsTrigger value="tax-loss">Tax Loss Harvesting</TabsTrigger>
            <TabsTrigger value="documents">Tax Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>2025 Tax Summary</CardTitle>
                  <CardDescription>Current tax year estimate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Estimated Income</h3>
                      <p className="text-2xl font-bold mt-1">$125,780</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Capital Gains</h3>
                      <p className="text-2xl font-bold mt-1">$32,450</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Estimated Tax</h3>
                      <p className="text-2xl font-bold mt-1">$28,350</p>
                    </div>
                  </div>
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
                  <CardTitle>Tax Optimization Opportunities</CardTitle>
                  <CardDescription>Actions to potentially reduce your tax liability</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Tax Loss Harvesting</h4>
                        <p className="text-sm text-muted-foreground">Consider selling TSLA to offset gains from AAPL (potential savings: $1,200)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">IRA Contribution</h4>
                        <p className="text-sm text-muted-foreground">You can still contribute $3,500 to your IRA for this tax year (potential savings: $770)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Charitable Donations</h4>
                        <p className="text-sm text-muted-foreground">Consider donating appreciated securities instead of cash (potential savings: $2,100)</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="capital-gains" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Capital Gains</CardTitle>
                <CardDescription>Your realized and unrealized capital gains</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Detailed capital gains information will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tax-loss" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Loss Harvesting</CardTitle>
                <CardDescription>Opportunities to offset capital gains</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Tax loss harvesting opportunities will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Documents</CardTitle>
                <CardDescription>Your tax forms and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your tax documents will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Tax;
