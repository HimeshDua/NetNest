import ServiceFilters from '@/components/filters/default';
import VendorServiceGrid from '@/components/public/vendor/default';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';

function Services() {
    const { services, filters, cities, connectionTypes, highlights } = usePage<any>().props;

    const handlePageChange = (url: string | null) => {
        if (url) router.get(url);
    };
    return (
        <DashboardLayout title="Services">
            <div className="mb-10 pt-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">Top Vendor Services</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    Explore high-speed internet, secure VPN, dedicated lines, and more. Curated for your business and home needs.
                </p>
            </div>
            <ServiceFilters cities={cities} connectionTypes={connectionTypes} services={services} filters={filters} />
            <VendorServiceGrid services={services} onPageChange={handlePageChange} />{' '}
        </DashboardLayout>
    );
}

export default Services;
