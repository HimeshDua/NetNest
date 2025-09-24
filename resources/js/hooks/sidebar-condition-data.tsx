import { IconBell, IconHistoryToggle, IconMessageDots, IconShare3 } from '@tabler/icons-react';
import { BookOpen, FileCheck, Frame, Home, Map, SquareTerminal, UserCircle2, Users } from 'lucide-react';

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
                { title: 'Dashboard', url: route('admin.dashboard'), icon: SquareTerminal },
                { title: 'Users', url: route('users.index'), icon: Users },
                { title: 'Services', url: route('admin.services.index'), icon: FileCheck },
                { title: 'CMS', url: route('admin.cms.edit'), icon: Frame },
            ],
            userPages: [
                { title: 'Home', url: route('home'), icon: Home },
                { title: 'Services', url: route('services.index'), icon: Map },
                { title: 'About', url: '/about', icon: Map },
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
                { title: 'Conversations', url: route('vendor.conversations'), icon: IconMessageDots },
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
