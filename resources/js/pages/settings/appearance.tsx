import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import ConditionalLayout from '@/components/layout/conditionalLayout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <ConditionalLayout breadcrumbs={breadcrumbs} title="Appearance settings">
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </ConditionalLayout>
    );
}
