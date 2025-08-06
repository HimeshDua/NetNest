// @/components/recent-sales.tsx

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RecentSubscriber {
    customer_name: string;
    customer_email: string;
    subscribed_at: string;
    next_billing_date: string;
    status: string;
}

export function RecentSales({ recentSubscribers }: { recentSubscribers: RecentSubscriber[] }) {
    return (
        <div className="space-y-8">
            {/* Map over the recentSubscribers prop to render a dynamic list */}
            {recentSubscribers.map((subscriber, index) => (
                <div key={index} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/default.png" alt="Avatar" />
                        <AvatarFallback>
                            {/* Get the first two initials from the customer's name */}
                            {subscriber.customer_name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()
                                .slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-wrap items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm leading-none font-medium">{subscriber.customer_name}</p>
                            <p className="text-sm text-muted-foreground">{subscriber.customer_email}</p>
                        </div>
                        {/* Display the subscription status */}
                        <div className="text-sm font-medium capitalize">{subscriber.status}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
