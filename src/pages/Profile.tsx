    import React, { useEffect, useState } from "react";
    import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { Label } from "@/components/ui/label";
    import { useToast } from "@/components/ui/use-toast";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { User, Mail, Camera, Shield, Lock } from "lucide-react";

    const Profile = () => {
    const auth = getAuth();
    const { toast } = useToast();
    
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserName(user.displayName || "User");
            setEmail(user.email || "");
            setPhotoURL(user.photoURL || "");
        }
        });
        
        return () => unsubscribe();
    }, [auth]);

    // Function to update username in Firebase
    const handleUpdateProfile = async () => {
        if (!auth.currentUser || !newUserName.trim()) return;
        
        setIsUpdating(true);
        try {
        await updateProfile(auth.currentUser, { displayName: newUserName });
        setUserName(newUserName);
        setNewUserName("");
        
        // Dispatch a custom event that Navbar can listen for
        window.dispatchEvent(new CustomEvent('userProfileUpdated', {
            detail: { displayName: newUserName }
        }));
        
        toast({
            title: "Profile Updated",
            description: "Your name has been successfully updated.",
        });
        } catch (error) {
        console.error("Error updating profile:", error);
        toast({
            title: "Error",
            description: "Failed to update profile.",
            variant: "destructive",
        });
        } finally {
        setIsUpdating(false);
        }
    };

    const getInitials = (name) => {
        return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Card className="mb-8">
            <CardHeader className="flex flex-col items-center pb-2">
            <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                <AvatarImage src={photoURL} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {getInitials(userName)}
                </AvatarFallback>
                </Avatar>
                <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full bg-background"
                >
                <Camera className="h-4 w-4" />
                </Button>
            </div>
            <CardTitle className="text-2xl">{userName}</CardTitle>
            <div className="text-muted-foreground flex items-center">
                <Mail className="h-4 w-4 mr-2" /> {email}
            </div>
            </CardHeader>
        </Card>

        <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
            <Card>
                <CardHeader>
                <CardTitle className="text-xl flex items-center">
                    <User className="mr-2 h-5 w-5" /> 
                    Personal Information
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="username">Display Name</Label>
                    <div className="flex gap-2">
                    <Input
                        id="username"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Enter new display name"
                    />
                    <Button 
                        onClick={handleUpdateProfile} 
                        disabled={isUpdating || !newUserName.trim()}
                    >
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                    This name will be visible to other users and will appear on the navigation bar.
                    </p>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                    id="email"
                    value={email}
                    disabled
                    className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">
                    Your email address is used for account recovery and notifications.
                    </p>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
            
            <TabsContent value="security">
            <Card>
                <CardHeader>
                <CardTitle className="text-xl flex items-center">
                    <Shield className="mr-2 h-5 w-5" /> 
                    Security Settings
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-2 mb-6">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex gap-2">
                    <Input
                        id="password"
                        type="password"
                        value="••••••••"
                        disabled
                        className="bg-muted"
                    />
                    <Button variant="outline">
                        Change Password
                    </Button>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Two-factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                        </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Active Sessions</h4>
                        <p className="text-sm text-muted-foreground">
                        Manage your active login sessions
                        </p>
                    </div>
                    <Button variant="outline">View</Button>
                    </div>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
            <Card>
                <CardHeader>
                <CardTitle className="text-xl flex items-center">
                    <Lock className="mr-2 h-5 w-5" /> 
                    Account Preferences
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                        Receive updates and alerts via email
                        </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Data Privacy</h4>
                        <p className="text-sm text-muted-foreground">
                        Manage your data and privacy settings
                        </p>
                    </div>
                    <Button variant="outline">Manage</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Language and Region</h4>
                        <p className="text-sm text-muted-foreground">
                        Set your preferred language and regional settings
                        </p>
                    </div>
                    <Button variant="outline">Change</Button>
                    </div>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    );
    };

    export default Profile;