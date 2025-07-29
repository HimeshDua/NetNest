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

export default function Navigation({
    menuItems = [
        {
            title: 'Plans',
            isLink: true,
            href: '/plans',
        },
        {
            title: 'Dashboard',
            content: 'dashboard',
        },
        {
            title: 'Support',
            isLink: true,
            href: '/support',
        },
    ],
    components = [
        {
            title: 'Connection Requests',
            href: '/dashboard/connection-requests',
            description: 'View and manage new internet connection requests submitted by users.',
        },
        {
            title: 'Billing & Invoices',
            href: '/dashboard/billing',
            description: 'Track user billing history, invoices, and payment statuses in one place.',
        },
        {
            title: 'CMS Manager',
            href: '/dashboard/cms',
            description: 'Update and publish homepage, about, and contact page content using the CMS editor.',
        },
        {
            title: 'Support Tickets',
            href: '/dashboard/support',
            description: 'Manage and reply to customer support tickets efficiently.',
        },
        {
            title: 'User Management',
            href: '/dashboard/users',
            description: 'View, edit, or remove user accounts from the platform dashboard.',
        },
        {
            title: 'Analytics',
            href: '/dashboard/analytics',
            description: 'Monitor usage stats, signups, and support metrics to make informed decisions.',
        },
    ],
    logoTitle = 'NetNest',
    logoDescription = 'ISP business dashboard and website framework designed to help you launch, manage, and scale your internet service operations.',
    logoHref = '/',
    introItems = [
        {
            title: 'Overview',
            href: '/about',
            description: 'Learn more about what NetNest does and who it’s for.',
        },
        {
            title: 'Getting Started',
            href: '/register',
            description: 'Create your account and set up your ISP dashboard in minutes.',
        },
        {
            title: 'How it works',
            href: '/how-it-works',
            description: 'See how NetNest helps you manage plans, users, support, and content.',
        },
    ],
}: NavigationProps) {
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
                                    {item.content === 'default' ? (
                                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/30 to-muted/10 p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                        href={logoHref}
                                                    >
                                                        {'Logo '}
                                                        <div className="mt-4 mb-2 text-lg font-medium">{logoTitle}</div>
                                                        <p className="text-sm leading-tight text-muted-foreground">{logoDescription}</p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            {introItems.map((intro, i) => (
                                                <ListItem key={i} href={intro.href} title={intro.title}>
                                                    {intro.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    ) : item.content === 'components' ? (
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {components.map((component) => (
                                                <ListItem key={component.title} title={component.title} href={component.href}>
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    ) : item.content === 'plans' ? (
                                        <ul className="grid w-[300px] gap-3 p-4">
                                            <ListItem href="/plans/basic" title="Basic Plan">
                                                Affordable and reliable internet access for small households.
                                            </ListItem>
                                            <ListItem href="/plans/pro" title="Pro Plan">
                                                Higher bandwidth for professionals and gamers.
                                            </ListItem>
                                            <ListItem href="/plans/business" title="Business Plan">
                                                Scalable internet packages tailored for businesses.
                                            </ListItem>
                                        </ul>
                                    ) : item.content === 'dashboard' ? (
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {components.map((component) => (
                                                <ListItem key={component.title} title={component.title} href={component.href}>
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    ) : (
                                        item.content
                                    )
                                    }
                                </NavigationMenuContent>
                            </>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function ListItem({ className, title, children, ...props }: React.ComponentProps<'a'> & { title: string }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    data-slot="list-item"
                    className={cn(
                        'block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </a>
            </NavigationMenuLink>
        </li>
    );
}
