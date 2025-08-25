import CmsForm from '@/components/admin/cmsForm';
// import CmsForm from '@/components/admin/cmsTestForm';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function CMS() {
    const { cms } = usePage<PageProps>().props;
    return (
        <DashboardLayout title="Central Management System">
            <Main className="grid space-y-6">
                <CmsForm cms={cms!} />
            </Main>
        </DashboardLayout>
    );
}

export default CMS;
