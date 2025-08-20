import UserBilling from '@/components/customer/billings/default';
import Layout from '@/layouts/layout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function Billing() {
    const { billingData } = usePage<PageProps>().props;
    return (
        <Layout title="Billings">
            {/* <DashboardLayout title="Billings"> */}
            <UserBilling billingData={billingData} />
        </Layout>
    );
}

export default Billing;
