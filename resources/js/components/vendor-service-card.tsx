// components/vendor-service-card.tsx

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';

interface VendorServiceCardProps {
    service: {
        title: string;
        vendor_name: string;
        location: string;
        connection_type: string;
        billing_cycle: string;
        price: number;
        short_description: string;
        highlight: string | null;
        posted_date: string | null;
    };
}

export function VendorServiceCard({ service }: VendorServiceCardProps) {
    return (
        <Card className="transition-shadow duration-200 hover:shadow-md">
            <CardHeader className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                    <CardTitle>
                        <Typography variant="xl/semibold" as="h3">
                            {service.title}
                        </Typography>
                    </CardTitle>
                    {service.highlight && (
                        <Badge variant="outline" className="text-xs font-medium">
                            {service.highlight}
                        </Badge>
                    )}
                </div>
                <CardDescription>
                    <Typography variant="sm/normal">{service.short_description}</Typography>
                </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="mt-4 space-y-2">
                <DetailRow label="Vendor" value={service.vendor_name} />
                <DetailRow label="Location" value={service.location} />
                <DetailRow label="Connection Type" value={service.connection_type} />
                <DetailRow label="Billing Cycle" value={service.billing_cycle} />
                <DetailRow label="Price" value={`${service.price} PKR`} />
                {service.posted_date && <DetailRow label="Posted On" value={new Date(service.posted_date).toDateString()} />}
            </CardContent>
        </Card>
    );
}

function DetailRow({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex justify-between">
            <Typography variant="sm/normal" className="text-muted-foreground">
                {label}
            </Typography>
            <Typography variant="sm/medium">{value}</Typography>
        </div>
    );
}
