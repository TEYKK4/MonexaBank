import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Home,
    CreditCard,
    Receipt,
    Send,
    Menu,
    Sun,
    Moon,
    LogOut,
    ArrowUpRight,
    ArrowDownLeft,
    TrendingUp,
    Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "next-themes"

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/accounts", label: "Accounts", icon: Wallet },
    { href: "/dashboard/transactions", label: "Transactions", icon: Receipt },
    { href: "/dashboard/send", label: "Send", icon: Send },
]

function Sidebar({ className = "" }: { className?: string }) {
    return (
        <div className={`pb-12 ${className}`}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const { theme, setTheme } = useTheme()
    const [sendDialogOpen, setSendDialogOpen] = useState(false)

    const transactions = [
        { id: 1, description: "Grocery Store", amount: -67.32, date: "Today", type: "expense" },
        { id: 2, description: "Salary Deposit", amount: 3200.0, date: "Yesterday", type: "income" },
        { id: 3, description: "Netflix", amount: -15.99, date: "2 days ago", type: "expense" },
        { id: 4, description: "Coffee Shop", amount: -4.5, date: "3 days ago", type: "expense" },
        { id: 5, description: "Freelance Payment", amount: 850.0, date: "1 week ago", type: "income" },
    ]

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            {/* Desktop Sidebar */}
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link to="/" className="flex items-center gap-2 font-semibold">
                            <span className="text-2xl font-bold text-emerald-600">Monexa</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <Sidebar />
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                {/* Header */}
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                                    <span className="text-2xl font-bold text-emerald-600">Monexa</span>
                                </Link>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className="w-full flex-1">
                        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {/* Greeting */}
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">Welcome back, Teymur!</h1>
                    </div>

                    {/* Balance Card */}
                    <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
                        <CardHeader>
                            <CardTitle className="text-emerald-100">Total Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">$12,847.50</p>
                            <p className="text-emerald-100 text-sm mt-2 flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                +2.5% from last month
                            </p>
                        </CardContent>
                    </Card>

                    {/* Account Summary */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Checking Account</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$4,427.50</div>
                                <p className="text-xs text-muted-foreground">Available balance</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Savings Account</CardTitle>
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$8,420.00</div>
                                <p className="text-xs text-muted-foreground">Goal: $10,000</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Investment</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$2,150.75</div>
                                <p className="text-xs text-muted-foreground">+5.2% this month</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions and Transactions */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                                            <Send className="h-4 w-4 mr-2" />
                                            Send Money
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Send Money</DialogTitle>
                                            <DialogDescription>Send money to friends, family, or businesses instantly.</DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="recipient">Recipient</Label>
                                                <Input id="recipient" placeholder="Email or account number" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="amount">Amount</Label>
                                                <Input id="amount" type="number" placeholder="0.00" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Input id="description" placeholder="What's this for?" />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => setSendDialogOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button onClick={() => setSendDialogOpen(false)}>Send Money</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <Button variant="outline" className="w-full bg-transparent">
                                    <ArrowUpRight className="h-4 w-4 mr-2" />
                                    Transfer Between Accounts
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Transactions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                                <CardDescription>Your last 5 transactions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px]">
                                    <div className="space-y-4">
                                        {transactions.map((transaction) => (
                                            <div key={transaction.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                                        {transaction.type === "income" ? (
                                                            <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                                                        ) : (
                                                            <ArrowUpRight className="h-4 w-4 text-red-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">{transaction.description}</p>
                                                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`font-semibold text-sm ${
                                                        transaction.type === "income" ? "text-emerald-600" : "text-foreground"
                                                    }`}
                                                >
                          {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Placeholder */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Spending Overview</CardTitle>
                                <CardDescription>Last 30 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                                    <p className="text-muted-foreground">Bar Chart Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Balance Trend</CardTitle>
                                <CardDescription>Last 30 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                                    <p className="text-muted-foreground">Area Chart Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
