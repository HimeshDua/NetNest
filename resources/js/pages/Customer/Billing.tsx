import UserBilling from '@/components/billing';
import DashboardLayout from '@/layouts/dashboard-layout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function Billing() {
    const { billingData } = usePage<PageProps>().props;
    return (
        <DashboardLayout title="Billings">
            <UserBilling billingData={billingData} />
        </DashboardLayout>
    );
}

export default Billing;
