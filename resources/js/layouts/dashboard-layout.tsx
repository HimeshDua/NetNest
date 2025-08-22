import '@/css/global.css';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    // { title: 'CMS', href: '/dashboard/cms' },
    // { title: 'Home Page Editor', href: '/dashboard/cms/home' },
];

export default function DashboardLayout({ children, title }: { children: React.ReactNode; title: string }) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        console.log(flash);
    }, [flash]);
    return (
        <AppLayout title={title} breadcrumbs={breadcrumbs}>
            {children}
        </AppLayout>
    );
}
