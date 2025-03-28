
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const TaxInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tax Insights</CardTitle>
              <CardDescription>
                Estimates and optimization opportunities
              </CardDescription>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Estimated Capital Gains</span>
                <span className="text-sm font-medium">$8,432</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">Tax: ~$1,686</span>
                <span className="text-xs text-emerald-500">Potential savings: $420</span>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm">
                  You have unrealized gains that could trigger higher tax brackets.
                </p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View Full Tax Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaxInsights;
