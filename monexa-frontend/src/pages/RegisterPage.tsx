import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Sun, Moon, Eye, EyeOff, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {useAuth} from "@/context/UseAuth.ts";

interface FormErrors {
    email?: string
    phoneNumber?: string
    userName?: string
    firstName?: string
    lastName?: string
    password?: string
    confirmPassword?: string
}

export default function RegisterPage() {
    const {register, loading} = useAuth();
    const { theme, setTheme } = useTheme()
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const [formData, setFormData] = useState({
        email: "",
        phoneNumber: "",
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    })

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhoneNumber = (phone: string): boolean => {
        const phoneRegex = /^[+]?[1-9]\d{0,15}$/
        return phoneRegex.test(phone.replace(/[\s\-()]/g, ""))
    }

    const validateForm = (): boolean => {
        const errors: FormErrors = {}

        // Email validation
        if (!formData.email?.trim()) {
            errors.email = "Email is required"
        } else if (!validateEmail(formData.email)) {
            errors.email = "Please enter a valid email address"
        }

        // Phone number validation
        if (!formData.phoneNumber?.trim()) {
            errors.phoneNumber = "Phone number is required"
        } else if (!validatePhoneNumber(formData.phoneNumber)) {
            errors.phoneNumber = "Please enter a valid phone number"
        }

        // Username validation
        if (!formData.userName?.trim()) {
            errors.userName = "Username is required"
        } else if (formData.userName.length < 3) {
            errors.userName = "Username must be at least 3 characters long"
        }

        // First name validation
        if (!formData.firstName?.trim()) {
            errors.firstName = "First name is required"
        }

        // Last name validation
        if (!formData.lastName?.trim()) {
            errors.lastName = "Last name is required"
        }

        // Password validation
        if (!formData.password?.trim()) {
            errors.password = "Password is required"
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long"
        }

        // Confirm password validation
        if (!formData.confirmPassword?.trim()) {
            errors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
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


        const result = await register(formData)

        if (result.success) {
            toast.success(result.message || "Account created successfully!!")
            setSuccess(true)
        } else {
            toast.error(result.errors || "Registration failed")
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Card className={cn("shadow-xl border-0 rounded-xl")}>
                        <CardContent className={cn("text-center py-12 p-6")}>
                            <CheckCircle className={cn("w-16 h-16 text-emerald-600 mx-auto mb-4")} />
                            <h2 className={cn("text-2xl font-bold mb-2")}>Account Created!</h2>
                            <p className={cn("text-muted-foreground mb-6")}>
                                Account created successfully! Please log in with your credentials.
                            </p>
                            <Button asChild className={cn("bg-emerald-600 hover:bg-emerald-700")}>
                                <Link to="/login">Go to Login</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
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
                        <CardTitle className={cn("text-2xl font-bold")}>Create your account</CardTitle>
                        <CardDescription className={cn("text-muted-foreground")}>
                            Join thousands of users managing their finances with Monexa
                        </CardDescription>
                    </CardHeader>

                    <CardContent className={cn("space-y-6 p-6")}>
                        {loading ? (
                            <div className={cn("space-y-4")}>
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className={cn("space-y-2")}>
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-11 w-full" />
                                    </div>
                                ))}
                                <Skeleton className="h-11 w-full" />
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={cn("space-y-4")}>
                                {/* Email */}
                                <div className={cn("space-y-2")}>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        disabled={loading}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={cn("h-11", formErrors.email && "border-destructive")}
                                    />
                                    {formErrors.email && <p className={cn("text-sm text-destructive")}>{formErrors.email}</p>}
                                </div>

                                {/* Phone Number */}
                                <div className={cn("space-y-2")}>
                                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        required
                                        disabled={loading}
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className={cn("h-11", formErrors.phoneNumber && "border-destructive")}
                                    />
                                    {formErrors.phoneNumber && <p className={cn("text-sm text-destructive")}>{formErrors.phoneNumber}</p>}
                                </div>

                                {/* Username */}
                                <div className={cn("space-y-2")}>
                                    <Label htmlFor="userName">Username *</Label>
                                    <Input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        placeholder="Choose a username"
                                        required
                                        disabled={loading}
                                        value={formData.userName}
                                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                        className={cn("h-11", formErrors.userName && "border-destructive")}
                                    />
                                    {formErrors.userName && <p className={cn("text-sm text-destructive")}>{formErrors.userName}</p>}
                                    <p className={cn("text-xs text-muted-foreground")}>Must be at least 3 characters long</p>
                                </div>

                                {/* First Name and Last Name */}
                                <div className={cn("grid grid-cols-2 gap-4")}>
                                    <div className={cn("space-y-2")}>
                                        <Label htmlFor="firstName">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="First name"
                                            required
                                            disabled={loading}
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className={cn("h-11", formErrors.firstName && "border-destructive")}
                                        />
                                        {formErrors.firstName && <p className={cn("text-sm text-destructive")}>{formErrors.firstName}</p>}
                                    </div>

                                    <div className={cn("space-y-2")}>
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Last name"
                                            required
                                            disabled={loading}
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className={cn("h-11", formErrors.lastName && "border-destructive")}
                                        />
                                        {formErrors.lastName && <p className={cn("text-sm text-destructive")}>{formErrors.lastName}</p>}
                                    </div>
                                </div>

                                {/* Password */}
                                <div className={cn("space-y-2")}>
                                    <Label htmlFor="password">Password *</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
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
                                    <p className={cn("text-xs text-muted-foreground")}>Must be at least 6 characters long</p>
                                </div>

                                {/* Confirm Password */}
                                <div className={cn("space-y-2")}>
                                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            required
                                            disabled={loading}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className={cn("h-11 pr-10", formErrors.confirmPassword && "border-destructive")}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className={cn("absolute right-0 top-0 h-11 w-10 hover:bg-transparent")}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    {formErrors.confirmPassword && (
                                        <p className={cn("text-sm text-destructive")}>{formErrors.confirmPassword}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className={cn("w-full h-11 bg-emerald-600 hover:bg-emerald-700")}
                                    disabled={loading}
                                >
                                    {loading ? "Creating account..." : "Register"}
                                </Button>
                            </form>
                        )}

                        <div className={cn("text-center")}>
                            <div className={cn("text-sm text-muted-foreground")}>
                                Already have an account?{" "}
                                <Link to="/login" className={cn("text-emerald-600 hover:text-emerald-700 font-medium hover:underline")}>
                                    Sign in
                                </Link>
                            </div>
                        </div>

                        <div className={cn("text-xs text-muted-foreground text-center")}>
                            By creating an account, you agree to our{" "}
                            <a href="#" className={cn("text-emerald-600 hover:underline")}>
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className={cn("text-emerald-600 hover:underline")}>
                                Privacy Policy
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
