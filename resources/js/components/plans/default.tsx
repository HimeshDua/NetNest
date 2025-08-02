'use client';

import { Check, MessageSquare, Sparkles, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

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

export default function PricingCard({ name, price, description, features, teamMembers, highlighted = false }: PricingTierProps) {
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
                                /6 months
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
