// Vendor/Dashboard.tsx

import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { VendorServiceCard } from '@/components/vendor-service-card';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { VendorService } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import ServerError from '../Errors/ServerError';

export default function Dashboard() {
    const { auth, vendorData } = usePage<{
        auth: { user: { role: 'admin' | 'vendor' | 'customer' | undefined; name: string } };
        vendorData: {
            service: VendorService;
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

    if (!auth || !vendorData) return <ServerError />;

    const userName = auth.user?.name || 'Vendor';

    const cardsData = [
        {
            label: 'Total Revenue',
            value: `${vendorData.totalRevenue} PKR`,
            change: '+20.1%',
            iconColor: 'text-green-500',
            icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
        },
        {
            label: 'Active Customers',
            value: vendorData.activeCustomers,
            change: '+180.1%',
            iconColor: 'text-blue-500',
            icon: (
                <>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                </>
            ),
        },
        {
            label: 'Total Customers',
            value: vendorData.totalCustomers,
            change: '+12.4%',
            iconColor: 'text-yellow-500',
            icon: (
                <>
                    <circle cx="9" cy="7" r="4" />
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                </>
            ),
        },
        {
            label: 'Cancelled Customers',
            value: vendorData.cancelledCustomers,
            change: 'This month',
            iconColor: 'text-red-500',
            icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
        },
    ];

    useEffect(() => {
        console.log(vendorData.service);
    }, []);
    return (
        <DashboardLayout title="Vendor Dashboard">
            <Main>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Hi, {userName}! 👋</h1>
                    <p className="text-muted-foreground">Here’s what’s happening with your service today.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-4">
                    {cardsData.map((stat, index) => (
                        <Card className="gap-y-4 py-4" key={index}>
                            <CardHeader className="flex flex-row items-center justify-between py-0">
                                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={`h-5 w-5 ${stat.iconColor}`}
                                >
                                    {stat.icon}
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-7">
                    <Card className="col-span-1 lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Monthly Revenue</CardTitle>
                            <CardDescription>Revenue generated over the last 12 months.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={vendorData.chartData} />
                        </CardContent>
                    </Card>

                    <Card className="col-span-1 lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Subscribers</CardTitle>
                            <CardDescription>People who recently joined your service.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {vendorData.recentSubscribers?.length > 0 ? (
                                <RecentSales recentSubscribers={vendorData.recentSubscribers} />
                            ) : (
                                <div className="py-4 text-center text-muted-foreground">No recent subscribers found.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Separator className="my-8" />

                <VendorServiceCard service={vendorData.service} />
            </Main>
        </DashboardLayout>
    );
}
