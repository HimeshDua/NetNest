import { IconBell, IconHistoryToggle, IconMessageDots, IconShare3 } from '@tabler/icons-react';
import { BookOpen, FileCheck, Frame, Home, Map, PieChart, SquareTerminal, UserCircle2, Users } from 'lucide-react';

export function getSidebarData(role: string | null) {
    const sharedItems = [
        {
            title: 'Support',
            url: `/${role}/support`,
            icon: BookOpen,
        },
    ];

    const navSecondary = [
        { title: 'Notifications', url: '/notifications', icon: IconBell },
        { title: 'Refer a Friend', url: '/referral', icon: IconShare3 },
        { title: 'Changelog', url: '/changelog', icon: IconHistoryToggle },
        { title: 'Feedback', url: '/feedback', icon: IconMessageDots },
    ];

    if (role === 'admin') {
        return {
            navMain: [
                { title: 'Dashboard', url: '/admin/dashboard', icon: SquareTerminal },
                { title: 'Users', url: '/admin/users', icon: Users },
                { title: 'Plans', url: '/admin/plans', icon: FileCheck },
                { title: 'Billing', url: '/admin/billing', icon: PieChart },
                { title: 'CMS', url: '/admin/cms', icon: Frame },
                ...sharedItems,
            ],
            userPages: [
                { title: 'Home', url: '/', icon: Home },
                { title: 'Services', url: '/services', icon: Map },
                { title: 'Contact', url: '/contact', icon: UserCircle2 },
            ],
            navSecondary,
        };
    }

    if (role === 'vendor') {
        return {
            navMain: [
                { title: 'Dashboard', url: '/vendor/dashboard', icon: SquareTerminal },
                { title: 'Operations', url: '/vendor/submission', icon: Map },
                { title: 'Connections', url: '/vendor/assigned-connections', icon: Map },
                ...sharedItems,
            ],
            navSecondary,
        };
    }

    // Guest/default fallback
    return {
        navMain: [
            { title: 'Home', url: '/', icon: Home },
            { title: 'Plans', url: '/plans', icon: FileCheck },
            { title: 'Services', url: '/services', icon: Map },
            { title: 'Contact', url: '/contact', icon: UserCircle2 },
        ],
        navSecondary,
    };
}
