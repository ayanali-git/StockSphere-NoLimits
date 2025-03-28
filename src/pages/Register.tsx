
import { motion } from "framer-motion";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">WI</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">WealthInsight</h1>
        </div>
        <p className="text-muted-foreground">
          Create an account to access your AI-powered investment dashboard
        </p>
      </motion.div>
      
      <RegisterForm />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-8 text-center text-xs text-muted-foreground"
      >
        <p>© 2023 WealthInsight. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default Register;
