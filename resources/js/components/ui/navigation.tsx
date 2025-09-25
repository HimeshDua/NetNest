import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu';

function Navigation() {
    const { auth, isSubscribed } = usePage<PageProps>().props;
    const userRole = auth?.user?.role;

    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                {/* Guest */}
                {!userRole && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/services">Services</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/about">About</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/contact">Contact</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                )}

                {/* Admin */}
                {userRole === 'admin' && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/services">Services</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/about">About</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/contact">Contact</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                )}

                {userRole === 'vendor' && (
                    <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                            <Link href="/vendor/conversations">Conversations</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}

                {/* Customer */}
                {userRole === 'customer' && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href={route('services.index')}>Services</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href={route('customer.subscription')}>Subscriptions</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        {isSubscribed && (
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                    <Link href={route('customer.support')}>Support</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )}
                    </>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default Navigation;
