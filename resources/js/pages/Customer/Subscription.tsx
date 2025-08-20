import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/layouts/layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { MapPin, Settings, Wifi, WifiOff, Zap } from 'lucide-react';

export default function Services() {
    const { customerServices, subsByService } = usePage<PageProps>().props;

    // console.log(customerServices);
    console.log(subsByService);
    return (
        <Layout title="My Subscriptions">
            <Main className="mx-auto max-w-6xl px-4 py-8">
                <Card className="mb-8 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-muted/5 to-muted/10 px-6 py-5">
                        <div>
                            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">My Subscriptions</CardTitle>
                            <CardDescription className="mt-1 text-sm">Only showing packages you've purchased</CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full border-border bg-background/80 backdrop-blur-sm transition-all hover:bg-accent hover:text-accent-foreground"
                        >
                            <Settings className="mr-2 size-4" />
                            Billing Settings
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-6 p-6">
                        {customerServices?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="mb-4 rounded-full bg-muted p-4">
                                    <WifiOff className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="mb-1 text-lg font-medium">No active subscriptions</h3>
                                <p className="max-w-md text-sm text-muted-foreground">You don't have any active subscriptions at this time.</p>
                            </div>
                        ) : (
                            customerServices?.map((service) => {
                                const allowedSubs = subsByService[service.id] ?? [];

                                const allowedNames = allowedSubs.map((s: { package_name: string }) => s.package_name);
                                const allowedStatus: string = allowedSubs.map(
                                    (s: { status: string }) => s.status.charAt(0).toUpperCase() + s.status.slice(1).toLowerCase(),
                                );

                                const purchasedPackages = (service.packages ?? []).filter((p) => allowedNames.includes(p.name));

                                // if (purchasedPackages.length === 0) return null;

                                return (
                                    <Card
                                        key={service.id}
                                        className="ho overflow-hidden rounded-xl border-0 bg-gradient-to-br from-card to-card/95 shadow-sm transition-all hover:shadow-md"
                                    >
                                        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 p-5">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                            <Wifi className="h-4 w-4 text-primary" />
                                                        </div>
                                                        {service.title}
                                                    </CardTitle>
                                                    <CardDescription className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="h-3.5 w-3.5" />
                                                            {service.city ?? '—'} • {service.location ?? '—'}
                                                        </div>
                                                        {service.connection_type && (
                                                            <div className="ml-2 flex items-center gap-1">
                                                                <div className="h-1 w-1 rounded-full bg-muted-foreground/50"></div>
                                                                <Zap className="h-3.5 w-3.5 text-amber-500" />
                                                                {service.connection_type}
                                                            </div>
                                                        )}
                                                    </CardDescription>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="self-start rounded-full border-border bg-background/80 px-3 py-1 backdrop-blur-sm sm:self-center"
                                                >
                                                    {purchasedPackages.length} Package{purchasedPackages.length !== 1 ? 's' : ''}
                                                </Badge>
                                            </div>
                                        </CardHeader>

                                        <CardContent className={`grid gap-5 p-5 ${purchasedPackages.length > 1 ? 'md:grid-cols-2' : ''}`}>
                                            {purchasedPackages.map((pkg) => (
                                                <div
                                                    key={pkg.name}
                                                    className="rounded-xl border-none border-border/50 bg-background p-5 transition-all"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <h4 className="text-lg font-medium text-foreground">{pkg.name}</h4>
                                                        <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs">
                                                            {allowedStatus}
                                                            {/* console.log(allowedNames) */}
                                                        </Badge>
                                                    </div>

                                                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                                                        {pkg.description ?? 'No description provided.'}
                                                    </p>

                                                    <div className="mb-4">
                                                        <div className="text-xl font-semibold text-primary">
                                                            {pkg.price ? `PKR ${pkg.price}` : 'Price N/A'}
                                                            <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                                /{pkg.billing_cycle}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                                                        <ul className="space-y-2 text-sm">
                                                            {pkg.features.slice(0, 4).map((f, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                                        <div className="h-1 w-1 rounded-full bg-primary"></div>
                                                                    </div>
                                                                    <span className="text-muted-foreground">{f}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                );
                            })
                        )}
                    </CardContent>
                </Card>
            </Main>
        </Layout>
    );
}
