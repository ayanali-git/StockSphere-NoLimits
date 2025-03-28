
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Education = () => {
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
              <BreadcrumbLink href="/education">Education</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Education</h1>
          <p className="text-muted-foreground mt-1">
            Learn about investing, financial planning, and wealth management
          </p>
        </div>

        <Tabs defaultValue="basics">
          <TabsList>
            <TabsTrigger value="basics">Investing Basics</TabsTrigger>
            <TabsTrigger value="strategies">Investment Strategies</TabsTrigger>
            <TabsTrigger value="planning">Financial Planning</TabsTrigger>
            <TabsTrigger value="library">Resource Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="mt-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Featured Course</CardTitle>
                  <CardDescription>Start your investment journey here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 aspect-video bg-muted rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-xl font-semibold">Investment Fundamentals</h3>
                      <p className="text-muted-foreground mt-2">Learn the core principles of investing, asset classes, and building a diversified portfolio. Perfect for beginners.</p>
                      <div className="flex items-center mt-4 text-sm">
                        <span className="text-muted-foreground">12 Lessons</span>
                        <span className="mx-2">•</span>
                        <span className="text-muted-foreground">3 hours</span>
                        <span className="mx-2">•</span>
                        <span className="text-primary font-medium">Free</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Understanding Stocks</CardTitle>
                    <CardDescription>Equity investments explained</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">Learn the basics of stock investing, company valuations, and how the stock market works.</p>
                    <div className="flex items-center mt-4 text-xs">
                      <span className="text-muted-foreground">8 Lessons</span>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground">1.5 hours</span>
                    </div>
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
                    <CardTitle className="text-lg">Bond Basics</CardTitle>
                    <CardDescription>Fixed income investments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">Understand bonds, interest rates, yield curves, and the role of fixed income in your portfolio.</p>
                    <div className="flex items-center mt-4 text-xs">
                      <span className="text-muted-foreground">6 Lessons</span>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground">1 hour</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">ETFs and Mutual Funds</CardTitle>
                    <CardDescription>Diversified investment vehicles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">Explore the benefits of ETFs and mutual funds, and how they can help build a diversified portfolio.</p>
                    <div className="flex items-center mt-4 text-xs">
                      <span className="text-muted-foreground">7 Lessons</span>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground">1.2 hours</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="strategies" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Strategies</CardTitle>
                <CardDescription>Advanced investment approaches and methodologies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Investment strategy content will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="planning" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Planning</CardTitle>
                <CardDescription>Long-term financial planning resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Financial planning content will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="library" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Library</CardTitle>
                <CardDescription>Articles, videos, and guides</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Resource library content will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Education;
