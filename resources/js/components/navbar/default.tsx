import { Menu } from 'lucide-react';
import { ReactNode } from 'react';

import { siteConfig } from '../../config/site';
import { cn } from '../../lib/utils';
import { Button, type ButtonProps } from '../ui/button';
import { Navbar as NavbarComponent, NavbarLeft, NavbarRight } from '../ui/navbar';

import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link, router } from '@inertiajs/react';
import Navigation from '../ui/navigation';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface NavbarLink {
    text: string;
    href: string;
}

interface NavbarActionProps {
    text: string;
    href: string;
    variant?: ButtonProps['variant'];
    icon?: ReactNode;
    iconRight?: ReactNode;
    isButton?: boolean;
}

interface NavbarProps {
    logo?: ReactNode;
    name?: string;
    homeUrl?: string;
    auth?: {
        user?: {
            name: string;
            role: 'admin' | 'vendor' | 'customer' | null;
        } | null;
    };
    actions?: NavbarActionProps[];
    showNavigation?: boolean;
    customNavigation?: ReactNode;
    className?: string;
}

interface NavbarLink {
    text: string;
    href: string;
}

interface NavbarActionProps {
    text: string;
    href: string;
    variant?: ButtonProps['variant'];
    icon?: ReactNode;
    iconRight?: ReactNode;
    isForm?: boolean;
    isButton?: boolean;
}

interface NavbarProps {
    logo?: ReactNode;
    name?: string;
    homeUrl?: string;
    auth?: {
        user?: {
            name: string;
            role: 'admin' | 'vendor' | 'customer' | null;
        } | null;
    };
    showNavigation?: boolean;
    customNavigation?: ReactNode;
    className?: string;
}

export default function Navbar({
    logo = '',
    name = 'NetNest',
    homeUrl = siteConfig.url,
    auth,
    showNavigation = true,
    customNavigation,
    className,
}: NavbarProps) {
    let roleBasedLinks: NavbarLink[] = [];
    let actions: NavbarActionProps[] = [];

    if (auth?.user) {
        switch (auth.user.role) {
            case 'admin':
                roleBasedLinks = [
                    { text: 'Dashboard', href: '/admin/dashboard' },
                    { text: 'Users', href: '/admin/users' },
                    { text: 'Plans', href: '/admin/plans' },
                    { text: 'Billing', href: '/admin/billing' },
                    { text: 'CMS', href: '/admin/cms' },
                ];
                break;

            case 'vendor':
                roleBasedLinks = [
                    { text: 'Dashboard', href: '/vendor/dashboard' },
                    { text: 'Assigned', href: '/vendor/assigned-connections' },
                    { text: 'Requests', href: '/vendor/installation-requests' },
                    { text: 'Support', href: '/vendor/support' },
                ];
                break;

            case 'customer':
                roleBasedLinks = [
                    { text: 'Dashboard', href: '/customer/dashboard' },
                    { text: 'My Plans', href: '/customer/plans' },
                    { text: 'Billing', href: '/customer/billing' },
                    { text: 'Support', href: '/customer/support' },
                    { text: 'Vendors', href: '/vendors' }, // Customer view of vendors
                ];
                break;
        }

        switch (auth.user.role) {
            case 'admin':
                actions = [
                    {
                        text: 'Dashboard',
                        href: '/dashboard',
                        isButton: true,
                        variant: 'secondary',
                    },
                    {
                        text: 'Logout',
                        href: '/logout',
                        isForm: true,
                        isButton: true,
                        variant: 'destructive',
                    },
                ];
                break;

            case 'vendor':
                actions = [
                    {
                        text: 'Profile',
                        href: '/settings/profile',
                        isButton: true,
                        variant: 'secondary',
                    },
                    {
                        text: 'Dashboard',
                        href: '/dashboard',
                        isButton: true,
                        variant: 'default',
                    },
                ];
                break;

            case 'customer':
                actions = [
                    {
                        text: 'Logout',
                        href: '/logout',
                        isButton: true,
                        variant: 'default',
                    },
                ];
                break;
        }
    } else {
        // Guest
        roleBasedLinks = [
            { text: 'Home', href: '/' },
            { text: 'Plans', href: '/plans' },
            { text: 'Vendors', href: '/vendors' },
            { text: 'Contact', href: '/contact' },
        ];

        actions = [
            { text: 'Sign In', href: '/login', isButton: false },
            {
                text: 'Get Started',
                href: '/register',
                isButton: true,
                variant: 'default',
            },
        ];
    }

    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <header className={cn('sticky top-0 z-50 -mb-4 px-4 pb-4', className)}>
            <div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
            <div className="max-w-container relative mx-auto">
                <NavbarComponent>
                    <NavbarLeft>
                        <a href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
                            {logo}
                            {name}
                        </a>
                        {showNavigation && (customNavigation || <Navigation />)}
                    </NavbarLeft>
                    <NavbarRight>
                        {actions.map((action, index) =>
                            action.isForm && action.isButton ? (
                                <Button key={index} variant={action.variant || 'default'} className="text-center" asChild>
                                    <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                                        {action.icon}
                                        {action.text}
                                        {action.iconRight}
                                    </Link>
                                </Button>
                            ) : action.isButton ? (
                                <Button key={index} variant={action.variant || 'default'} className="text-center" asChild>
                                    <Link href={action.href}>
                                        {action.icon}
                                        {action.text}
                                        {action.iconRight}
                                    </Link>
                                </Button>
                            ) : (
                                <Link key={index} href={action.href} className="hidden text-sm md:block">
                                    {action.text}
                                </Link>
                            ),
                        )}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                                    <Menu className="size-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="grid gap-6 p-8 text-lg font-medium">
                                    <Link href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
                                        {name}
                                    </Link>
                                    {roleBasedLinks.map((link, index) => (
                                        <Link key={index} href={link.href} className="text-muted-foreground hover:text-foreground">
                                            {link.text}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </NavbarRight>
                </NavbarComponent>
            </div>
        </header>
    );
}
