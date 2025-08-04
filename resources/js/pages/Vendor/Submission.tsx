import VendorForm from '@/components/vendor/vendor-form';
import DashboardLayout from '@/layouts/dashboard-layout';

function Submission() {
    return (
        <DashboardLayout title="Vendor Submission">
            <VendorForm />
        </DashboardLayout>
    );
}

export default Submission;
