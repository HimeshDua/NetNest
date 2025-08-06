// @/components/recent-sales.tsx

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface RecentSubscriber {
    customer_name: string;
    customer_email: string;
    subscribed_at: string;
    next_billing_date: string;
    status: string;
}

export function RecentSales({ recentSubscribers }: { recentSubscribers: RecentSubscriber[] }) {
    return (
        <div className="space-y-2">
            {recentSubscribers.map((subscriber, index) => (
                <Card key={index} className="flex flex-row items-center justify-between py-4">
                    <CardContent className="flex w-full flex-row justify-between">
                        <CardHeader className="flex flex-row justify-between space-x-4 px-0">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/default.png" alt="Avatar" />
                                <AvatarFallback>
                                    {subscriber.customer_name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .toUpperCase()
                                        .slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{subscriber.customer_name}</CardTitle>
                                <CardDescription>{subscriber.customer_email}</CardDescription>
                            </div>
                        </CardHeader>
                        <Button size="sm" variant="outline" className="w-1/6 text-sm font-medium capitalize">
                            {subscriber.status}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
