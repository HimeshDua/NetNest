import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

const feature01Data = [
    {
        feature: 'Plan Management',
        description: 'Easily create, update, or delete internet packages with dynamic pricing, data limits, and speed tiers to match your market.',
    },
    {
        feature: 'Customer Dashboard',
        description: 'Let users view active plans, billing history, support tickets, and submit new connection requests from a personalized portal.',
    },
    {
        feature: 'Support Ticket System',
        description:
            'Integrated support feature allows users to raise issues and receive admin responses, ensuring better service and accountability.',
    },
];

export default function Feature01() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="mt-16 grid grid-cols-1 gap-4 rounded-lg p-6 sm:grid-cols-2 xl:grid-cols-3">
                {feature01Data.map((item) => (
                    <div
                        key={item.feature}
                        className={cn('flex flex-col gap-y-4 rounded-lg p-4 lg:p-9', 'border bg-gradient-to-b from-muted/40 to-background')}
                    >
                        <div className="size-fit rounded-lg border bg-gradient-to-b from-muted/40 to-background p-2 shadow">
                            <CheckCircle2 className="size-6 fill-primary text-white lg:size-7" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Typography as="h3" variant="xl/medium" className="capitalize">
                                {item.feature}
                            </Typography>
                            <Typography as="p" variant="base/normal" className="text-muted-foreground">
                                {item.description}
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
