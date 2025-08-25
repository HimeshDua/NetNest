import { Menu } from 'lucide-react';
import { ReactNode } from 'react';

import { siteConfig } from '../../config/site';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Navbar as NavbarComponent, NavbarLeft, NavbarRight } from '../ui/navbar';

import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { ButtonVariants } from '@/types';
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
    variant?: ButtonVariants;
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
    variant?: ButtonVariants;
    icon?: ReactNode;
    iconRight?: ReactNode;
    isForm?: boolean;
    isProfile?: boolean;
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
                    // { text: 'Plans', href: '/admin/plans' },
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
                    { text: 'Services', href: '/services' },
                    { text: 'Billings', href: '/customer/billing' },
                    { text: 'Subscription ', href: '/customer/subscription-management' },
                    // { text: 'Support', href: '/customer/support' },
                ];
                break;
        }

        switch (auth.user.role) {
            case 'admin':
                actions = [
                    {
                        text: 'Dashboard',
                        href: '/admin/dashboard',
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
                        text: 'Profile',
                        href: '/settings/profile',
                        isProfile: true,
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
            // { text: 'Plans', href: '/plans' },
            { text: 'Services', href: '/services' },
            { text: 'About', href: '/about' },
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
        <header className={cn('sticky top-0 z-50 -mb-4 px-4 pb-4', 'fade-bottom bg-background/80 backdrop-blur-lg', className)}>
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
                            action.isProfile && action.isButton ? (
                                <Button key={index} variant={action.variant || 'default'} className="text-center" asChild>
                                    <Link href={action.href}>{action.text}</Link>
                                </Button>
                            ) : action.isForm && action.isButton ? (
                                <Link
                                    className={cn(
                                        "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                                        'h-9 px-4 py-2 has-[>svg]:px-3',
                                        'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                                    )}
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </Link>
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
