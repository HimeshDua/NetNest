import CmsPage from '@/components/admin/cms-default';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function CMS() {
    const { cms } = usePage<PageProps>().props;
    return (
        <DashboardLayout title="Admin Dashboard">
            <Main className="grid space-y-6">
                <CmsPage cms={cms} />
            </Main>
        </DashboardLayout>
    );
}

export default CMS;
