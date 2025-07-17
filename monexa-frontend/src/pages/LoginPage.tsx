import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Sun, Moon, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {useAuth} from "@/context/UseAuth.ts";

export default function LoginPage() {
    const { login, loading } = useAuth()
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    })

    const validateForm = () => {
        const errors: Record<string, string> = {}

        if (!formData.emailOrUsername?.trim()) {
            errors.emailOrUsername = "Username or email is required"
        }

        if (!formData.password?.trim()) {
            errors.password = "Password is required"
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Please fix the validation errors")
            return
        }

        const result = await login(formData)

        if (result.success) {
            toast.success("Account created successfully!!")
            navigate("/dashboard")
        } else {
            toast.error(result.error || "Registration failed")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header with theme toggle and back button */}
                <div className={cn("flex items-center justify-between mb-6")}>
                    <Button variant="ghost" asChild className={cn("text-muted-foreground hover:text-foreground")}>
                        <Link to="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to home
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className={cn("bg-background")}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>

                <Card className={cn("shadow-xl border-0 rounded-xl")}>
                    <CardHeader className={cn("text-center space-y-2 p-6")}>
                        <div className={cn("mx-auto w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-4")}>
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <CardTitle className={cn("text-2xl font-bold")}>Welcome back</CardTitle>
                        <CardDescription className={cn("text-muted-foreground")}>Sign in to your Monexa account</CardDescription>
                    </CardHeader>

                    <CardContent className={cn("space-y-6 p-6")}>
                        {loading ? (
                            <div className={cn("space-y-4")}>
                                <div className={cn("space-y-2")}>
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-11 w-full" />
                                </div>
                                <div className={cn("space-y-2")}>
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-11 w-full" />
                                </div>
                                <Skeleton className="h-11 w-full" />
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={cn("space-y-4")}>
                                <div className={cn("space-y-2")}>
                                    <Label htmlFor="usernameOrEmail">Username or Email</Label>
                                    <Input
                                        id="usernameOrEmail"
                                        name="usernameOrEmail"
                                        type="text"
                                        placeholder="Enter your username or email"
                                        required
                                        disabled={loading}
                                        value={formData.emailOrUsername}
                                        onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                                        className={cn("h-11", formErrors.usernameOrEmail && "border-destructive")}
                                    />
                                    {formErrors.usernameOrEmail && (
                                        <p className={cn("text-sm text-destructive")}>{formErrors.usernameOrEmail}</p>
                                    )}
                                </div>

                                <div className={cn("space-y-2")}>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            required
                                            disabled={loading}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className={cn("h-11 pr-10", formErrors.password && "border-destructive")}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className={cn("absolute right-0 top-0 h-11 w-10 hover:bg-transparent")}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    {formErrors.password && <p className={cn("text-sm text-destructive")}>{formErrors.password}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    className={cn("w-full h-11 bg-emerald-600 hover:bg-emerald-700")}
                                    disabled={loading}
                                >
                                    {loading ? "Signing in..." : "Log In"}
                                </Button>
                            </form>
                        )}

                        <div className={cn("text-center space-y-4")}>
                            <a href="#" className={cn("text-sm text-emerald-600 hover:text-emerald-700 hover:underline")}>
                                Forgot your password?
                            </a>

                            <div className={cn("text-sm text-muted-foreground")}>
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className={cn("text-emerald-600 hover:text-emerald-700 font-medium hover:underline")}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>

                        {/* Demo credentials */}
                        <div className={cn("mt-6 p-4 bg-muted rounded-lg")}>
                            <p className={cn("text-sm font-medium mb-2")}>Demo credentials:</p>
                            <p className={cn("text-xs text-muted-foreground")}>Email: demo@monexa.com</p>
                            <p className={cn("text-xs text-muted-foreground")}>Password: password123</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
