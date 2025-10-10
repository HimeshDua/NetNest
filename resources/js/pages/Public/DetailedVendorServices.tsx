import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import Layout from '@/layouts/layout';
import { Head, Link, usePage } from '@inertiajs/react';

import TransactionDialog from '@/components/customer/transactions/default';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageProps, VendorService } from '@/types';
import {
    BarChartIcon,
    CalendarIcon,
    ClockIcon,
    ExternalLink,
    FileText,
    MapPinIcon,
    NavigationIcon,
    PhoneIcon,
    ServerIcon,
    ShieldIcon,
    StarIcon,
    TrendingUpIcon,
    UsersIcon,
    WifiIcon,
} from 'lucide-react';

import '@/css/styles/tiptap.scss';
import '@/css/styles/utils.css';
import { Main } from '@/layouts/main';

const getHighlight = (highlight: VendorService['highlight']) => {
    switch (highlight) {
        case 'new':
            return { icon: <StarIcon className="h-4 w-4" />, label: 'New', color: 'bg-blue-100 text-blue-800' };
        case 'trending':
            return { icon: <TrendingUpIcon className="h-4 w-4" />, label: 'Trending', color: 'bg-purple-100 text-purple-800' };
        case 'reliable':
            return { icon: <BarChartIcon className="h-4 w-4" />, label: 'Reliable', color: 'bg-green-100 text-green-800' };
        case 'popular':
            return { icon: <UsersIcon className="h-4 w-4" />, label: 'Popular', color: 'bg-yellow-100 text-yellow-800' };
        default:
            return null;
    }
};

const getConnectionType = (type: VendorService['connection_type']) => {
    switch (type) {
        case 'fiber':
            return { label: 'Fiber Optic', color: 'bg-purple-100 text-purple-800', icon: <WifiIcon className="h-4 w-4" /> };
        case 'dsl':
            return { label: 'DSL', color: 'bg-blue-100 text-blue-800', icon: <ServerIcon className="h-4 w-4" /> };
        case 'wireless':
            return { label: 'Wireless', color: 'bg-green-100 text-green-800', icon: <NavigationIcon className="h-4 w-4" /> };
        default:
            return { label: 'Unknown', color: 'bg-gray-100 text-gray-800', icon: <WifiIcon className="h-4 w-4" /> };
    }
};

const appUrl = import.meta.env.APP_URL;
const appName = import.meta.env.APP_NAME;

export default function DetailedVendorServices() {
    const { service, isSubscribed } = usePage<PageProps>().props;
    const highlight = getHighlight(service.highlight);
    const connectionType = getConnectionType(service.connection_type);

    console.log(service);
    return (
        <>
            <Head title={`${service.title} - NetNest`}>
                <meta name="description" content={service.short_description} />
                <meta name="keywords" content={service?.features?.join(', ')} />
                <meta property="og:title" content={service.title} />
                <meta property="og:description" content={service.images[0]} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://${appUrl}${appName}`} />
                <meta property="og:site_name" content="NetNest" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={service.title} />
                <meta name="twitter:description" content={service.short_description} />
            </Head>

            <Layout title={service.title}>
                <Main className="container mt-12 grid grid-cols-1 gap-8 px-3 lg:grid-cols-12">
                    {/* Left Column */}
                    <div className="order-2 space-y-6 lg:order-1 lg:col-span-8">
                        {/* Header Section */}
                        <div>
                            <div className="mb-3 hidden items-center justify-start gap-1.5 text-gray-400 lg:flex">
                                <Link className="underline-offset-2 hover:underline" href={route('services.index')}>
                                    Services
                                </Link>
                                /
                                <Link className="underline-offset-2 hover:underline" href={route('services.show', service.slug)}>
                                    {service.title}
                                </Link>
                            </div>
                            <div className="relative flex flex-row items-baseline justify-baseline">
                                <Typography as="h1" variant="4xl/bold" className="relative flex items-center gap-2">
                                    {service.title}
                                </Typography>
                                {service.is_active ? (
                                    <Badge variant="default" size="sm" className="self-start text-[10px] font-medium">
                                        Active
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="text-xs">
                                        Inactive
                                    </Badge>
                                )}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                {highlight && (
                                    <Badge className={`${highlight.color} flex items-center gap-1 text-xs`}>
                                        {highlight.icon}
                                        {highlight.label}
                                    </Badge>
                                )}
                                <Badge className={`${connectionType.color} flex items-center gap-1 text-xs`}>
                                    {connectionType.icon}
                                    {connectionType.label}
                                </Badge>

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
                            </div>
                        </div>

                        <Separator />

                        {/* Vendor Information Card */}

                        {/* Service Information Card - Simplified */}
                        <Card className="mx-2 sm:mx-0">
                            <CardHeader className="pb-3">
                                <Typography as="h2" variant="lg/semibold" className="flex items-center gap-2 sm:text-xl">
                                    <ServerIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Service Information
                                </Typography>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Service Location */}
                                <div className="space-y-2">
                                    <Typography as="h3" variant="base/semibold" className="sm:text-lg">
                                        Location & Coverage
                                    </Typography>
                                    <div className="space-y-1 text-xs sm:text-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPinIcon className="h-3 w-3 flex-shrink-0 text-muted-foreground sm:h-4 sm:w-4" />
                                            <span className="font-medium">City:</span>
                                            <span>{service.city}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <WifiIcon className="h-3 w-3 flex-shrink-0 text-muted-foreground sm:h-4 sm:w-4" />
                                            <span className="font-medium">Coverage:</span>
                                            <span className="line-clamp-1">{service.coverage_area}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Service Details */}
                                <div className="space-y-2">
                                    <Typography as="h3" variant="base/semibold" className="sm:text-lg">
                                        Service Details
                                    </Typography>
                                    <div className="space-y-1 text-xs sm:text-sm">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-3 w-3 flex-shrink-0 text-muted-foreground sm:h-4 sm:w-4" />
                                            <span className="font-medium">Posted:</span>
                                            <span>{new Date(service.posted_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="h-3 w-3 flex-shrink-0 text-muted-foreground sm:h-4 sm:w-4" />
                                            <span className="font-medium">Type:</span>
                                            <span className="capitalize">{service.connection_type}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Speed Details */}
                        {service.speed_details && (
                            <Card>
                                <CardHeader>
                                    <Typography as="h2" variant="xl/semibold" className="flex items-center gap-2">
                                        <BarChartIcon className="h-5 w-5" />
                                        Speed Details
                                    </Typography>
                                </CardHeader>
                                <CardContent>
                                    {typeof service.speed_details === 'object' ? (
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                            {'download' in service.speed_details && (
                                                <div className="text-center">
                                                    <Typography variant="lg/bold" className="text-green-600">
                                                        {service.speed_details.download}
                                                    </Typography>
                                                    <Typography variant="sm/normal" className="text-muted-foreground">
                                                        Download Speed
                                                    </Typography>
                                                </div>
                                            )}
                                            {'upload' in service.speed_details && (
                                                <div className="text-center">
                                                    <Typography variant="lg/bold" className="text-blue-600">
                                                        {service.speed_details.upload}
                                                    </Typography>
                                                    <Typography variant="sm/normal" className="text-muted-foreground">
                                                        Upload Speed
                                                    </Typography>
                                                </div>
                                            )}
                                            {'latency' in service.speed_details && (
                                                <div className="text-center">
                                                    <Typography variant="lg/bold" className="text-orange-600">
                                                        {service.speed_details.latency}
                                                    </Typography>
                                                    <Typography variant="sm/normal" className="text-muted-foreground">
                                                        Latency
                                                    </Typography>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <ul className="list-disc space-y-1 pl-5">
                                            {Array.isArray(service.speed_details) ? (
                                                service.speed_details.map((detail: string, index: number) => <li key={index}>{detail}</li>)
                                            ) : (
                                                <li>{service.speed_details}</li>
                                            )}
                                        </ul>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <Typography as="h2" variant="xl/semibold" className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Service Description
                                </Typography>
                            </CardHeader>
                            <CardContent>
                                <Typography as="p" variant="lg/normal" className="mb-4">
                                    {service.short_description}
                                </Typography>
                                <div
                                    className="prose tiptap prose-sm dark:tiptap dark:prose-invert -0! max-w-none border-0! bg-background! shadow-none!"
                                    dangerouslySetInnerHTML={{ __html: service.full_description }}
                                />
                            </CardContent>
                        </Card>

                        {/* Features */}
                        {service.features.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <Typography as="h2" variant="xl/semibold">
                                        Features & Benefits
                                    </Typography>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                                                    <ShieldIcon className="h-3 w-3 text-primary" />
                                                </div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* FAQ */}
                        {service.faqs.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <Typography as="h2" variant="xl/semibold">
                                        Frequently Asked Questions
                                    </Typography>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="multiple" className="w-full divide-y divide-muted">
                                        {service.faqs.map((faq, i) => (
                                            <AccordionItem value={`faq-${i}`} key={i}>
                                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                                <AccordionContent>{faq.answer}</AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column (Sticky Pricing Card) */}
                    <div className="relative order-1 space-y-3 lg:order-2 lg:col-span-4">
                        <div className="space-y-4 lg:sticky lg:top-20">
                            {/* Image Carousel */}
                            <Card className="overflow-hidden p-0">
                                <CardHeader className="p-0">
                                    {service.images?.length > 0 ? (
                                        <Carousel>
                                            <CarouselContent className="h-56 sm:h-72 md:h-96 lg:h-64">
                                                {service.images.map((image: string, index) => (
                                                    <CarouselItem key={index}>
                                                        <img
                                                            src={image.startsWith('http') ? image : `/storage/${image}`}
                                                            alt={service.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </Carousel>
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center bg-muted">
                                            <ServerIcon className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                </CardHeader>

                                {/* Packages */}
                                <CardContent className="space-y-4 p-5">
                                    {service.packages?.length ? (
                                        <Tabs defaultValue={service.packages[0]?.name.toLowerCase()}>
                                            <TabsList className="mb-4 flex w-full overflow-x-auto whitespace-nowrap">
                                                {service.packages.map((pkg) => (
                                                    <TabsTrigger key={pkg.name} value={pkg.name.toLowerCase()} className="shrink-0 px-3 capitalize">
                                                        {pkg.name}
                                                    </TabsTrigger>
                                                ))}
                                            </TabsList>
                                            {service.packages.map((pkg) => (
                                                <TabsContent key={pkg.name} value={pkg.name.toLowerCase()}>
                                                    <div className="space-y-2">
                                                        <h3 className="text-lg font-semibold">{pkg.name} Package</h3>
                                                        <div className="text-xl font-bold">{pkg.price} PKR</div>
                                                        <p className="text-sm text-muted-foreground">{pkg.billing_cycle} billing</p>
                                                        {pkg.speed_label && <p>{pkg.speed_label}</p>}
                                                        <ul className="mb-5 flex list-disc flex-col space-y-0.5 pl-5 text-sm text-muted-foreground">
                                                            {pkg.features.map((feature, i) => (
                                                                <li key={i}>{feature}</li>
                                                            ))}
                                                        </ul>

                                                        <TransactionDialog
                                                            isSubscribed={isSubscribed}
                                                            price={pkg.price}
                                                            serviceId={service.id}
                                                            package_name={pkg.name}
                                                            payment_method={'COD'}
                                                        />
                                                    </div>
                                                </TabsContent>
                                            ))}
                                        </Tabs>
                                    ) : (
                                        <p className="text-muted-foreground">No packages available</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Quick Contact Card */}
                            <Card>
                                <CardHeader>
                                    <Typography as="h3" variant="lg/semibold" className="flex items-center gap-2">
                                        <PhoneIcon className="h-5 w-5" />
                                        Contact Vendor
                                    </Typography>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Vendor:</span>
                                        <span>{service.vendor?.name || 'Not specified'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Phone:</span>
                                        <span className="text-primary">{service.vendor?.phone || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Location:</span>
                                        <span className="text-right">
                                            {service.city}, {service.location}
                                        </span>
                                    </div>
                                    <div className="pt-2 lg:hidden">
                                        <a href={`tel:${service.vendor.phone}`}>
                                            <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                                                <PhoneIcon className="mr-2 inline h-4 w-4" />
                                                Call Now {service.vendor.phone}
                                            </button>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Main>
            </Layout>
        </>
    );
}
