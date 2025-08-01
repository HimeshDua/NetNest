'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { getSidebarData } from '@/hooks/sidebar-condition-data';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';

// const data = {
//     navMain: [
//         {
//             title: 'Dashboard',
//             url: '/dashboard',
//             icon: SquareTerminal,
//             isActive: true,
//             items: [
//                 {
//                     title: 'Overview',
//                     url: '/dashboard',
//                 },
//                 {
//                     title: 'Analytics',
//                     url: '/dashboard/analytics',
//                 },
//             ],
//         },
//         {
//             title: 'Connections',
//             url: '/dashboard/connection-requests',
//             icon: Map,
//             items: [
//                 {
//                     title: 'Requests',
//                     url: '/dashboard/connection-requests',
//                 },
//                 {
//                     title: 'Active Users',
//                     url: '/dashboard/users',
//                 },
//             ],
//         },
//         {
//             title: 'Billing',
//             url: '/dashboard/billing',
//             icon: PieChart,
//             items: [
//                 {
//                     title: 'Invoices',
//                     url: '/dashboard/billing',
//                 },
//                 {
//                     title: 'Payments',
//                     url: '/dashboard/payments',
//                 },
//             ],
//         },
//         {
//             title: 'Support',
//             url: '/dashboard/support',
//             icon: BookOpen,
//             items: [
//                 {
//                     title: 'Tickets',
//                     url: '/dashboard/support',
//                 },
//                 {
//                     title: 'Responses',
//                     url: '/dashboard/support/responses',
//                 },
//             ],
//         },
//         {
//             title: 'CMS',
//             url: '/dashboard/cms',
//             icon: Frame,
//             items: [
//                 {
//                     title: 'Home Page',
//                     url: '/dashboard/cms/home',
//                 },
//                 {
//                     title: 'About Page',
//                     url: '/dashboard/cms/about',
//                 },
//                 {
//                     title: 'Contact Page',
//                     url: '/dashboard/cms/contact',
//                 },
//             ],
//         },
//         {
//             title: 'Settings',
//             url: '/dashboard/settings',
//             icon: Settings2,
//             items: [
//                 {
//                     title: 'General',
//                     url: '/dashboard/settings',
//                 },
//                 {
//                     title: 'Plans',
//                     url: '/dashboard/plans',
//                 },
//                 {
//                     title: 'Team',
//                     url: '/dashboard/settings/team',
//                 },
//             ],
//         },
//     ],

//     projects: [
//         {
//             name: 'Marketing Site',
//             url: '/dashboard/cms',
//             icon: Frame,
//         },
//         {
//             name: 'Analytics Reports',
//             url: '/dashboard/analytics',
//             icon: PieChart,
//         },
//         {
//             name: 'User Network Map',
//             url: '/dashboard/users',
//             icon: Map,
//         },
//     ],
// };

export function AppSidebar({}: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<PageProps>().props;
    const { navMain } = getSidebarData(auth?.user?.role ?? null);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
