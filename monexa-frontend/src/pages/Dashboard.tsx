import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Send, TrendingUp, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function Dashboard() {
    const transactions = [
        { id: 1, description: "Grocery Store", amount: -67.32, date: "Today", type: "expense" },
        { id: 2, description: "Salary Deposit", amount: 3200.0, date: "Yesterday", type: "income" },
        { id: 3, description: "Netflix", amount: -15.99, date: "2 days ago", type: "expense" },
        { id: 4, description: "Coffee Shop", amount: -4.5, date: "3 days ago", type: "expense" },
        { id: 5, description: "Freelance Payment", amount: 850.0, date: "1 week ago", type: "income" },
    ]

    return (
        <>
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
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                            <Link to="/dashboard/send">
                                <Send className="h-4 w-4 mr-2" />
                                Send Money
                            </Link>
                        </Button>

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
                                        className={cn(
                                            "font-semibold text-sm",
                                            transaction.type === "income" ? "text-emerald-600" : "text-foreground",
                                        )}
                                    >
                    {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                                </div>
                            ))}
                        </div>
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
        </>
    )
}
