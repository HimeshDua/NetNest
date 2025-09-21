import ServicesNotFound from '@/components/public/vendor/notfound';
import VendorServiceGridSkeleton from '@/components/public/vendor/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Filter, Search } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';

function Vendors() {
    const { services } = usePage<any>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    const handlePageChange = (url: string | null) => {
        if (url) router.get(url);
    };

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
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 pr-4 pl-10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2" onClick={() => setFilterOpen(!filterOpen)}>
                            <Filter className="h-4 w-4" />
                            Filters
                        </Button>
                        <Button variant="outline" className="gap-2">
                            Sort By
                        </Button>
                    </div>
                </div>

                <Suspense fallback={<VendorServiceGridSkeleton />}>
                    {services.data.length ? <VendorService services={services} onPageChange={handlePageChange} /> : <ServicesNotFound />}
                </Suspense>
            </Layout>
        </>
    );
}

export default Vendors;
