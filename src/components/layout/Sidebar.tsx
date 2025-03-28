import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  LineChart, 
  BarChart4, 
  PieChart, 
  Wallet, 
  FileText, 
  BookOpen,
  LightbulbIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Route
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  isOpen: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, href, isActive, isOpen, onClick }: SidebarItemProps) => {
  return (
    <Link to={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-all duration-200 group",
          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <div className="flex items-center justify-center w-5 h-5">
          {icon}
        </div>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-medium"
          >
            {label}
          </motion.span>
        )}
        {!isOpen && (
          <div className="fixed z-50 left-16 ml-1 p-2 rounded-md bg-popover shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
            {label}
          </div>
        )}
      </div>
    </Link>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const sidebarItems = [
    { icon: <Home size={16} />, label: "Dashboard", href: "/" },
    { icon: <LineChart size={16} />, label: "Portfolio", href: "/portfolio" },
    { icon: <BarChart4 size={16} />, label: "Market Data", href: "/market" },
    { icon: <Wallet size={16} />, label: "Investments", href: "/investments" },
    { icon: <FileText size={16} />, label: "Tax Insights", href: "/tax" },
    { icon: <BookOpen size={16} />, label: "Education", href: "/education" },
    { icon: <LightbulbIcon size={16} />, label: "AI Advisor", href: "/advisor" },
  ];

  // Close sidebar on mobile when navigating to a new page
  const handleItemClick = () => {
    if (isMobile && isOpen) {
      toggleSidebar();
    }
  };

  const variants = {
    open: { 
      width: isMobile ? '100%' : 240,
      transition: { duration: 0.3 }
    },
    closed: { 
      width: isMobile ? 0 : 56,
      transition: { duration: 0.3 }
    }
  };

  // Determine if sidebar should be fixed or absolute based on screen size
  const sidebarClassName = cn(
    "h-screen border-r border-border bg-card",
    isMobile ? "fixed top-0 left-0 z-30" : "relative",
    !isOpen && isMobile ? "w-0" : ""
  );

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
        />
      )}
      
      <motion.div
        variants={variants}
        animate={isOpen ? "open" : "closed"}
        className={sidebarClassName}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-3 border-b border-border">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs md:text-sm">SS</span>
              </div>
              <span className="font-semibold tracking-tight text-sm md:text-base">StockSphere</span>
              </Link>
              
            </motion.div>
          )}
          
          {/* Close button for mobile view */}
          {isMobile && isOpen && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Close sidebar">
              <X className="h-5 w-5" />
            </Button>
          )}
          
          {/* Show logo only without text when closed on desktop */}
          {!isOpen && !isMobile && (
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-primary flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold text-xs md:text-sm">WI</span>
            </div>
          )}
        </div>
        
        <div className={cn("py-4", isOpen ? "px-3" : "px-2")}>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={location.pathname === item.href}
                isOpen={isOpen}
                onClick={handleItemClick}
              />
            ))}
          </nav>
          
          <div className="absolute bottom-4 w-full left-0 px-3">
            <div className="pt-4 border-t border-border mt-4">
              <SidebarItem
                icon={<Settings size={16} />}
                label="Settings"
                href="/settings"
                isActive={location.pathname === "/settings"}
                isOpen={isOpen}
                onClick={handleItemClick}
              />
            </div>
          </div>
        </div>
        
        {/* Toggle button for desktop only */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute -right-3 top-20 bg-background border border-border rounded-full w-6 h-6 flex items-center justify-center"
          >
            {isOpen ? (
              <ChevronLeft className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        )}
      </motion.div>
    </>
  );
};

export default Sidebar;