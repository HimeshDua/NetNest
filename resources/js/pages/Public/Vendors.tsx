import HorizontalFilters from '@/components/filters/default';
import VendorServiceGrid from '@/components/public/vendor/default';
import Layout from '@/layouts/layout';

function Vendors() {
    return (
        <Layout>
            <div className="mb-10 pt-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">Top Vendor Services</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    Explore high-speed internet, secure VPN, dedicated lines, and more. Curated for your business and home needs.
                </p>
            </div>
            <HorizontalFilters />
            <VendorServiceGrid />
        </Layout>
    );
}

export default Vendors;
