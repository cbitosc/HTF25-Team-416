import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "", rememberMe: false });
    const [signupData, setSignupData] = useState({ name: "", email: "", password: "", role: "attendee", agreeToTerms: false });
    const navigate = useNavigate();
    const { toast } = useToast();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await login(loginData.email, loginData.password);

            if (result.success && result.user) {
                toast({
                    title: "Welcome back!",
                    description: `You have successfully signed in as ${result.user.role}.`,
                });

                // Redirect based on user role
                if (result.user.role === 'organizer') {
                    navigate("/dashboard");
                } else {
                    navigate("/attendee");
                }
            } else {
                toast({
                    title: "Login Failed",
                    description: result.error || "Invalid email or password. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock successful signup
            toast({
                title: "Account created!",
                description: "Welcome to EventHub. Please check your email to verify your account.",
            });

            // Navigate to login tab
            // In a real app, you'd redirect to email verification
            navigate("/auth");
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(220_100%_60%)] flex items-center justify-center shadow-[var(--shadow-elegant)] group-hover:scale-110 transition-transform">
                        <Calendar className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-[hsl(220_100%_60%)] bg-clip-text text-transparent">
                        EventHub
                    </span>
                </Link>

                <Card className="p-8 shadow-[var(--shadow-card)]">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="login">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        {/* Login Tab */}
                        <TabsContent value="login">
                            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Demo Accounts:</h3>
                                <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                    <div><strong>Organizer:</strong> org@gmail.com / 123</div>
                                    <div><strong>Attendee:</strong> attendee@example.com / 123</div>
                                </div>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email" className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary" />
                                        Email
                                    </Label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-password" className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-primary" />
                                        Password
                                    </Label>
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={loginData.rememberMe}
                                            onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                                            className="rounded border-border"
                                        />
                                        <span className="text-muted-foreground">Remember me</span>
                                    </label>
                                    <Link to="#" className="text-primary hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    variant="gradient"
                                    size="lg"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Google
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Signup Tab */}
                        <TabsContent value="signup">
                            <form onSubmit={handleSignup} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-name" className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-primary" />
                                        Full Name
                                    </Label>
                                    <Input
                                        id="signup-name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={signupData.name}
                                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary" />
                                        Email
                                    </Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={signupData.email}
                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-password" className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-primary" />
                                        Password
                                    </Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={signupData.password}
                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Account Type</Label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="attendee"
                                                checked={signupData.role === "attendee"}
                                                onChange={(e) => setSignupData({ ...signupData, role: e.target.value as "attendee" | "organizer" })}
                                                className="text-primary"
                                            />
                                            <span>Attendee</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="organizer"
                                                checked={signupData.role === "organizer"}
                                                onChange={(e) => setSignupData({ ...signupData, role: e.target.value as "attendee" | "organizer" })}
                                                className="text-primary"
                                            />
                                            <span>Organizer</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-start gap-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            checked={signupData.agreeToTerms}
                                            onChange={(e) => setSignupData({ ...signupData, agreeToTerms: e.target.checked })}
                                            required
                                            className="rounded border-border mt-1"
                                        />
                                        <span className="text-muted-foreground">
                                            I agree to the{" "}
                                            <Link to="#" className="text-primary hover:underline">
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link to="#" className="text-primary hover:underline">
                                                Privacy Policy
                                            </Link>
                                        </span>
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    variant="gradient"
                                    size="lg"
                                    className="w-full"
                                    disabled={isLoading || !signupData.agreeToTerms}
                                >
                                    {isLoading ? "Creating account..." : "Create Account"}
                                </Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Google
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </Card>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Protected by reCAPTCHA and subject to the Google{" "}
                    <Link to="#" className="text-primary hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Auth;
