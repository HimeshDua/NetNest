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
                        { title: 'Overview', url: '/dashboard' },
                        { title: 'Analytics', url: '/analytics' },
                    ],
                },
                {
                    title: 'Users',
                    url: '/admin/users',
                    icon: Users,
                    items: [{ title: 'User Management', url: '/users' }],
                },
                {
                    title: 'Plans',
                    url: '/admin/plans',
                    icon: FileCheck,
                    items: [{ title: 'All Plans', url: '/plans' }],
                },
                {
                    title: 'Billing',
                    url: '/admin/billing',
                    icon: PieChart,
                    items: [{ title: 'Invoices', url: '/billing' }],
                },
                {
                    title: 'CMS',
                    url: '/admin/cms',
                    icon: Frame,
                    items: [{ title: 'Manage Pages', url: '/cms' }],
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
                    items: [{ title: 'Overview', url: '/dashboard' }],
                },
                {
                    title: 'Operations',
                    url: '/vendor/assigned-connections',
                    icon: Map,
                    items: [
                        { title: 'Package Upload', url: '/submission' },
                        { title: 'Package Edit', url: '/submission/edit' },
                    ],
                },
                {
                    title: 'Connections',
                    url: '/vendor/assigned-connections',
                    icon: Map,
                    items: [
                        { title: 'Assigned', url: '/assigned-connections' },
                        { title: 'Requests', url: '/installation-requests' },
                    ],
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
