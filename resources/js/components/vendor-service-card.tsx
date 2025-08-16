'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import { CheckCircle, Globe, HelpCircle, MapPin, Package, Rocket } from 'lucide-react';

interface Props {}

export type ConnectionType = 'fiber' | 'dsl' | 'wireless';
export type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly';
export type HighlightType = 'new' | 'trending' | 'reliable' | 'popular' | 'undefined';

export interface VendorFAQ {
    question: string;
    answer: string;
}

export interface VendorService {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    city: string;
    location: string;
    posted_date: string;
    connection_type: ConnectionType;
    highlight: HighlightType;
    short_description: string;
    full_description: string;
    packages: {
        name: 'Basic' | 'Standard' | 'Premium';
        price: number;
        billing_cycle: BillingCycle;
        speed_label?: string;
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

interface VendorServiceCardProps {
    service: VendorService;
}

export function VendorServiceCard({ service }: VendorServiceCardProps) {
    return (
        <Card className="max-w-8xl my-8 w-full overflow-hidden shadow-lg">
            <CardHeader className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="flex-1 text-3xl font-bold tracking-tight md:text-4xl">{service.title}</CardTitle>
                    {service.highlight && (
                        <Badge variant="secondary" className="text-xs font-medium uppercase">
                            {service.highlight}
                        </Badge>
                    )}
                </div>
                <CardDescription className="mt-2 text-sm text-muted-foreground">
                    Posted on {new Date(service.posted_date).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-8 p-6 md:p-8">
                {/* General Information */}
                <section>
                    <Typography as="h2" variant="xl/bold" className="mb-4">
                        Overview
                    </Typography>
                    <div className="space-y-4">
                        <Typography variant="lg/normal">{service.short_description}</Typography>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <DetailItem icon={<MapPin className="h-4 w-4 text-primary" />} label="Location" value={service.location} />
                            <DetailItem icon={<Globe className="h-4 w-4 text-primary" />} label="Connection Type" value={service.connection_type} />
                        </div>
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
            </CardContent>
        </Card>
    );
}

// Helper component for detail rows with icons
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
