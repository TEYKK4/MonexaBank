"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    CreditCard,
    Send,
    TrendingUp,
    Menu,
    Sun,
    Moon,
    Shield,
    Smartphone,
    Clock,
    Users,
    Star,
    ArrowRight,
    CheckCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function LandingPage() {
    const { theme, setTheme } = useTheme()

    const features = [
        {
            icon: CreditCard,
            title: "Multiple Accounts",
            description:
                "Create savings, checking, and investment accounts all in one place. Organize your finances the way that works best for you.",
        },
        {
            icon: Send,
            title: "Instant Transfers",
            description:
                "Transfer money to friends, family, or businesses instantly. No waiting, no fees, just fast and secure transactions.",
        },
        {
            icon: TrendingUp,
            title: "Smart Analytics",
            description:
                "Get detailed insights into your spending patterns with smart categorization and beautiful charts that make sense of your money.",
        },
        {
            icon: Shield,
            title: "Bank-Level Security",
            description:
                "Your money and data are protected with enterprise-grade encryption and multi-factor authentication.",
        },
        {
            icon: Smartphone,
            title: "Mobile First",
            description:
                "Access your accounts anywhere, anytime with our responsive web app that works perfectly on all devices.",
        },
        {
            icon: Clock,
            title: "24/7 Support",
            description: "Get help when you need it with our round-the-clock customer support team ready to assist you.",
        },
    ]

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Small Business Owner",
            content: "Monexa has completely transformed how I manage my business finances. The analytics are incredible!",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Freelancer",
            content: "Finally, a banking app that actually makes sense. The instant transfers have saved me so much time.",
            rating: 5,
        },
        {
            name: "Emily Rodriguez",
            role: "Student",
            content: "As a student, I love how easy it is to track my spending and save money with Monexa's smart features.",
            rating: 5,
        },
    ]

    const benefits = [
        "No monthly fees or hidden charges",
        "Instant money transfers worldwide",
        "Advanced spending analytics",
        "Multi-device synchronization",
        "24/7 customer support",
        "Bank-level security protection",
    ]

    return (
        <div className={cn("min-h-screen bg-background")}>
            {/* Fixed Navbar */}
            <header className={cn("fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50")}>
                <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8")}>
                    <div className={cn("flex items-center justify-between h-16")}>
                        {/* Logo */}
                        <div className={cn("flex items-center")}>
                            <Link to="/" className={cn("text-2xl font-bold text-foreground")}>
                                <span className={cn("text-emerald-600")}>Monexa</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className={cn("hidden md:flex items-center space-x-4")}>
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
                            <Button variant="ghost" asChild className={cn("text-muted-foreground hover:text-foreground")}>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild className={cn("bg-emerald-600 hover:bg-emerald-700")}>
                                <Link to="/register">Get Started</Link>
                            </Button>
                        </div>

                        {/* Mobile Navigation */}
                        <div className={cn("md:hidden flex items-center gap-2")}>
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
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className={cn("text-muted-foreground")}>
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className={cn("bg-background")}>
                                    <div className={cn("flex flex-col space-y-4 mt-8")}>
                                        <Button
                                            variant="ghost"
                                            asChild
                                            className={cn("justify-start text-muted-foreground hover:text-foreground")}
                                        >
                                            <Link to="/login">Login</Link>
                                        </Button>
                                        <Button asChild className={cn("justify-start bg-emerald-600 hover:bg-emerald-700")}>
                                            <Link to="/register">Get Started</Link>
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className={cn("pt-24 pb-20 px-4 sm:px-6 lg:px-8")}>
                <div className={cn("container mx-auto")}>
                    <div className={cn("max-w-4xl mx-auto text-center")}>
                        <div className={cn("space-y-8")}>
                            <div className={cn("space-y-6")}>
                                <h1 className={cn("text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight")}>
                                    Your finances. <span className={cn("text-emerald-600")}>Simplified.</span>
                                </h1>
                                <p className={cn("text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto")}>
                                    Take control of your money with Monexa's powerful banking platform. Manage accounts, transfer funds,
                                    and track spending with ease.
                                </p>
                            </div>

                            <div className={cn("flex flex-col sm:flex-row gap-4 justify-center")}>
                                <Button size="lg" className={cn("text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700")} asChild>
                                    <Link to="/register">
                                        Get Started Free
                                        <ArrowRight className={cn("ml-2 h-5 w-5")} />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="lg" className={cn("text-lg px-8 py-6 bg-background")}>
                                    <Link to="#features">Learn More</Link>
                                </Button>
                            </div>

                            {/* Trust Indicators */}
                            <div className={cn("pt-8")}>
                                <p className={cn("text-sm text-muted-foreground mb-4")}>Trusted by over 100,000+ users worldwide</p>
                                <div className={cn("flex items-center justify-center gap-8 opacity-60")}>
                                    <div className={cn("flex items-center gap-1")}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={cn("h-4 w-4 fill-emerald-600 text-emerald-600")} />
                                        ))}
                                        <span className={cn("ml-2 text-sm font-medium")}>4.9/5</span>
                                    </div>
                                    <Separator orientation="vertical" className={cn("h-4")} />
                                    <div className={cn("flex items-center gap-2")}>
                                        <Users className={cn("h-4 w-4")} />
                                        <span className={cn("text-sm font-medium")}>100K+ Users</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={cn("py-20 px-4 sm:px-6 lg:px-8 bg-muted/30")}>
                <div className={cn("container mx-auto")}>
                    <div className={cn("text-center mb-16")}>
                        <h2 className={cn("text-3xl sm:text-4xl font-bold text-foreground mb-4")}>
                            Everything you need to manage your money
                        </h2>
                        <p className={cn("text-xl text-muted-foreground max-w-2xl mx-auto")}>
                            Powerful features designed to give you complete control over your financial life.
                        </p>
                    </div>

                    <div className={cn("grid md:grid-cols-2 lg:grid-cols-3 gap-8")}>
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className={cn("border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-background")}
                            >
                                <CardHeader className={cn("text-center pb-4")}>
                                    <div
                                        className={cn(
                                            "w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4",
                                        )}
                                    >
                                        <feature.icon className={cn("w-8 h-8 text-emerald-600")} />
                                    </div>
                                    <CardTitle className={cn("text-xl font-bold text-foreground")}>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className={cn("text-center text-muted-foreground leading-relaxed")}>
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={cn("py-20 px-4 sm:px-6 lg:px-8")}>
                <div className={cn("container mx-auto")}>
                    <div className={cn("grid lg:grid-cols-2 gap-12 items-center")}>
                        <div className={cn("space-y-8")}>
                            <div className={cn("space-y-4")}>
                                <h2 className={cn("text-3xl sm:text-4xl font-bold text-foreground")}>
                                    Why choose <span className={cn("text-emerald-600")}>Monexa</span>?
                                </h2>
                                <p className={cn("text-xl text-muted-foreground")}>
                                    Join thousands of satisfied customers who have made the switch to smarter banking.
                                </p>
                            </div>

                            <div className={cn("space-y-4")}>
                                {benefits.map((benefit, index) => (
                                    <div key={index} className={cn("flex items-center gap-3")}>
                                        <CheckCircle className={cn("h-5 w-5 text-emerald-600 flex-shrink-0")} />
                                        <span className={cn("text-muted-foreground")}>{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <Button size="lg" className={cn("bg-emerald-600 hover:bg-emerald-700")} asChild>
                                <Link to="/register">Start Banking Today</Link>
                            </Button>
                        </div>

                        {/* Dashboard Preview */}
                        <div className={cn("relative")}>
                            <Card className={cn("bg-background shadow-2xl border border-border rounded-xl overflow-hidden")}>
                                <div className={cn("p-6 space-y-4")}>
                                    {/* Mock header */}
                                    <div className={cn("flex items-center justify-between pb-4 border-b border-border")}>
                                        <div className={cn("flex items-center space-x-3")}>
                                            <div className={cn("w-8 h-8 bg-emerald-600 rounded-full")}></div>
                                            <span className={cn("font-semibold text-foreground")}>Dashboard</span>
                                        </div>
                                        <div className={cn("w-8 h-8 bg-muted rounded-full")}></div>
                                    </div>

                                    {/* Mock balance card */}
                                    <div className={cn("bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white")}>
                                        <p className={cn("text-emerald-100 text-sm")}>Total Balance</p>
                                        <p className={cn("text-3xl font-bold")}>$12,847.50</p>
                                        <p className={cn("text-emerald-100 text-sm mt-2")}>+2.5% from last month</p>
                                    </div>

                                    {/* Mock transaction list */}
                                    <div className={cn("space-y-3")}>
                                        <h3 className={cn("font-semibold text-foreground")}>Recent Transactions</h3>
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className={cn("flex items-center justify-between p-3 bg-muted/50 rounded-lg")}>
                                                <div className={cn("flex items-center space-x-3")}>
                                                    <div className={cn("w-10 h-10 bg-muted rounded-full")}></div>
                                                    <div>
                                                        <p className={cn("font-medium text-foreground")}>Transaction {i}</p>
                                                        <p className={cn("text-sm text-muted-foreground")}>Today</p>
                                                    </div>
                                                </div>
                                                <span className={cn("font-semibold text-foreground")}>-$24.99</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className={cn("py-20 px-4 sm:px-6 lg:px-8 bg-muted/30")}>
                <div className={cn("container mx-auto")}>
                    <div className={cn("text-center mb-16")}>
                        <h2 className={cn("text-3xl sm:text-4xl font-bold text-foreground mb-4")}>What our customers say</h2>
                        <p className={cn("text-xl text-muted-foreground")}>
                            Don't just take our word for it - hear from our satisfied users.
                        </p>
                    </div>

                    <div className={cn("grid md:grid-cols-3 gap-8")}>
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className={cn("bg-background border-0 shadow-lg")}>
                                <CardContent className={cn("p-6")}>
                                    <div className={cn("space-y-4")}>
                                        <div className={cn("flex items-center gap-1")}>
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className={cn("h-4 w-4 fill-emerald-600 text-emerald-600")} />
                                            ))}
                                        </div>
                                        <p className={cn("text-muted-foreground italic")}>"{testimonial.content}"</p>
                                        <div>
                                            <p className={cn("font-semibold text-foreground")}>{testimonial.name}</p>
                                            <p className={cn("text-sm text-muted-foreground")}>{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={cn("py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600")}>
                <div className={cn("container mx-auto text-center")}>
                    <div className={cn("max-w-3xl mx-auto space-y-8")}>
                        <h2 className={cn("text-3xl sm:text-4xl font-bold text-white")}>Ready to take control of your finances?</h2>
                        <p className={cn("text-xl text-emerald-100")}>
                            Join thousands of users who have simplified their financial lives with Monexa. Get started today and
                            experience the future of banking.
                        </p>
                        <div className={cn("flex flex-col sm:flex-row gap-4 justify-center")}>
                            <Button
                                size="lg"
                                variant="secondary"
                                className={cn("text-lg px-8 py-6 bg-white text-emerald-600 hover:bg-gray-100")}
                                asChild
                            >
                                <Link to="/register">Get Started Free</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className={cn("text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-emerald-600")}
                                asChild
                            >
                                <Link to="/login">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={cn("border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-background")}>
                <div className={cn("container mx-auto")}>
                    <div className={cn("grid md:grid-cols-4 gap-8")}>
                        <div className={cn("space-y-4")}>
                            <Link to="/" className={cn("text-2xl font-bold text-foreground")}>
                                <span className={cn("text-emerald-600")}>Monexa</span>
                            </Link>
                            <p className={cn("text-muted-foreground")}>
                                Simplifying banking for the modern world. Secure, fast, and user-friendly.
                            </p>
                        </div>

                        <div className={cn("space-y-4")}>
                            <h3 className={cn("font-semibold text-foreground")}>Product</h3>
                            <div className={cn("space-y-2")}>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    Features
                                </a>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    Security
                                </a>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    Pricing
                                </a>
                            </div>
                        </div>

                        <div className={cn("space-y-4")}>
                            <h3 className={cn("font-semibold text-foreground")}>Company</h3>
                            <div className={cn("space-y-2")}>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    About
                                </a>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    Careers
                                </a>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    Contact
                                </a>
                            </div>
                        </div>

                        <div className={cn("space-y-4")}>
                            <h3 className={cn("font-semibold text-foreground")}>Legal</h3>
                            <div className={cn("space-y-2")}>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    Privacy Policy
                                </a>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    Terms of Service
                                </a>
                                <a href="#" className={cn("block text-muted-foreground hover:text-foreground transition-colors")}>
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>

                    <Separator className={cn("my-8")} />

                    <div className={cn("flex flex-col md:flex-row items-center justify-between")}>
                        <div className={cn("text-muted-foreground text-sm")}>
                            © {new Date().getFullYear()} Monexa. All rights reserved.
                        </div>
                        <div className={cn("flex items-center space-x-4 mt-4 md:mt-0")}>
                            <span className={cn("text-sm text-muted-foreground")}>Made with ❤️ for better banking</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
