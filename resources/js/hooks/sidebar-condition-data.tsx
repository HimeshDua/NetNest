import { IconBell, IconFileWord, IconHistoryToggle, IconMessageDots, IconPackage, IconReport, IconShare3 } from '@tabler/icons-react';
import { BookOpen, FileCheck, Frame, Home, Map, PieChart, SquareTerminal, UserCircle2, Users } from 'lucide-react';

export function getSidebarData(role: string | null) {
    const sharedItems = [
        {
            title: 'Support',
            url: `/${role}/support`,
            icon: BookOpen,
            items: [{ title: 'Tickets', url: `/${role}/support` }],
        },
    ];

    const navSecondary = [
        {
            title: 'Notifications',
            url: '/notifications',
            icon: IconBell,
        },
        {
            title: 'Refer a Friend',
            url: '/referral',
            icon: IconShare3,
        },
        {
            title: 'Changelog',
            url: '/changelog',
            icon: IconHistoryToggle,
        },
        {
            title: 'Feedback',
            url: '/feedback',
            icon: IconMessageDots,
        },
    ];

    if (role === 'admin') {
        return {
            navMain: [
                {
                    title: 'Dashboard',
                    url: '/admin/dashboard',
                    icon: SquareTerminal,
                    items: [
                        { title: 'Overview', url: '/admin/dashboard' },
                        { title: 'Analytics', url: '/admin/analytics' },
                    ],
                },
                {
                    title: 'Users',
                    url: '/admin/users',
                    icon: Users,
                    items: [{ title: 'User Management', url: '/admin/users' }],
                },
                {
                    title: 'Plans',
                    url: '/admin/plans',
                    icon: FileCheck,
                    items: [{ title: 'All Plans', url: '/admin/plans' }],
                },
                {
                    title: 'Billing',
                    url: '/admin/billing',
                    icon: PieChart,
                    items: [{ title: 'Invoices', url: '/admin/billing' }],
                },
                {
                    title: 'CMS',
                    url: '/admin/cms',
                    icon: Frame,
                    items: [{ title: 'Manage Pages', url: '/admin/cms' }],
                },
                ...sharedItems,
            ],
            userPages: [
                {
                    name: 'Home',
                    url: '/',
                    icon: IconReport,
                },
                {
                    name: 'Plans',
                    url: '/plans',
                    icon: IconPackage,
                },
                {
                    name: 'Word Assistant',
                    url: '#',
                    icon: IconFileWord,
                },
            ],
            navSecondary,
        };
    }

    if (role === 'vendor') {
        return {
            navMain: [
                {
                    title: 'Dashboard',
                    url: '/vendor/dashboard',
                    icon: SquareTerminal,
                    items: [{ title: 'Overview', url: '/vendor/dashboard' }],
                },
                {
                    title: 'Operations',
                    url: '/vendor/assigned-connections',
                    icon: Map,
                    items: [
                        { title: 'Package Upload', url: '/vendor/submission' },
                        { title: 'Package Edit', url: '/vendor/submission/edit' },
                    ],
                },
                {
                    title: 'Connections',
                    url: '/vendor/assigned-connections',
                    icon: Map,
                    items: [
                        { title: 'Assigned', url: '/vendor/assigned-connections' },
                        { title: 'Requests', url: '/vendor/installation-requests' },
                    ],
                },
                ...sharedItems,
            ],
            navSecondary,
        };
    }

    if (role === 'customer') {
        return {
            navMain: [
                {
                    title: 'Dashboard',
                    url: '/customer/dashboard',
                    icon: SquareTerminal,
                    items: [{ title: 'Overview', url: '/customer/dashboard' }],
                },
                {
                    title: 'Plans',
                    url: '/customer/plans',
                    icon: FileCheck,
                    items: [{ title: 'My Plans', url: '/customer/plans' }],
                },
                {
                    title: 'Billing',
                    url: '/customer/billing',
                    icon: PieChart,
                    items: [{ title: 'My Invoices', url: '/customer/billing' }],
                },
                {
                    title: 'Connection Status',
                    url: '/customer/connection-status',
                    icon: Map,
                    items: [{ title: 'Status', url: '/customer/connection-status' }],
                },
                ...sharedItems,
            ],
            navSecondary,
        };
    }

    // Guest/default fallback
    return {
        navMain: [
            {
                title: 'Home',
                url: '/',
                icon: Home,
                items: [{ title: 'Overview', url: '/' }],
            },
            {
                title: 'Plans',
                url: '/plans',
                icon: FileCheck,
                items: [{ title: 'All Plans', url: '/plans' }],
            },
            {
                title: 'Vendors',
                url: '/vendors',
                icon: Map,
                items: [{ title: 'View Vendors', url: '/vendors' }],
            },
            {
                title: 'Contact',
                url: '/contact',
                icon: UserCircle2,
                items: [{ title: 'Reach Out', url: '/contact' }],
            },
        ],
        navSecondary,
    };
}
