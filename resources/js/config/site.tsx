export const siteConfig = {
    name: 'NetNest',
    url: '/',
    getStartedUrl: '/',
    ogImage: '/',
    description: 'NetNest is a modern ISP management system offering dashboards, billing, support, and CMS tools for growing internet providers.',
    links: {
        twitter: '/',
        github: 'https://github.com/HimeshDua/NetNest-Laravel.12-React',
        email: '/',
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
