import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { usePage } from '@inertiajs/react';
import ServerError from '../Errors/ServerError';

export default function Dashboard() {
    const { auth, vendorData } = usePage<{
        auth: { user: { role: 'admin' | 'vendor' | 'customer' | undefined } };
        vendorData: {
            totalRevenue: number;
            totalCustomers: number;
            activeCustomers: number;
            cancelledCustomers: number;
            expiredCustomers: number;
            recentSubscribers: {
                customer_name: string;
                customer_email: string;
                subscribed_at: string;
                next_billing_date: string;
                status: string;
            }[];
        };
    }>().props;

    if (!auth || !vendorData) {
        return <ServerError />;
    }
    const caseModifier = (role: 'admin' | 'vendor' | 'customer' | undefined) => {
        if (!role) return '';
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    return (
        <DashboardLayout title={`${caseModifier(auth.user?.role)} Dashboard`}>
            <Main>
                <div className="mb-2 flex items-center justify-between space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <div className="flex items-center space-x-2">
                        {/* The Download button is a good addition for generating reports. */}
                        <Button>Download Report</Button>
                    </div>
                </div>
                {/* Tabs can be useful for more complex dashboards, but for a simple overview, a single section works well */}
                <Tabs orientation="vertical" defaultValue="overview" className="space-y-4">
                    <div className="w-full overflow-x-auto pb-2">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics" disabled>
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger value="reports" disabled>
                                Reports
                            </TabsTrigger>
                            <TabsTrigger value="notifications" disabled>
                                Notifications
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="overview" className="space-y-4">
                        {/* --- Key Metrics Cards --- */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{vendorData.totalRevenue} PKR</div>
                                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                                </CardContent>
                            </Card>
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
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{vendorData.totalCustomers}</div>
                                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                                </CardContent>
                            </Card>
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
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{vendorData.activeCustomers}</div>
                                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                                </CardContent>
                            </Card>
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
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{vendorData.cancelledCustomers}</div>
                                    <p className="text-xs text-muted-foreground">+201 since last hour</p>
                                </CardContent>
                            </Card>
                            {/* New card for Expired Customers */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Expired Customers</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M10 21v-2a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4v2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{vendorData.expiredCustomers}</div>
                                    <p className="text-xs text-muted-foreground">Subscriptions that have ended.</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* --- Analytics and Recent Activity --- */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                            <Card className="col-span-1 lg:col-span-4">
                                <CardHeader>
                                    <CardTitle>Revenue Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    {/* The Overview chart should display a meaningful graph */}
                                    <Overview />
                                </CardContent>
                            </Card>
                            <Card className="col-span-1 lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Subscriptions</CardTitle>
                                    <CardDescription>The most recent subscribers to your service.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* The RecentSales component should now receive and display real data */}
                                    <RecentSales recentSubscribers={vendorData.recentSubscribers} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </Main>
        </DashboardLayout>
    );
}

// NOTE: You'll also need to update the RecentSales component to accept and display the new prop.
// For example:
//
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from '@/components/ui/table';
//
// export function RecentSales({ recentSubscribers }) {
//     return (
//         <div className="space-y-8">
//             {recentSubscribers.map((subscriber, index) => (
//                 <div key={index} className="flex items-center">
//                     <Avatar className="h-9 w-9">
//                         <AvatarImage src="/avatars/01.png" alt="Avatar" />
//                         <AvatarFallback>{subscriber.customer_name.slice(0, 2).toUpperCase()}</AvatarFallback>
//                     </Avatar>
//                     <div className="ml-4 space-y-1">
//                         <p className="text-sm font-medium leading-none">{subscriber.customer_name}</p>
//                         <p className="text-sm text-muted-foreground">
//                             {subscriber.customer_email}
//                         </p>
//                     </div>
//                     <div className="ml-auto font-medium">{subscriber.status}</div>
//                 </div>
//             ))}
//         </div>
//     );
// }
