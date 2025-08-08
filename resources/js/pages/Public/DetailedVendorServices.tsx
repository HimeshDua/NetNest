'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import { Head, usePage } from '@inertiajs/react';

import Layout from '@/layouts/layout';
import { PageProps, VendorService } from '@/types';
import { BarChartIcon, MapPinIcon, ServerIcon, StarIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

interface Props extends PageProps {
    vendor: VendorService;
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
            <div className="container mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
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
                            <div className="ml-2 text-sm text-muted-foreground">by {vendor.vendor_name}</div>
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
                <div className="relative space-y-4 lg:col-span-4">
                    <div className="sticky top-24">
                        <Card className="overflow-hidden p-0">
                            <CardHeader className="p-0">
                                {vendor.images?.length > 0 ? (
                                    <img src={`/storage/${vendor.images[0]}`} alt={vendor.title} className="h-48 w-full object-cover" />
                                ) : (
                                    <div className="flex h-48 w-full items-center justify-center bg-muted">
                                        <ServerIcon className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4 p-5">
                                <div className="text-2xl font-bold">{vendor.price} PKR</div>
                                <Typography variant="sm/normal" className="text-muted-foreground">
                                    {vendor.billing_cycle} billing
                                </Typography>
                                <Button className="w-full">Subscribe Now</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
