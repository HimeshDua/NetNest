import AppLayout from '@/layouts/app-layout';
import Layout from '@/layouts/layout';
import { LayoutProps, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function ConditionalLayout({ children, breadcrumbs, title }: LayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const role = auth?.user?.role;
    if (role === 'customer') {
        return <Layout title={title}>{children}</Layout>;
    } else {
        return (
            <AppLayout title={title} breadcrumbs={breadcrumbs}>
                {children}
            </AppLayout>
        );
    }
}

export default ConditionalLayout;
