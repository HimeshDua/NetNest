import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Typography } from '@/components/ui/typography';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Globe, HelpCircle, MapPin, Package, Power, Rocket, ServerIcon, Trash2 } from 'lucide-react';

export default function ServiceShow() {
    const { service } = usePage<PageProps>().props;

    const handleToggle = () => {
        router.patch(route('admin.services.toggle', service.id));
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(route('admin.services.destroy', service.id));
        }
    };

    console.log(service);

    return (
        <DashboardLayout title="Admin Dashboard">
            <Main className="container mx-auto space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">{service.title}</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => router.get(route('admin.services.index'))}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button variant="outline" onClick={handleToggle}>
                            <Power className="mr-2 h-4 w-4" />
                            {service.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                    </div>
                </div>

                <Card className="max-w-8xl my-8 w-full overflow-hidden shadow-lg">
                    <CardContent className="space-y-8 p-6 md:p-8">
                        <div className="flex flex-col-reverse items-start gap-8 md:flex-row">
                            <div className="w-full space-y-2 md:w-1/3">
                                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{service.title}</h1>
                                <div className="text-sm text-muted-foreground">
                                    <p>
                                        <span className="font-semibold">Vendor:</span> {service.vendor.name} ({service.vendor.email})
                                    </p>
                                    <p>
                                        <span className="font-semibold">Posted On:</span> {new Date(service.posted_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Image Carousel */}
                            <div className="md:auto w-full px-0 md:px-4">
                                {service.images?.length > 0 ? (
                                    <Carousel className="w-full">
                                        <CarouselContent>
                                            {service.images.map((image: string, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="h-64 overflow-hidden rounded-md sm:h-80 md:h-96">
                                                        <img
                                                            src={image.startsWith('http') ? image : `/storage/${image}`}
                                                            alt={service.title}
                                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>
                                ) : (
                                    <div className="flex h-64 w-full items-center justify-center rounded-md bg-muted sm:h-80 md:h-96">
                                        <ServerIcon className="h-16 w-16 text-muted-foreground/50" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <Separator />
                    <CardContent className="space-y-8 p-6 md:p-8">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
                            <Typography variant="lg/normal">{service.short_description}</Typography>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <DetailItem icon={<MapPin className="h-5 w-5 text-primary" />} label="Location" value={service.location} />
                                <DetailItem
                                    icon={<Globe className="h-5 w-5 text-primary" />}
                                    label="Connection Type"
                                    value={service.connection_type}
                                />
                            </div>
                        </section>

                        <Separator />
                        {/* Packages Section */}
                        {service.packages && service.packages.length > 0 && (
                            <section>
                                <Typography as="h2" variant="md/bold" className="mb-4 flex items-center gap-2">
                                    <Package className="h-6 w-6" />
                                    Packages
                                </Typography>
                                <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-${service.packages.length}`}>
                                    {service.packages.map((pkg, index) => (
                                        <Card
                                            key={index}
                                            className={`relative border hover:border-primary ${pkg.is_popular && 'border-primary/90 shadow-lg'}`}
                                        >
                                            <CardHeader>
                                                {pkg.is_popular && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="absolute top-4 right-4 bg-primary text-xs font-semibold text-primary-foreground uppercase"
                                                    >
                                                        Most Popular
                                                    </Badge>
                                                )}
                                                <CardTitle>
                                                    <Typography as="h4" variant="2xl/bold">
                                                        {pkg.name}
                                                    </Typography>
                                                </CardTitle>

                                                <Typography variant="2xl/bold" className="text-primary">
                                                    ${pkg.price}
                                                    <span className="text-sm font-medium text-muted-foreground"> / {pkg.billing_cycle}</span>
                                                </Typography>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription>
                                                    {pkg.speed_label && (
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Rocket className="h-4 w-4" />
                                                            <Typography variant="sm/normal">{pkg.speed_label}</Typography>
                                                        </div>
                                                    )}
                                                    {pkg.description && (
                                                        <Typography variant="sm/normal" className="text-muted-foreground">
                                                            {pkg.description}
                                                        </Typography>
                                                    )}
                                                </CardDescription>

                                                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                                    {pkg.features.map((feature, i) => (
                                                        <li key={i} className="flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                                                            <Typography variant="sm/normal">{feature}</Typography>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}
                        <Separator />
                        {/* Features and FAQ */}
                        <section className="grid gap-8 md:grid-cols-2">
                            <div>
                                <Typography as="h2" variant="xl/bold" className="mb-4">
                                    Features
                                </Typography>
                                {service.features && service.features.length > 0 ? (
                                    <ul className="space-y-2">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                                                <Typography variant="sm/normal">{feature}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Typography variant="sm/normal" className="text-muted-foreground">
                                        No features listed.
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Typography as="h2" variant="xl/bold" className="mb-4 flex items-center gap-2">
                                    <HelpCircle className="h-6 w-6" />
                                    FAQs
                                </Typography>
                                {service.faqs && service.faqs.length > 0 ? (
                                    <Accordion type="single" collapsible className="w-full">
                                        {service.faqs.map((faq, index) => (
                                            <AccordionItem key={index} value={`faq-${index}`}>
                                                <AccordionTrigger>
                                                    <Typography variant="sm/medium">{faq.question}</Typography>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <Typography variant="sm/normal" className="text-muted-foreground">
                                                        {faq.answer}
                                                    </Typography>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <Typography variant="sm/normal" className="text-muted-foreground">
                                        No FAQs available.
                                    </Typography>
                                )}
                            </div>
                        </section>

                        <Separator />

                        {/* Subscribers Section - Table Version */}
                        <section>
                            <Typography as="h2" variant="xl/bold" className="mb-4">
                                Subscribers ({Number(service.subscribers_count)})
                            </Typography>

                            {service.subscribers && service.subscribers.length > 0 ? (
                                <div className="rounded-lg border">
                                    <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4">
                                        <Typography variant="sm/bold" className="col-span-3">
                                            Name
                                        </Typography>
                                        <Typography variant="sm/bold" className="col-span-3">
                                            Email
                                        </Typography>
                                        <Typography variant="sm/bold" className="col-span-3">
                                            Phone
                                        </Typography>
                                        <Typography variant="sm/bold" className="col-span-3">
                                            Actions
                                        </Typography>
                                    </div>
                                    {service.subscribers.map((user) => (
                                        <div key={user.id} className="grid grid-cols-12 gap-4 border-b p-4 last:border-b-0">
                                            <Typography variant="sm/normal" className="col-span-3">
                                                {user.name}
                                            </Typography>
                                            <Typography variant="sm/normal" className="col-span-3 truncate">
                                                {user.email}
                                            </Typography>
                                            <Typography variant="sm/normal" className="col-span-3">
                                                {user.phone || 'N/A'}
                                            </Typography>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            router.get(route('admin.services.users.show', { service: service.id, user: user.id }))
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>View Profile</TooltipContent>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Typography variant="sm/normal" className="text-muted-foreground">
                                    No subscribers yet.
                                </Typography>
                            )}
                        </section>
                    </CardContent>
                </Card>
            </Main>
        </DashboardLayout>
    );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-2 rounded-md p-2 transition-colors">
            {icon}
            <div className="flex-1">
                <Typography variant="sm/normal" className="text-muted-foreground">
                    {label}
                </Typography>
                <Typography variant="sm/medium">{value}</Typography>
            </div>
        </div>
    );
}
