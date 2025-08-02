export const pricingTiers = [
    {
        name: 'Essential',
        price: 'PKR 999/mo',
        description: 'View demo vendor listings and basic features to explore NetNest.',
        teamMembers: '1 user',
        features: [
            { text: 'Access to demo vendor data', included: true },
            { text: 'Community support', included: true },
            { text: 'Cannot subscribe to vendors', included: false },
            { text: 'No billing history', included: false },
            { text: 'No plan switching', included: false },
        ],
    },
    {
        name: 'Growth',
        price: 'PKR 2,499/mo',
        description: 'Access verified ISPs, live vendor listings, and get support.',
        teamMembers: 'Up to 2 users',
        highlighted: true,
        popular: true,
        features: [
            { text: 'Verified vendor contact info', included: true },
            { text: 'Subscribe to vendor plans', included: true },
            { text: 'Priority email support', included: true },
            { text: 'Can switch between ISPs', included: true },
            { text: 'Monthly usage summary', included: false },
        ],
    },
    {
        name: 'Scale',
        price: 'PKR 3,999/mo',
        description: 'For power users who want full analytics and vendor flexibility.',
        teamMembers: 'Up to 5 users',
        features: [
            { text: 'Everything in Growth plan', included: true },
            { text: 'Smart usage analytics', included: true },
            { text: 'Billing history & alerts', included: true },
            { text: 'Dedicated support manager', included: true },
            { text: 'ISP switching with zero downtime', included: true },
        ],
    },
];
