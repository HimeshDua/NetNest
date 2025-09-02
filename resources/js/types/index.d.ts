import { PageProps as InertiaPageProps } from '@inertiajs/inertia';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { Cms, CmsYes, Seo } from './cms';

//Layouts
export interface LayoutProps {
    children: ReactNode;
    title: string;
    // role?: 'customer' | 'vendor' | 'admin' | null;
    breadcrumbs?: BreadcrumbItem[];
    [type: string]: value;
}

export interface AppLayoutProps {
    children: ReactNode;
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
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
    [key: string]: unknown;
}

export interface PageProps extends InertiaPageProps {
    auth: {
        user?: User | null;
    };
    vendor: VendorService;
    seo: Seo[];
    customerServices: VendorService[];
    subsByService: CustomerSubscription[];
    flash: { success?: string; error?: string };
    CmsProp: Cms[] | undefined;
    cms: CmsYes;
    marquee: [
        {
            marquee_text: string;
            marquee_link: string;
        },
    ];
    [key: string]: any;
}

// Vendors

export interface Vendor {
    question: string;
    answer: string;
}
export interface VendorFAQ {
    question: string;
    answer: string;
}

export type ConnectionType = 'fiber' | 'dsl' | 'wireless';
export type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly';
export type HighlightType = 'new' | 'trending' | 'reliable' | 'popular' | 'undefined';

export interface VendorServicePackage {
    name: 'Basic' | 'Standard' | 'Premium';
    price: number;
    billing_cycle: 'Monthly' | 'Quarterly' | 'Yearly';
    speed_label?: string;
    features: string[];
    description?: string;
    currency: string;
    is_popular?: boolean;
}

export interface VendorService {
    id: number;
    user_id: number;

    title: string;
    slug: string;
    city: string;
    location: string;
    posted_date: string;
    connection_type: 'fiber' | 'dsl' | 'wireless';
    highlight: 'new' | 'trending' | 'reliable' | 'popular' | 'undefined';

    short_description: string;
    full_description: string;

    packages: VendorServicePackage[];

    features: string[];
    faqs: { question: string; answer: string }[];
    images: string[];

    speed_details: string[];
    coverage_area: string;
    is_active: boolean;

    created_at: string;
    updated_at: string;

    [key: string]: unknown;
}

// User Transactions

export interface UserTransaction {
    customer_subscription_id: string;
    amount: number;
    currency: string;
    payment_date: Date;
    payment_method?: string;
    transaction_reference?: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';

    created_at: string;
    updated_at: string;

    [key: string]: unknown;
}

// Customer Subscription
export interface CustomerSubscription {
    user_id: string;
    vendor_service_id: string;
    subscribed_at: Date;
    next_billing_date: Date;
    package_name: ['Basic' | 'Standard' | 'Premium'];
    status: ['active' | 'cancelled' | 'expired'];

    created_at: string;
    updated_at: string;

    [key: string]: unknown;
}

// Button varaints
export type ButtonVariants = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
