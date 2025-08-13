import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Typography } from '../ui/typography';

interface customerRequest {
    data: {
        user_id: string;
        email: string;
        name: string;
        role: string;
        location: string;
    }[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export function CustomerRequest({
    customerRequest,
    onPageChange,
    classname,
}: {
    customerRequest: customerRequest;
    onPageChange: (url: string | null) => void;
    classname: string;
}) {
    return (
        <div className={`${classname} flex flex-col gap-2.5 md:gap-1.5`}>
            <header className="ps-2 md:hidden">
                <Typography className="tracking-tight" variant="2xl/bold" as="h3">
                    Vendor Requests
                </Typography>
                <Typography variant="lg/normal" as="p">
                    Here’s what’s happening with your service today.
                </Typography>
            </header>

            {customerRequest.data.map((cr, index) => (
                <Card
                    key={index}
                    className="flex cursor-pointer flex-row items-center justify-between duration-100 hover:border hover:border-primary hover:shadow-2xl"
                >
                    <CardContent className="flex w-full flex-row justify-between truncate">
                        <CardHeader className="flex flex-row justify-between space-x-4 px-0">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/default.png" alt="Avatar" />
                                <AvatarFallback>
                                    {cr.name
                                        .split(' ')
                                        .map((n: any) => n[0])
                                        .join('')
                                        .toUpperCase()
                                        .slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{cr.name}</CardTitle>
                                <CardDescription>{cr.email}</CardDescription>
                            </div>
                        </CardHeader>
                    </CardContent>
                </Card>
            ))}

            {/* Pagination */}
            {customerRequest && customerRequest.links.length > 0 && (
                <div className="mt-3 flex flex-wrap justify-center gap-2 px-4">
                    {customerRequest.links.map((link, index) => (
                        <Button
                            variant="ghost"
                            key={index}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            disabled={!link.url}
                            onClick={() => onPageChange(link.url)}
                            className={`rounded border px-3 py-1 text-sm transition md:mx-px md:w-auto ${
                                link.active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
