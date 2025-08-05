'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageProps, VendorService } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BarChartIcon, CalendarIcon, DollarSignIcon, GlobeIcon, ServerIcon, StarIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

interface Props extends PageProps {
    vendor: VendorService;
}

export default function DetailedVendorServices() {
    const { vendor } = usePage<Props>().props;

    const getHighlight = (highlight: VendorService['highlight']) => {
        switch (highlight) {
            case 'new':
                return { icon: <StarIcon className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' };
            case 'trending':
                return { icon: <TrendingUpIcon className="h-4 w-4" />, color: 'bg-purple-100 text-purple-800' };
            case 'reliable':
                return { icon: <BarChartIcon className="h-4 w-4" />, color: 'bg-green-100 text-green-800' };
            case 'popular':
                return { icon: <UsersIcon className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800' };
            default:
                return null;
        }
    };

    const highlight = getHighlight(vendor.highlight);

    return (
        <>
            <Head title={vendor.title} />
            <div className="mx-auto max-w-4xl px-4 py-12">
                <div className="flex items-start gap-6">
                    {vendor.logo ? (
                        <img src={vendor.logo} alt={vendor.vendor_name} className="h-20 w-20 rounded-md border bg-white object-contain p-1" />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-md border bg-muted">
                            <ServerIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                    )}

                    <div className="flex-1 space-y-1">
                        <h1 className="text-2xl font-semibold">{vendor.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <GlobeIcon className="h-4 w-4" />
                            {vendor.vendor_name} &bull; {vendor.location}
                        </div>
                        {highlight && (
                            <Badge className={highlight.color + ' flex items-center gap-1'}>
                                {highlight.icon}
                                {vendor.highlight}
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSignIcon className="h-4 w-4" />
                            <span>Price: PKR {vendor.price}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>Billing Cycle: {vendor.billing_cycle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>Posted on: {vendor.posted_date ?? 'N/A'}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">{vendor.short_description}</p>
                        <div>
                            <p className="mb-2 text-sm font-medium">Features:</p>
                            <div className="flex flex-wrap gap-2">
                                {vendor.features?.map((feature, i) => (
                                    <Badge variant="secondary" key={i}>
                                        {feature}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 space-y-6">
                    <h2 className="text-lg font-semibold">Full Description</h2>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">{vendor.full_description}</p>
                </div>

                {vendor.faqs?.length > 0 && (
                    <div className="mt-10">
                        <h2 className="mb-4 text-lg font-semibold">FAQs</h2>
                        <ul className="space-y-4">
                            {vendor.faqs.map((faq, i) => (
                                <li key={i}>
                                    <p className="font-medium">{faq.question}</p>
                                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {vendor.images?.length > 0 && (
                    <div className="mt-10">
                        <h2 className="mb-4 text-lg font-semibold">Gallery</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {vendor.images.map((src, i) => (
                                <img key={i} src={src} alt={`Image ${i + 1}`} className="rounded-md border object-cover" />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-10 flex justify-end">
                    <Button>Subscribe Now</Button>
                </div>
            </div>
        </>
    );
}
