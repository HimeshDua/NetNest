import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckIcon, MinusIcon } from 'lucide-react';
import React from 'react';

interface PlanFeature {
    type: string;
    features: {
        name: string;
        essential: boolean;
        growth: boolean;
        scale: boolean;
    }[];
}

const planFeatures: PlanFeature[] = [
    {
        type: 'Vendor Access',
        features: [
            {
                name: 'Access to demo vendors only',
                essential: true,
                growth: false,
                scale: false,
            },
            {
                name: 'Verified vendors with contact info',
                essential: false,
                growth: true,
                scale: true,
            },
            {
                name: 'Switch between ISPs freely',
                essential: false,
                growth: true,
                scale: true,
            },
        ],
    },
    {
        type: 'Billing & Usage',
        features: [
            {
                name: 'Basic plan info',
                essential: true,
                growth: true,
                scale: true,
            },
            {
                name: 'Monthly usage reports',
                essential: false,
                growth: false,
                scale: true,
            },
            {
                name: 'Billing history & alerts',
                essential: false,
                growth: false,
                scale: true,
            },
        ],
    },
    {
        type: 'Support',
        features: [
            {
                name: 'Community support only',
                essential: true,
                growth: false,
                scale: false,
            },
            {
                name: 'Priority email support',
                essential: false,
                growth: true,
                scale: true,
            },
            {
                name: 'Dedicated support manager',
                essential: false,
                growth: false,
                scale: true,
            },
        ],
    },
];

export default function ComparisonSection() {
    return (
        <div className="py-12">
            {/* Desktop Table */}
            <Table className="hidden lg:table">
                <TableHeader>
                    <TableRow className="bg-muted hover:bg-muted">
                        <TableHead className="w-3/12 text-primary">Plans</TableHead>
                        <TableHead className="w-2/12 text-center text-lg font-medium text-primary">Essential</TableHead>
                        <TableHead className="w-2/12 text-center text-lg font-medium text-primary">Growth</TableHead>
                        <TableHead className="w-2/12 text-center text-lg font-medium text-primary">Scale</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {planFeatures.map((featureType) => (
                        <React.Fragment key={featureType.type}>
                            <TableRow className="bg-muted/50">
                                <TableCell colSpan={4} className="font-bold">
                                    {featureType.type}
                                </TableCell>
                            </TableRow>
                            {featureType.features.map((feature) => (
                                <TableRow key={feature.name} className="text-muted-foreground">
                                    <TableCell>{feature.name}</TableCell>
                                    <TableCell>
                                        <div className="mx-auto w-min">
                                            {feature.essential ? <CheckIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="mx-auto w-min">
                                            {feature.growth ? <CheckIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="mx-auto w-min">
                                            {feature.scale ? <CheckIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>

            {/* Mobile Table */}
            <div className="space-y-24 lg:hidden">
                {['Essential', 'Growth', 'Scale'].map((plan) => (
                    <section key={plan}>
                        <div className="mb-4">
                            <h4 className="text-xl font-medium">{plan}</h4>
                        </div>
                        <Table>
                            {planFeatures.map((featureType) => (
                                <React.Fragment key={featureType.type}>
                                    <TableRow className="bg-muted hover:bg-muted">
                                        <TableCell colSpan={2} className="w-10/12 font-bold text-primary">
                                            {featureType.type}
                                        </TableCell>
                                    </TableRow>
                                    {featureType.features.map((feature) => (
                                        <TableRow className="text-muted-foreground" key={feature.name}>
                                            <TableCell className="w-11/12">{feature.name}</TableCell>
                                            <TableCell className="text-right">
                                                {feature[plan.toLowerCase() as 'essential' | 'growth' | 'scale'] ? (
                                                    <CheckIcon className="h-5 w-5" />
                                                ) : (
                                                    <MinusIcon className="h-5 w-5" />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Table>
                    </section>
                ))}
            </div>
        </div>
    );
}
