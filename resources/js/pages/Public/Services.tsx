import ServicesNotFound from '@/components/public/vendor/notfound';
import ServiceLocationFetcher from '@/components/public/vendor/ServiceLocationFetcher';
import VendorServiceGridSkeleton from '@/components/public/vendor/skeleton';
import type { Location } from '@/components/shared/locationPicker';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/layout';
import type { VendorService } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { object } from 'zod';

function Vendors() {
    const { services } = usePage<any>().props;
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [location, setLocation] = useState<Location>();
    const [query, setQuery] = useState('');

    const handlePageChange = (url: string | null) => {
        if (url) router.get(url);
    };

    const handleLocationSelect = (location: Location) => {
        setUserLocation(location);
        router.get(
            route('services.index'),
            {
                lat: location.lat,
                lng: location.lng,
                radius: 20,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const filteredServices = useMemo(() => {
        if (!query.trim()) return services;
        const lower = query.toLowerCase();
        return {
            ...services,
            data: services.data.filter(
                (s: VendorService) =>
                    s.title.toLowerCase().includes(lower) ||
                    s.short_description.toLowerCase().includes(lower) ||
                    s.full_description.toLowerCase().includes(lower),
            ),
        };
    }, [query, services]);

    useEffect(() => {
        const storedLocation = localStorage.getItem('location');
        if (storedLocation) {
            setLocation(JSON.parse(storedLocation));
        }
    }, []);

    const VendorService = lazy(() => import('@/components/public/vendor/default'));
    return (
        <>
            <Head>
                <title>Our Services - NetNest</title>
                <meta
                    name="description"
                    content="Discover professional web development, mobile app development, and digital solutions with NetNest. We deliver modern, scalable, and user-friendly services tailored to your needs."
                />
                <meta
                    name="keywords"
                    content="NetNest services, web development, mobile app development, React, Laravel, digital solutions, software development, SEO services"
                />
                <meta name="author" content="NetNest" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph (Facebook, LinkedIn) */}
                <meta property="og:title" content="Our Services - NetNest" />
                <meta
                    property="og:description"
                    content="Explore NetNest’s professional web development, mobile app development, and digital solutions."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourdomain.com/services" />
                <meta property="og:image" content="https://yourdomain.com/images/services-banner.jpg" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Services - NetNest" />
                <meta
                    name="twitter:description"
                    content="Explore NetNest’s professional web development, mobile app development, and digital solutions."
                />
                <meta name="twitter:image" content="https://yourdomain.com/images/services-banner.jpg" />
            </Head>

            <Layout title="Services">
                <div className="mb-10 pt-8 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">Top Vendor Services</h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Explore high-speed internet, secure VPN, dedicated lines, and more. Curated for your business and home needs.
                    </p>
                </div>
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search services..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full py-2 pr-4 pl-10"
                        />
                    </div>

                    {/* Filters + Location */}
                    <div className="mt-2 flex-row gap-2 space-y-2 md:mt-0 md:flex">
                        <ServiceLocationFetcher onSelect={handleLocationSelect} />
                        {userLocation ? (
                            <Badge className="h-9 w-fit rounded-md px-4 py-2 whitespace-nowrap" variant="outline">
                                📍 {String(userLocation.name.split(',').splice(-8, 4).join(','))}
                            </Badge>
                        ) : location && typeof object(location) ? (
                            <Badge className="h-9 w-fit rounded-md px-4 py-2 whitespace-nowrap" variant="outline">
                                📍 {location.name.split(',').splice(-8, 4).join(',')}
                            </Badge>
                        ) : null}
                    </div>
                </div>

                <Suspense fallback={<VendorServiceGridSkeleton />}>
                    {filteredServices.data.length ? (
                        <VendorService services={filteredServices} onPageChange={handlePageChange} />
                    ) : (
                        <ServicesNotFound />
                    )}
                </Suspense>
            </Layout>
        </>
    );
}

export default Vendors;
