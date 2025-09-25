import { InfoBanner } from '@/components/customer/infoBanner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/layout';
import { Main } from '@/layouts/main';
import { PageProps, type UserTransaction } from '@/types';
import { router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    CreditCard,
    DollarSign,
    Download,
    ExternalLink,
    FileText,
    MapPinIcon,
    Package,
    Wifi,
    WifiOff,
    Zap,
} from 'lucide-react';

export default function SubscriptionsPage() {
    const { billingData } = usePage<PageProps>().props;
    const { transactions, customerServices, subsByService } = billingData || {};

    const getStatusBadge = (status: string) => {
        const variants = {
            active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
            completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
            expired: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle },
        };

        const variant = variants[status.toLowerCase() as keyof typeof variants] || variants.pending;
        const IconComponent = variant.icon;

        return (
            <Badge variant="secondary" className={`${variant.bg} ${variant.text} gap-1`}>
                <IconComponent className="h-3 w-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatCurrency = (amount: string | number, currency: string = 'PKR') => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: currency,
        }).format(parseFloat(amount.toString()));
    };

    const StatsCard = ({
        icon: Icon,
        title,
        value,
        description,
        trend,
    }: {
        icon: any;
        title: string;
        value: string;
        description?: string;
        trend?: 'up' | 'down' | 'neutral';
    }) => (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="mt-1 text-2xl font-bold">{value}</p>
                        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
                    </div>
                    <div
                        className={`rounded-lg p-3 ${
                            trend === 'up'
                                ? 'bg-green-100 text-green-600'
                                : trend === 'down'
                                  ? 'bg-red-100 text-red-600'
                                  : 'bg-blue-100 text-blue-600'
                        }`}
                    >
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const totalSpent = transactions?.reduce((sum: number, tx: any) => sum + parseFloat(tx.amount), 0) || 0;
    const activeSubscriptions = customerServices?.length || 0;

    const text =
        'We haven’t integrated premium gateway APIs yet, but we’ve optimized payments to provide a smooth and secure experience. As part of the Vision 2025 Aptech Garden project, there are no subscription limits for our customers.';

    const link = 'https://github.com/HimeshDua/NetNest';
    return (
        <Layout title="My Account">
            <Main className="mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
                    <p className="mt-2 text-muted-foreground">Manage your subscriptions and billing</p>
                </div>

                {/* Quick Stats */}
                <div className="mb-8 grid gap-6 md:grid-cols-3">
                    <StatsCard
                        icon={Package}
                        title="Active Subscriptions"
                        value={activeSubscriptions.toString()}
                        description="Currently active services"
                        trend={activeSubscriptions > 0 ? 'up' : 'neutral'}
                    />
                    <StatsCard icon={DollarSign} title="Total Spent" value={formatCurrency(totalSpent)} description="Lifetime value" trend="up" />
                    <StatsCard
                        icon={CreditCard}
                        title="Recent Transactions"
                        value={(transactions?.length || 0).toString()}
                        description="All-time payments"
                        trend="neutral"
                    />
                </div>

                <InfoBanner text={text} link={link} />

                {/* Main Content Tabs */}
                <Tabs defaultValue="subscriptions" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            Subscriptions
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Billing & Payments
                        </TabsTrigger>
                    </TabsList>

                    {/* Subscriptions Tab */}
                    <TabsContent value="subscriptions" className="space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>My Subscriptions</CardTitle>
                                    <CardDescription>Your active service subscriptions</CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                {customerServices?.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mb-4 rounded-full bg-muted p-4">
                                            <WifiOff className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-medium">No active subscriptions</h3>
                                        <p className="mb-4 max-w-md text-sm text-muted-foreground">
                                            You don't have any active subscriptions at this time.
                                        </p>
                                        <Button>Browse Services</Button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {customerServices?.map((service) => {
                                            const allowedSubs = subsByService?.[service.id] ?? [];
                                            const allowedNames = Array.isArray(allowedSubs)
                                                ? allowedSubs.map((s: { package_name: string }) => s.package_name)
                                                : [];
                                            const purchasedPackages = (service.packages ?? []).filter((p) => allowedNames.includes(p.name));

                                            if (purchasedPackages.length === 0) return null;

                                            return (
                                                <Card key={service.id} className="overflow-hidden border-l-4 border-l-primary">
                                                    <CardContent className="p-0">
                                                        <div className="bg-muted/30 p-6">
                                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="rounded-lg bg-primary/10 p-3">
                                                                        <Wifi className="h-6 w-6 text-primary" />
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-lg font-semibold">{service.title}</h3>
                                                                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                                                                            {service.latitude && service.longitude ? (
                                                                                <a
                                                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${service.latitude},${service.longitude}`)}`}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="inline-flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                                                                                >
                                                                                    <ExternalLink className="h-4 w-4" />
                                                                                    {service.location}
                                                                                </a>
                                                                            ) : (
                                                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                                    <MapPinIcon className="h-4 w-4" />
                                                                                    {service.location}
                                                                                </div>
                                                                            )}
                                                                            <div className="flex items-center gap-1">
                                                                                <Zap className="h-4 w-4 text-amber-500" />
                                                                                {service.connection_type}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Badge variant="secondary" className="gap-1">
                                                                    <Package className="h-3 w-3" />
                                                                    {purchasedPackages.length} package{purchasedPackages.length !== 1 ? 's' : ''}
                                                                </Badge>
                                                            </div>
                                                        </div>

                                                        <div className={`grid gap-6 p-6 ${purchasedPackages.length > 1 ? 'md:grid-cols-2' : ''}`}>
                                                            {purchasedPackages.map((pkg) => {
                                                                const subStatus =
                                                                    (Array.isArray(allowedSubs) ? allowedSubs : []).find(
                                                                        (s: { package_name: string }) => s.package_name === pkg.name,
                                                                    )?.status || 'active';

                                                                return (
                                                                    <div key={pkg.name} className="rounded-lg border p-4">
                                                                        <div className="mb-3 flex items-center justify-between">
                                                                            <h4 className="font-semibold">{pkg.name}</h4>
                                                                            {getStatusBadge(subStatus)}
                                                                        </div>

                                                                        <p className="mb-4 text-sm text-muted-foreground">
                                                                            {pkg.description || 'No description provided.'}
                                                                        </p>

                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <span className="text-xl font-bold text-primary">
                                                                                    {formatCurrency(pkg.price || 0)}
                                                                                </span>
                                                                                <span className="ml-1 text-sm text-muted-foreground">
                                                                                    /{pkg.billing_cycle}
                                                                                </span>
                                                                            </div>
                                                                            <Button
                                                                                onClick={() => router.get(route('services.show', service.slug))}
                                                                                variant="outline"
                                                                                size="sm"
                                                                            >
                                                                                View Package
                                                                            </Button>
                                                                        </div>

                                                                        {pkg.features && pkg.features.length > 0 && (
                                                                            <>
                                                                                <Separator className="my-4" />
                                                                                <ul className="space-y-2 text-sm">
                                                                                    {pkg.features.slice(0, 3).map((feature, index) => (
                                                                                        <li key={index} className="flex items-center gap-2">
                                                                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                                                                            <span className="text-muted-foreground">{feature}</span>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing" className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Billing Summary */}
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle>Billing Summary</CardTitle>
                                    <CardDescription>Your payment overview</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Active Subscriptions</span>
                                        <span className="font-medium">{activeSubscriptions}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Monthly Cost</span>
                                        <span className="font-medium">
                                            {formatCurrency(
                                                customerServices?.reduce((sum, service) => {
                                                    const allowedSubs = subsByService?.[service.id] ?? [];
                                                    const allowedNames = Array.isArray(allowedSubs)
                                                        ? allowedSubs.map((s: { package_name: string }) => s.package_name)
                                                        : [];
                                                    const purchasedPackages = (service.packages ?? []).filter((p) => allowedNames.includes(p.name));
                                                    return (
                                                        sum +
                                                        purchasedPackages.reduce((pkgSum, pkg) => pkgSum + parseFloat((pkg.price ?? 0).toString()), 0)
                                                    );
                                                }, 0) || 0,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Total Spent</span>
                                        <span className="font-medium text-green-600">{formatCurrency(totalSpent)}</span>
                                    </div>
                                    <Separator />
                                    <Button className="w-full gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        Payment Methods
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Transaction History */}
                            <Card className="lg:col-span-2">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Transaction History</CardTitle>
                                        <CardDescription>Your payment history and invoices</CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Download className="h-4 w-4" />
                                        Export
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {(transactions ?? []).length > 0 ? (
                                        <div className="space-y-4">
                                            {(transactions ?? []).map((tx: UserTransaction) => (
                                                <div
                                                    key={tx?.id ?? `${Math.random()}`}
                                                    className="flex items-center justify-between rounded-lg border p-4"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-lg bg-blue-100 p-2">
                                                            <FileText className="h-4 w-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{tx.transaction_reference}</p>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Calendar className="h-3 w-3" />
                                                                {new Date(tx.payment_date).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-semibold">{formatCurrency(tx.amount, tx.currency)}</span>
                                                        {getStatusBadge(tx.status)}
                                                        <Button variant="ghost" size="sm">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
                                            <p className="text-muted-foreground">No transactions found</p>
                                            <p className="mt-1 text-sm text-muted-foreground">Your transaction history will appear here.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </Main>
        </Layout>
    );
}
