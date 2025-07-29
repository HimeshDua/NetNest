'use client';

import { Check, MessageSquare, Sparkles, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const pricingTiers = [
    {
        name: 'Essential',
        price: '$2,900',
        description: 'For businesses ready to level up their digital presence with a professional website and brand identity.',
        teamMembers: '2 Team members',
        features: [
            { text: '1 active project at a time', included: true },
            { text: 'Web design & development', included: true },
            { text: 'Basic brand design', included: true },
            { text: 'Monthly design iterations', included: true },
            { text: 'Response within 48h', included: true },
            { text: '3-month minimum commitment', included: true },
        ],
    },
    {
        name: 'Growth',
        price: '$4,900',
        description: 'For companies who need ongoing design and development across web, brand, and product.',
        teamMembers: '3 Team members',
        highlighted: true,
        popular: true,
        features: [
            { text: '2 active projects at a time', included: true },
            { text: 'Product design', included: true },
            { text: 'Full brand identity', included: true },
            { text: 'Weekly design iterations', included: true },
            { text: 'Response within 24h', included: true },
            { text: '2-month minimum commitment', included: true },
        ],
    },
    {
        name: 'Scale',
        price: '$7,900',
        description: 'For established businesses who need a dedicated team to handle all their digital needs.',
        teamMembers: 'Unlimited Team members',
        features: [
            { text: '3 active projects at a time', included: true },
            { text: 'Advanced motion graphics', included: true },
            { text: 'Full brand strategy', included: true },
            { text: 'Unlimited design iterations', included: true },
            { text: 'Same-day response', included: true },
            { text: '1-month minimum commitment', included: true },
        ],
    },
];

export default function PricingPage() {
    return (
        <div className="relative">
            <div className="mx-auto max-w-7xl px-4 py-24">
                <div className="mx-auto mb-20 max-w-2xl text-center">
                    <Typography as="h1" variant="5xl/bold" className="tracking-tight text-foreground">
                        Start growing today
                    </Typography>

                    <Typography as="p" variant="lg/normal" className="mt-6 leading-8 text-muted-foreground">
                        Choose a plan that fits your needs. Get access to our team of designers and developers ready to help you grow.
                    </Typography>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {pricingTiers.map((tier) => (
                        <PricingCard key={tier.name} {...tier} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Typography as="p" variant="sm/normal" className="text-muted-foreground">
                        All plans include unlimited revisions, priority support, and a satisfaction guarantee.
                    </Typography>
                </div>
            </div>
        </div>
    );
}

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingTierProps {
    name: string;
    price: string;
    description: string;
    features: PricingFeature[];
    teamMembers: string;
    highlighted?: boolean;
    popular?: boolean;
}

function PricingCard({ name, price, description, features, teamMembers, highlighted = false }: PricingTierProps) {
    return (
        <div className="h-full transition-transform duration-300 hover:-translate-y-3">
            <Card
                className={cn('relative h-full overflow-hidden', {
                    'border-2 border-primary shadow-2xl': highlighted,
                })}
            >
                <CardHeader className="space-y-2 pt-6 pb-8">
                    <div className="space-y-1.5">
                        <Typography as="h3" variant="lg/semibold" className="tracking-tight">
                            {name}
                        </Typography>
                        <div className="flex items-baseline gap-1">
                            <Typography as="span" variant="4xl/bold">
                                {price}
                            </Typography>
                            <Typography as="span" variant="sm/normal" className="text-muted-foreground">
                                /month
                            </Typography>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <Button
                        className={`w-full ${highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                        variant={highlighted ? 'default' : 'outline'}
                    >
                        {highlighted && <Sparkles className="mr-2 h-4 w-4" />}
                        Get Started Today
                    </Button>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span>Slack communication</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{teamMembers}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className={`flex items-start gap-2 ${feature.included ? '' : 'text-muted-foreground'}`}>
                                <Check className={`h-4 w-4 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`} />
                                <span className="text-sm">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
