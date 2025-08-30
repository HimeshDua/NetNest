// types/cms.d.ts

export interface Hero {
    title: string;
    subtitle: string;
    buttons: {
        text: string;
        href: string;
        variant: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link' | string;
    }[];
    mockup: {
        srcLight: file;
        srcDark: file;
        alt: string;
    };
}

export interface Feature1 {
    title: string;
    description: string;
}

export interface Feature2 {
    title: string;
    description: string;
    icon: string;
}

export interface About {
    title: string;
    description: string;
    image?: file | null;
}

export interface Testimonial {
    name: string;
    quote: string;
    avatar: string;
}

export interface Seo {
    seo: {
        title: string;
        description: string;
        keywords: string;
    };
}

export interface Cms {
    id?: number;

    hero?: Hero;

    marquee_text?: string;
    marquee_link?: string;

    features_primary?: Feature01[];
    features_secondary?: Feature02[];

    about?: About;

    testimonials?: Testimonial[];
    seo?: Seo;
}

export interface CmsYes {
    hero: Hero;

    marquee_text: string;
    marquee_link: string;

    features_primary: Feature01[];
    features_secondary: Feature02[];

    about: About;

    testimonials: Testimonial[];
    seo: Seo;
}
