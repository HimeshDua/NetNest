// Vendor/Dashboard.tsx

import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { usePage } from '@inertiajs/react';
import ServerError from '../Errors/ServerError';

export default function Dashboard() {
    const { auth, vendorData } = usePage<{
        auth: { user: { role: 'admin' | 'vendor' | 'customer' | undefined; name: string } };
        vendorData: {
            service: { title: string };
            totalRevenue: number;
            totalCustomers: number;
            activeCustomers: number;
            cancelledCustomers: number;
            recentSubscribers: {
                customer_name: string;
                customer_email: string;
                subscribed_at: string;
                next_billing_date: string;
                status: 'active' | 'cancelled' | 'expired';
            }[];
            chartData: {
                name: string;
                total: number;
            }[];
        };
    }>().props;

    if (!auth || !vendorData) {
        return <ServerError />;
    }

    const userName = auth.user?.name || 'Vendor';

    return (
        <DashboardLayout title="Vendor Dashboard">
            <Main>
                {/* Simplified header with a personalized greeting */}
                <div className="mb-6 flex items-center justify-between space-y-2">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Hi, {userName}! 👋</h1>
                        <p className="text-muted-foreground">
                            Here's an overview of your service: <strong>{vendorData.service.title}</strong>.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button>Download Report</Button>
                    </div>
                </div>

                {/* --- Key Metrics Cards with improved styling --- */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Revenue Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-green-500"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{vendorData.totalRevenue} PKR</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>

                    {/* Active Customers Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-blue-500"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{vendorData.activeCustomers}</div>
                            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                        </CardContent>
                    </Card>

                    {/* Total Customers Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-gray-500"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{vendorData.totalCustomers}</div>
                            <p className="text-xs text-muted-foreground">+19% from last month</p>
                        </CardContent>
                    </Card>

                    {/* Cancelled Customers Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cancelled Customers</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-red-500"
                            >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{vendorData.cancelledCustomers}</div>
                            <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* --- Analytics and Recent Activity --- */}
                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-7">
                    <Card className="col-span-1 lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Monthly Revenue</CardTitle>
                            <CardDescription>Displays your total revenue over the last 12 months.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={vendorData.chartData} />
                        </CardContent>
                    </Card>
                    <Card className="col-span-1 lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Subscribers</CardTitle>
                            <CardDescription>The most recent subscribers to your service.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {vendorData.recentSubscribers && vendorData.recentSubscribers.length > 0 ? (
                                <RecentSales recentSubscribers={vendorData.recentSubscribers} />
                            ) : (
                                <div className="p-4 text-center text-muted-foreground">No recent subscribers found.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </Main>
        </DashboardLayout>
    );
}
