import { CustomerRequest } from '@/components/admin/CustomerRequest';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { DollarSign, TrendingUp, UserCheck, Users } from 'lucide-react';

export default function AdminDashboardPage() {
    const { user, customerRequests, auth } = usePage<PageProps>().props;
    const cardsData = [
        {
            label: 'Total Revenue',
            value: `${user.totalRevenue} PKR`,
            change: '+20.1% from last month',
            icon: DollarSign,
            iconColor: 'text-green-500',
            trend: 'up',
        },
        {
            label: 'Total Vendors',
            value: user.totalVendor,
            change: '+5 from last month',
            icon: UserCheck,
            iconColor: 'text-blue-500',
            trend: 'up',
        },
        {
            label: 'Total Customers',
            value: user.totalCustomer,
            change: '+12.4% from last month',
            icon: Users,
            iconColor: 'text-purple-500',
            trend: 'up',
        },
    ];

    const handlePageChange = (url: string | null) => {
        if (url) router.get(url);
    };

    const name = auth.user?.name;

    return (
        <DashboardLayout title="Admin Dashboard">
            <Main className="container mx-auto space-y-6 p-6">
                <header className="ps-2">
                    <Typography variant="3xl/bold" className="mb-2 tracking-tight" as="h1">
                        Welcome back, {name}! 👋
                    </Typography>
                    <Typography variant="lg/normal" as="p" className="text-muted-foreground">
                        Here's an overview of your platform performance.
                    </Typography>
                </header>

                <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cardsData.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <Card key={index} className="relative overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                                    <div className={`rounded-md p-2 ${stat.iconColor.replace('text', 'bg')}/20`}>
                                        <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="mt-1 flex items-center text-xs text-muted-foreground">
                                        {stat.trend === 'up' ? (
                                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                        ) : (
                                            <TrendingUp className="mr-1 h-3 w-3 rotate-180 text-red-500" />
                                        )}
                                        {stat.change}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
                    <Card className="col-span-1 p-6 lg:col-span-3">
                        <CardHeader className="mb-4 p-0">
                            <CardTitle>Featured Vendors (Top Ranking)</CardTitle>
                            <Typography variant="sm/normal" className="text-muted-foreground">
                                Drag and drop to rearrange top vendors on the homepage
                            </Typography>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="flex h-60 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
                                <div className="text-center">
                                    <Users className="mx-auto mb-2 h-10 w-10 text-muted-foreground" />
                                    <Typography variant="sm/normal" className="text-muted-foreground">
                                        Drag vendor cards here to feature them
                                    </Typography>
                                    <Button variant="outline" size="sm" className="mt-2">
                                        Manage Vendors
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dialog 👍 */}
                    <CustomerRequest classname="col-span-1 lg:col-span-3" customerRequest={customerRequests} onPageChange={handlePageChange} />
                </div>
            </Main>
        </DashboardLayout>
    );
}
