'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import { Head, usePage } from '@inertiajs/react';

import Layout from '@/layouts/layout';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageProps } from '@/types';
import { BarChartIcon, MapPinIcon, ServerIcon, StarIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

interface Props extends PageProps {
    vendor: VendorService;
}
interface VendorFAQ {
    question: string;
    answer: string;
}
type HighlightType = 'new' | 'trending' | 'reliable' | 'popular' | 'undefined';
type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly';
type ConnectionType = 'fiber' | 'dsl' | 'wireless';
interface VendorService {
    id: number;
    user_id: number;

    title: string;
    slug: string;
    location: string;

    connection_type: ConnectionType;
    highlight: HighlightType;

    short_description: string;
    full_description: string;

    packages: {
        name: 'Basic' | 'Standard' | 'Premium';
        price: number;
        billing_cycle: BillingCycle;
        speed_label?: string; // "100 Mbps", optional
        features: string[];
        description?: string;
        is_popular?: boolean;
    }[];

    features: string[];
    faqs: VendorFAQ[];
    images: string[];

    speed_details: string[];
    coverage_area: string;
    is_active: boolean;

    created_at: string;
    updated_at: string;
}

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

export default function DetailedVendorServices() {
    const { vendor } = usePage<Props>().props;
    const highlight = getHighlight(vendor.highlight);

    return (
        <Layout>
            <Head title={vendor.title} />
            <div className="container mt-12 grid grid-cols-1 gap-8 px-3 lg:grid-cols-12">
                {/* Left Column */}
                <div className="space-y-6 lg:col-span-8">
                    <div>
                        <Typography as="h1" variant="4xl/bold">
                            {vendor.title}
                        </Typography>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            {highlight && (
                                <Badge className={`${highlight.color} flex items-center gap-1 text-xs`}>
                                    {highlight.icon}
                                    {highlight.label}
                                </Badge>
                            )}
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPinIcon className="h-4 w-4" />
                                {vendor.location}
                            </div>
                            {/* <div className="ml-2 text-sm text-muted-foreground">by {}</div> */}
                        </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <Typography as="p" variant="lg/normal">
                        {vendor.short_description}
                    </Typography>
                    <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: vendor.full_description }} />

                    {/* Features */}
                    {vendor.features.length > 0 && (
                        <div className="space-y-2">
                            <Typography as="h2" variant="2xl/semibold">
                                Features
                            </Typography>
                            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                                {vendor.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* FAQ */}
                    {vendor.faqs.length > 0 && (
                        <div className="space-y-4">
                            <Typography as="h2" variant="2xl/semibold">
                                Frequently Asked Questions
                            </Typography>
                            <Accordion type="multiple" className="w-full">
                                {vendor.faqs.map((faq, i) => (
                                    <AccordionItem value={`faq-${i}`} key={i}>
                                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                                        <AccordionContent>{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                </div>

                {/* Right Column (Sticky Pricing Card) */}
                <div className="relative space-y-3 lg:col-span-4">
                    <div className="sticky top-20">
                        <Card className="overflow-hidden p-0">
                            <CardHeader className="p-0">
                                {vendor.images?.length > 0 ? (
                                    <Carousel className="relative">
                                        <CarouselContent className="sm:64 h-96 md:h-96 lg:h-48">
                                            {vendor.images.map((image, index) => (
                                                <CarouselItem key={index}>
                                                    <img
                                                        src={`/storage/${image}`}
                                                        alt={vendor.title}
                                                        className="h-full w-full rounded-t-md object-cover"
                                                        draggable={false}
                                                    />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>

                                        <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-background/60 backdrop-blur-sm hover:bg-background" />
                                        <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-background/60 backdrop-blur-sm hover:bg-background" />
                                    </Carousel>
                                ) : (
                                    <div className="flex h-48 w-full items-center justify-center rounded-t-md bg-muted">
                                        <ServerIcon className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                )}
                            </CardHeader>

                            {/* Packages */}
                            <CardContent className="space-y-4 p-5">
                                <Tabs defaultValue={vendor.packages[0]?.name.toLowerCase()} className="w-full md:block">
                                    <TabsList className="mb-4 w-full">
                                        {vendor.packages.map((pkg) => (
                                            <TabsTrigger key={pkg.name} value={pkg.name.toLowerCase()} className="w-full capitalize">
                                                {pkg.name}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    {vendor.packages.map((pkg) => (
                                        <TabsContent key={pkg.name} value={pkg.name.toLowerCase()} className="mt-3">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold">{pkg.name} Package</h3>
                                                <div className="text-xl font-bold">{pkg.price} PKR</div>
                                                <p className="text-sm text-muted-foreground">{pkg.billing_cycle} billing</p>
                                                {pkg.speed_label && <p>{pkg.speed_label}</p>}
                                                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                                    {pkg.features.map((feature, i) => (
                                                        <li key={i}>{feature}</li>
                                                    ))}
                                                </ul>
                                                <Button className="w-full">Subscribe Now</Button>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
