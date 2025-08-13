import { CustomerRequest } from '@/components/admin/CustomerRequest';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';

export default function AdminDashboardPage() {
    const { user, customerRequests, auth } = usePage<PageProps>().props;
    const cardsData = [
        {
            label: 'Total Revenue',
            value: `${user.totalRevenue * 300}  PKR`,
            change: '+20.1%',
            iconColor: 'text-green-500',
            icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
        },
        {
            label: 'Total Vendors',
            value: user.totalVendor,
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
            value: user.totalCustomer,
            change: '+12.4%',
            iconColor: 'text-yellow-500',
            icon: (
                <>
                    <circle cx="9" cy="7" r="4" />
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                </>
            ),
        },
    ];

    const handlePageChange = (url: string | null) => {
        if (url) router.get(url);
    };

    const name = auth.user?.name;

    return (
        <DashboardLayout title="Admin Dashboard">
            <Main className="grid space-y-6">
                <header className="ps-2">
                    <Typography variant="3xl/bold" className="tracking-tight" as="h1">
                        Hi, {name}! 👋
                    </Typography>
                    <Typography variant="lg/normal" as="p">
                        Here’s what’s happening with your service today.
                    </Typography>
                </header>

                <section className="grid grid-cols-1 justify-evenly gap-6 md:grid-cols-3">
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
                </section>

                <div className="grid justify-between gap-4 md:grid-cols-7">
                    <div className="col-span-3 bg-blue-300 md:col-span-4 lg:col-span-4">wow</div>
                    <CustomerRequest
                        classname="col-span-3 md:col-span-3 lg:col-span-3"
                        customerRequest={customerRequests}
                        onPageChange={handlePageChange}
                    />
                </div>
            </Main>
        </DashboardLayout>
    );
}
