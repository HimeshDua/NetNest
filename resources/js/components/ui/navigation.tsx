'use client';

import * as React from 'react';
import { ReactNode } from 'react';
import { siteConfig } from '../../config/site';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface ComponentItem {
    title: string;
    href: string;
    description: string;
}

interface MenuItem {
    title: string;
    href?: string;
    isLink?: boolean;
    content?: ReactNode;
}

interface NavigationProps {
    menuItems?: MenuItem[];
    components?: ComponentItem[];
    logo?: ReactNode;
    logoTitle?: string;
    logoDescription?: string;
    logoHref?: string;
    introItems?: {
        title: string;
        href: string;
        description: string;
    }[];
}

function Navigation() {
    const { auth } = usePage<PageProps>().props

    const userRole = auth?.user?.role;

    let menuItems: MenuItem[] = [];
    let components: ComponentItem[] = [];

    if (!userRole) {
        // Guest
        menuItems = [
            { title: 'Home', isLink: true, href: '/' },
            { title: 'Plans', isLink: true, href: '/plans' },
            { title: 'Vendors', isLink: true, href: '/vendors' },
            { title: 'Contact', isLink: true, href: '/contact' },
        ];
    } else if (userRole === 'admin') {
        menuItems = [{ title: 'Dashboard', content: 'dashboard' }];
        components = [
            {
                title: 'User Management',
                href: '/admin/users',
                description: 'Manage user accounts on the platform.',
            },
            {
                title: 'Plans',
                href: '/admin/plans',
                description: 'Create and update service plans.',
            },
            {
                title: 'Billing',
                href: '/admin/billing',
                description: 'View customer invoices and payments.',
            },
            {
                title: 'Support Tickets',
                href: '/admin/support',
                description: 'Respond to incoming support queries.',
            },
            {
                title: 'CMS Manager',
                href: '/admin/cms',
                description: 'Edit homepage, about, and contact content.',
            },
            {
                title: 'Analytics',
                href: '/admin/analytics',
                description: 'Monitor usage and performance insights.',
            },
        ];
    } else if (userRole === 'vendor') {
        menuItems = [{ title: 'Dashboard', content: 'dashboard' }];
        components = [
            {
                title: 'Assigned Connections',
                href: '/vendor/assigned-connections',
                description: 'View connection tasks assigned to you.',
            },
            {
                title: 'Installation Requests',
                href: '/vendor/installation-requests',
                description: 'Manage incoming installation jobs.',
            },
            {
                title: 'Support',
                href: '/vendor/support',
                description: 'Help customers resolve technical issues.',
            },
        ];
    } else if (userRole === 'customer') {
        menuItems = [{ title: 'Dashboard', content: 'dashboard' }];
        components = [
            {
                title: 'My Plans',
                href: '/customer/plans',
                description: 'See your current active internet plans.',
            },
            {
                title: 'Billing',
                href: '/customer/billing',
                description: 'View your invoices and make payments.',
            },
            {
                title: 'Connection Status',
                href: '/customer/connection-status',
                description: 'Track your installation or service status.',
            },
            {
                title: 'Support',
                href: '/customer/support',
                description: 'Open and track support tickets.',
            },
        ];
    }

    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                {menuItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        {item.isLink ? (
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <a href={item.href || ''}>{item.title}</a>
                            </NavigationMenuLink>
                        ) : (
                            <>
                                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function ListItem({
    className,
    title,
    children,
    ...props
}: React.ComponentProps<'a'> & { title: string }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    className={cn(
                        'block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{children}</p>
                </a>
            </NavigationMenuLink>
        </li>
    );
}

export type { MenuItem, ComponentItem };
export default Navigation;
