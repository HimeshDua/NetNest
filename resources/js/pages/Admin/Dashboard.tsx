import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { usePage  } from '@inertiajs/react';
import { Props } from 'recharts/types/container/Surface';

export default function AdminDashboardPage() {
    const { user } = usePage<PageProps<{ user:{totalUser: number} }>>().props;
const cardsData = [
        {
            label: 'Total Revenue',
            value: `${user.totalRevenue*300}  PKR`,
            change: '+20.1%',
            iconColor: 'text-green-500',
            icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
        },
        {
            label: 'Total Vendors',
            value: user.totalvendor,
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

    return (
        <DashboardLayout title="Admin Dashboard">
            <Main>
           <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Hi, {}! 👋</h1>
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
            </Main>
        </DashboardLayout>
    );
}
