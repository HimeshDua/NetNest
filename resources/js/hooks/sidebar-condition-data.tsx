import { IconColorFilter, IconPasswordUser } from '@tabler/icons-react';
import { FileCheck, Frame, Home, Map, MessageSquare, SquareTerminal, User, UserCircle2, Users } from 'lucide-react';

export function getSidebarData(role: string | null) {
    const navSecondary = [
        { title: 'Profile', url: route('profile.edit'), icon: User },
        { title: 'Credentials', url: route('password.edit'), icon: IconPasswordUser },
        { title: 'Appearance', url: route('appearance'), icon: IconColorFilter },
    ];
    const userPages = [
        { title: 'Home', url: route('home'), icon: Home },
        { title: 'Services', url: route('services.index'), icon: Map },
        { title: 'About', url: route('about'), icon: Map },
        { title: 'Contact', url: route('contact'), icon: UserCircle2 },
    ];

    if (role === 'admin') {
        return {
            navMain: [
                { title: 'Dashboard', url: route('admin.dashboard'), icon: SquareTerminal },
                { title: 'Users', url: route('users.index'), icon: Users },
                { title: 'Services', url: route('admin.services.index'), icon: FileCheck },
                { title: 'CMS', url: route('admin.cms.edit'), icon: Frame },
            ],
            userPages,
            navSecondary,
        };
    }

    if (role === 'vendor') {
        return {
            navMain: [
                { title: 'Dashboard', url: route('vendor.dashboard'), icon: SquareTerminal },
                { title: 'Conversations', url: route('vendor.conversations'), icon: MessageSquare },
            ],
            userPages,
            navSecondary,
        };
    }

    // Guest/default fallback
    return {
        navMain: [
            { title: 'Home', url: route('home'), icon: Home },
            { title: 'Services', url: route('services.index'), icon: Map },
            { title: 'Contact', url: route('contact'), icon: UserCircle2 },
        ],
        navSecondary,
    };
}
