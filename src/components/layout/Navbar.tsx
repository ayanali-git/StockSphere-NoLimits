import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Menu,
  Search,
  User,
  ChevronDown,
  Sun,
  Moon,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userName, setUserName] = useState<string | null>("User");
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    // Get user information immediately when component mounts
    const currentUser = auth.currentUser;
    if (currentUser) {
      // If we already have a logged-in user when component mounts
      const email = currentUser.email || "";
      const displayName = currentUser.displayName;
      
      // If displayName is null, use the email username part as the displayName
      if (!displayName && email) {
        const username = email.split('@')[0];
        // Update the user's profile with this username
        updateProfile(currentUser, {
          displayName: username,
        }).then(() => {
          setUserName(username);
        }).catch((error) => {
          console.error("Error updating display name:", error);
        });
      } else {
        setUserName(displayName || "User");
      }
      
      setPhotoURL(currentUser.photoURL);
    }

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName && user.email) {
          // If user has no display name, use email username part
          const username = user.email.split('@')[0];
          // Update the user's profile
          updateProfile(user, {
            displayName: username,
          }).then(() => {
            setUserName(username);
          }).catch((error) => {
            console.error("Error updating display name:", error);
          });
        } else {
          setUserName(user.displayName || "User");
        }
        setPhotoURL(user.photoURL);
      } else {
        setUserName("User");
        setPhotoURL(null);
      }
    });

    // Listen for profile updates from other components
    const handleProfileUpdate = (event: CustomEvent) => {
      if (event.detail && event.detail.displayName) {
        setUserName(event.detail.displayName);
      }
    };

    window.addEventListener("userProfileUpdated", handleProfileUpdate as EventListener);

    return () => {
      unsubscribe();
      window.removeEventListener("userProfileUpdated", handleProfileUpdate as EventListener);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const getInitials = (name: string | null) => {
    return name
      ? name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()
      : "U";
  };

  const handleMouseEnterButton = () => {
    setShowSearch(true);
    setIsHovered(true);
  };
  
  const handleMouseLeaveButton = () => {
    setIsHovered(false);
    setTimeout(() => {
      if (!isHovered && !isInputHovered) {
        setShowSearch(false);
      }
    }, 200);
  };
  
  const handleMouseEnterInput = () => {
    setIsInputHovered(true);
  };
  
  const handleMouseLeaveInput = () => {
    setIsInputHovered(false);
    setTimeout(() => {
      if (!isHovered && !isInputHovered) {
        setShowSearch(false);
      }
    }, 200);
  };

  return (
    <header className="w-full bg-background border-b border-border h-16 flex items-center px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative" onMouseLeave={() => setShowSearch(false)}>
            <AnimatePresence mode="wait">
              {showSearch ? (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 250 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Input 
                    placeholder="Search..." 
                    className="pr-8" 
                    autoFocus 
                    onMouseEnter={handleMouseEnterInput}
                    onMouseLeave={handleMouseLeaveInput}
                  />
                  <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onMouseEnter={handleMouseEnterButton}
                    onMouseLeave={handleMouseLeaveButton}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground"
            title={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground relative"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 pr-1"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={photoURL || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex font-medium truncate max-w-[100px]">
                  {userName}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  const auth = getAuth();
                  auth.signOut().then(() => {
                    navigate("/login");
                  });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;