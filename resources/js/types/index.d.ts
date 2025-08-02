import { PageProps as InertiaPageProps } from '@inertiajs/inertia';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

//Layouts
export interface LayoutProps {
    children: ReactNode;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'vendor' | 'customer' | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PageProps extends InertiaPageProps {
    auth: {
        user?: User | null;
    };
    [key: string]: any;
}

// Vendors
export interface VendorService {
    id: string;
    title: string;
    vendorName: string;
    vendorLogo: string;
    location: string;
    connectionType: 'fiber' | 'dsl' | 'wireless';
    price: string;
    postedDate: string;
    description: string;
    highlight: 'new' | 'trending' | 'reliable' | 'popular' | undefined;
    features: string[];
}
