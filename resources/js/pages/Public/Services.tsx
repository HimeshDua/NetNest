import VendorServiceGrid from '@/components/public/vendor/default';
import Layout from '@/layouts/layout';
import { Head, router, usePage } from '@inertiajs/react';

function Vendors() {
    const { services } = usePage<any>().props;

    const handlePageChange = (url: string | null) => {
        if (url) router.get(url);
    };
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
                <div className="mb-10 pt-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight">Top Vendor Services</h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Explore high-speed internet, secure VPN, dedicated lines, and more. Curated for your business and home needs.
                    </p>
                </div>
                {/* <ServiceFilters cities={cities} connectionTypes={connectionTypes} services={services} filters={filters} /> */}
                <VendorServiceGrid services={services} onPageChange={handlePageChange} />
            </Layout>
        </>
    );
}

export default Vendors;
