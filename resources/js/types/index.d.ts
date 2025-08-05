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
export type ConnectionType = 'fiber' | 'dsl' | 'wireless';
export type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly';
export type HighlightType = 'new' | 'trending' | 'reliable' | 'popular' | 'undefined';

export interface Vendor {
    question: string;
    answer: string;
}
export interface VendorFAQ {
    question: string;
    answer: string;
}

export interface VendorService {
    id: number;
    user_id: number;
    FAQ;

    title: string;
    slug: string;
    vendor_name: string;
    logo: string | null;
    location: string;

    connection_type: ConnectionType;
    price: string; // or number if parsed
    billing_cycle: BillingCycle;

    posted_date: string;
    highlight: HighlightType;

    short_description: string;
    full_description: string;

    features: string[];
    faqs: VendorFAQ[];
    images: string[];

    created_at: string;
    updated_at: string;

    // optional frontend-only field
    vendorLogo?: string;
}
