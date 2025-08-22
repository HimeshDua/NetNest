// types/cms.ts
export interface Marquee {
    text: string;
    link: string;
}

export interface Feature {
    title: string;
    description: string;
    icon: string;
}

export interface Testimonial {
    name: string;
    quote: string;
    avatar: string;
}

export interface FooterLink {
    name: string;
    href: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

export interface Cms {
    id?: number;

    hero_title: string;
    hero_subtitle: string;
    hero_background_image?: File | null;
    hero_background_image_path?: string;
    hero_cta_text: string;
    hero_cta_link: string;

    marquees: Marquee[];
    features_primary: Feature[];
    features_secondary: Feature[];

    about_title: string;
    about_description: string;
    about_image?: File | null;
    about_image_path?: string;

    testimonials: Testimonial[];

    meta_title: string;
    meta_description: string;
    meta_keywords: string[];

    footer_links: FooterLink[];
    social_links: SocialLink[];

    // Add this line to satisfy the FormDataType constraint
}
