export const siteConfig = {
    name: 'NetNest',
    url: 'https://netnest.vercel.app',
    getStartedUrl: 'https://netnest.vercel.app/get-started',
    ogImage: 'https://netnest.vercel.app/og.jpg',
    description: 'NetNest is a modern ISP management system offering dashboards, billing, support, and CMS tools for growing internet providers.',
    links: {
        twitter: 'https://twitter.com/netnestISP',
        github: 'https://github.com/HimeshDua/NetNest-Laravel.12-React',
        email: 'mailto:support@netnest.io',
    },
    pricing: {
        pro: 'https://netnest.lemonsqueezy.com/buy/pro-plan',
        team: 'https://netnest.lemonsqueezy.com/buy/team-plan',
    },
    stats: {
        figma: 1200,
        github: 550,
        cli: 3400,
        total: '6.1k+',
        updated: '18 July 2025',
        sections: 38,
        illustrations: 10,
        animations: 8,
        appTemplates: 1,
        websiteTemplates: 2,
    },
};

export type SiteConfig = typeof siteConfig;
