import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    // { title: 'CMS', href: '/dashboard/cms' },
    // { title: 'Home Page Editor', href: '/dashboard/cms/home' },
];

export default function DashboardLayout({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            {children}
        </AppLayout>
    );
}
