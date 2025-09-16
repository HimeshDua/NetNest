import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { AppLayoutProps } from '@/types';
import { Head } from '@inertiajs/react';

export default ({ children, title, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Head title={title} />
        {children}
    </AppLayoutTemplate>
);
