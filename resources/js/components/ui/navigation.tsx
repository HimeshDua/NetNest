'use client';

import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import * as React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

// Define reusable ListItem
function ListItem({ className, title, children, ...props }: React.ComponentProps<'a'> & { title: string }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    className={cn(
                        'block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm leading-none font-medium">{title}</div>
                    {children && <p className="line-clamp-2 text-sm text-muted-foreground">{children}</p>}
                </a>
            </NavigationMenuLink>
        </li>
    );
}

function Navigation() {
    const { auth } = usePage<PageProps>().props;
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
                        {/* <NavigationMenuItem>
                            <NavigationMenuTrigger>Admin Panel</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                                    <ListItem href="/plans" title="Plans">
                                        Manage and configure internet plans.
                                    </ListItem>
                                    <ListItem href="/services" title="Services">
                                        Oversee and approve vendor services.
                                    </ListItem>
                                    <ListItem href="/users" title="Users">
                                        Manage customer and vendor accounts.
                                    </ListItem>
                                    <ListItem href="/reports" title="Reports">
                                        View overall platform statistics.
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem> */}

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

                {/* Vendor */}
                {userRole === 'vendor' && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Vendor Dashboard</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                                    <ListItem href="/vendor/assigned-connections" title="Assigned Connections">
                                        View and manage your assigned customer connections.
                                    </ListItem>
                                    <ListItem href="/vendor/services" title="My Services">
                                        Manage your published internet services.
                                    </ListItem>
                                    <ListItem href="/vendor/requests" title="Requests">
                                        See and respond to customer installation requests.
                                    </ListItem>
                                    <ListItem href="/vendor/support" title="Support">
                                        Assist customers and resolve issues.
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </>
                )}

                {/* Customer */}
                {userRole === 'customer' && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/services">Services</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/billing">Billings</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/subscription">Subscriptions</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default Navigation;
