import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { PageProps, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const breadcrumbNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
    },
    {
        title: 'Password',
        href: '/settings/password',
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    if (typeof window === 'undefined') return null;
    const { auth } = usePage<PageProps>().props;
    const isCustomer = auth?.user?.role === 'customer';

    const currentPath = window.location.pathname;

    return (
        <div className="space-y-6 px-4 py-6">
            <Heading title="Settings" description="Manage your profile and account settings" />
            {/* Breadcrumbs navigation */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                {breadcrumbNavItems.map((item, index) => {
                    const isActive = currentPath === item.href;

                    return (
                        <div key={item.href} className="flex items-center">
                            <Link
                                href={item.href}
                                className={cn('transition-colors hover:text-foreground', isActive && 'font-medium text-foreground')}
                            >
                                {item.title}
                            </Link>
                            {index < breadcrumbNavItems.length - 1 && <span className="mx-2 text-muted-foreground">/</span>}
                        </div>
                    );
                })}
            </nav>
            <Separator />
            {isCustomer ? (
                <section className="flex-1 space-y-12">{children}</section>
            ) : (
                <div className="flex-1 md:max-w-3xl">
                    <section className="space-y-12">{children}</section>
                </div>
            )}
        </div>
    );
}
