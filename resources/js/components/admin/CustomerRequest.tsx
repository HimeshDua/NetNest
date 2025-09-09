import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Loader2, Mail, MapPin, MoreHorizontal, UserCheck, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AlertDescription } from '../ui/alert';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Typography } from '../ui/typography';

interface CustomerRequestType {
    data: {
        id: string;
        email: string;
        name: string;
        role: string;
        location: string;
        requested_at: string;
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
    customerRequest: CustomerRequestType;
    onPageChange: (url: string | null) => void;
    classname: string;
}) {
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        console.log(customerRequest.data);
    }, [customerRequest]);

    return (
        <div className={`${classname} flex flex-col gap-4`}>
            <header className="ps-2">
                <Typography className="mb-1 tracking-tight" variant="2xl/bold" as="h3">
                    Vendor Requests
                </Typography>
                <Typography variant="lg/normal" as="p" className="text-muted-foreground">
                    Review and approve vendor applications
                </Typography>
            </header>

            <div className="grid gap-3">
                {customerRequest.data.map((cr, index) => (
                    <Card key={index} className="cursor-pointer border transition-all duration-200 hover:shadow-md">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <Avatar className="h-12 w-12 border">
                                        <AvatarImage src="/avatars/default.png" alt="Avatar" />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {cr.name
                                                .split(' ')
                                                .map((n: string) => n[0])
                                                .join('')
                                                .toUpperCase()
                                                .slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-base">{cr.name}</CardTitle>
                                            <Badge variant="outline" className="text-xs">
                                                {cr.role}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Mail className="mr-1 h-3.5 w-3.5" />
                                            {cr.email}
                                        </div>

                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="mr-1 h-3.5 w-3.5" />
                                            {cr.location || 'Unknown location'}
                                        </div>

                                        {cr.requested_at && (
                                            <div className="text-xs text-muted-foreground">
                                                Requested: {new Date(cr.requested_at).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="sm" variant="outline" className="gap-1">
                                            <UserPlus className="h-4 w-4" />
                                            Review
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Approve Vendor Request</AlertDialogTitle>
                                            <div className="flex items-center space-x-3 py-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src="/avatars/default.png" alt="Avatar" />
                                                    <AvatarFallback>
                                                        {cr.name
                                                            .split(' ')
                                                            .map((n: string) => n[0])
                                                            .join('')
                                                            .toUpperCase()
                                                            .slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{cr.name}</p>
                                                    <p className="text-sm text-muted-foreground">{cr.email}</p>
                                                    <p className="text-sm text-muted-foreground">{cr.location}</p>
                                                </div>
                                            </div>
                                            <AlertDescription>
                                                Are you sure you want to approve {cr.name} as a vendor? This will grant them access to the vendor
                                                dashboard and allow them to create and manage service.
                                            </AlertDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => {
                                                    setProcessingId(cr.id);
                                                    router.patch(
                                                        route('admin.role.update'),
                                                        { user_id: cr.id, role: 'vendor' },
                                                        {
                                                            onFinish: () => setProcessingId(null),
                                                        },
                                                    );
                                                }}
                                                disabled={processingId === cr.id}
                                                className="gap-1"
                                            >
                                                {processingId === cr.id ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserCheck className="h-4 w-4" />
                                                        Approve as Vendor
                                                    </>
                                                )}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {customerRequest.links.length > 3 && (
                <div className="mt-4 flex items-center justify-between px-2">
                    <div className="text-sm text-muted-foreground">Showing {customerRequest.data.length} results</div>

                    <div className="flex items-center space-x-1">
                        {customerRequest.links.map((link, index) => {
                            if (index === 0) {
                                return (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => onPageChange(link.url)}
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                );
                            }

                            if (index === customerRequest.links.length - 1) {
                                return (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => onPageChange(link.url)}
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                );
                            }

                            if (link.label === '...') {
                                return (
                                    <Button key={index} variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                );
                            }

                            return (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => onPageChange(link.url)}
                                    disabled={!link.url}
                                >
                                    {link.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
