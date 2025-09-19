import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Clock, ExternalLink, Loader2, Mail, MapPin, MoreHorizontal, Phone, UserCheck, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AlertDescription } from '../ui/alert';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Typography } from '../ui/typography';

interface CustomerRequestData {
    id: string;
    email: string;
    name: string;
    role: string;
    phone: string;
    location: string;
    latitude: string;
    longitude: string;
    description: string;
    created_at: string;
}

interface CustomerRequestType {
    data: CustomerRequestData[];
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
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<CustomerRequestData | null>(null);

    useEffect(() => {
        console.log('Customer Requests:', customerRequest.data);
    }, [customerRequest]);

    const handleApprove = (cr: CustomerRequestData) => {
        setProcessingId(cr.id);
        setIsLoading(true);

        router.patch(
            route('admin.role.update'),
            { user_id: cr.id, role: 'vendor' },
            {
                onFinish: () => {
                    setProcessingId(null);
                    setIsLoading(false);
                },
            },
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (customerRequest.data.length === 0) {
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

                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <UserCheck className="mb-4 h-12 w-12 text-muted-foreground/50" />
                        <Typography variant="lg/bold" as="h3" className="mb-2">
                            No pending requests
                        </Typography>
                        <Typography variant="sm/normal" as="p" className="max-w-md text-muted-foreground">
                            All vendor applications have been processed. Check back later for new requests.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className={`${classname} flex flex-col gap-4`}>
            <header className="ps-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <Typography className="mb-1 tracking-tight" variant="2xl/bold" as="h3">
                            Vendor Requests
                        </Typography>
                        <Typography variant="lg/normal" as="p" className="text-muted-foreground">
                            Review and approve vendor applications
                        </Typography>
                    </div>

                    <Badge variant="outline" className="w-fit">
                        {customerRequest.data.length} pending
                    </Badge>
                </div>
            </header>

            {/* request list */}
            <div className="grid gap-3">
                {customerRequest.data.map((cr, index) => (
                    <Card key={cr.id || index} className="group border transition-all duration-200 hover:shadow-md">
                        <CardContent className="p-4 md:p-5">
                            <div className="flex flex-col items-start justify-between gap-4">
                                <div className="flex min-w-0 flex-1 items-start space-x-4">
                                    <Avatar className="h-12 w-12 flex-shrink-0 border bg-primary/5 transition-colors group-hover:bg-primary/10">
                                        <AvatarImage src="/avatars/default.png" alt="Avatar" />
                                        <AvatarFallback className="bg-primary/10 text-primary">{getInitials(cr.name)}</AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0 flex-1 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="truncate text-base font-semibold">{cr.name}</CardTitle>
                                            <span className="hidden h-2 w-2 rounded-full bg-primary/40 sm:inline-flex" />
                                            <span className="hidden text-sm text-muted-foreground sm:block">{cr.role}</span>
                                        </div>

                                        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                                            <div className="flex min-w-0 items-center">
                                                <Mail className="mr-1.5 h-4 w-4 flex-shrink-0" />
                                                <span className="max-w-[28ch] truncate sm:max-w-[40ch]">{cr.email}</span>
                                            </div>

                                            {cr.phone && (
                                                <div className="flex min-w-0 items-center">
                                                    <Phone className="mr-1.5 h-4 w-4 flex-shrink-0" />
                                                    <span className="max-w-[20ch] truncate">{cr.phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-baseline truncate text-sm text-muted-foreground">
                                            <MapPin className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                                            <span
                                                className="xs:max-w-[18ch] block min-w-0 truncate text-wrap break-words sm:line-clamp-2 sm:max-w-[28ch] md:max-w-[40ch] lg:max-w-[56ch] xl:max-w-[72ch] 2xl:max-w-[96ch]"
                                                title={cr.location || 'Unknown location'}
                                            >
                                                {cr.location || 'Unknown location'}
                                            </span>
                                        </div>

                                        {cr.created_at && (
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Clock className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                                                Requested: {formatDate(cr.created_at)}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex w-full flex-shrink-0 items-center gap-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger className="w-full" asChild>
                                            <Button
                                                size="lg"
                                                className="cursor-pointer gap-1.5 whitespace-nowrap"
                                                onClick={() => setSelectedRequest(cr)}
                                            >
                                                <UserPlus className="h-4 w-4" />
                                                <span>Review</span>
                                            </Button>
                                        </AlertDialogTrigger>

                                        {/* Dialog: responsive width, content scrolls if tall */}
                                        <AlertDialogContent className="max-h-[99vh] max-w-3xl! overflow-y-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                                            <AlertDialogHeader>
                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                    <div className="flex min-w-0 items-start gap-3">
                                                        <Avatar className="h-14 w-14">
                                                            <AvatarImage src="/avatars/default.png" alt="Avatar" />
                                                            <AvatarFallback className="bg-primary/10 text-base text-primary">
                                                                {getInitials(cr.name)}
                                                            </AvatarFallback>
                                                        </Avatar>

                                                        <div className="min-w-0 space-y-1">
                                                            <p className="truncate text-lg font-semibold">{cr.name}</p>
                                                            <div className="flex flex-col text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                                                                <p className="max-w-[28ch] truncate text-sm">{cr.email}</p>
                                                                {cr.phone && <p className="max-w-[20ch] truncate text-sm">{cr.phone}</p>}
                                                            </div>
                                                            <div className="flex items-baseline justify-center gap-1 text-sm text-muted-foreground">
                                                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                                                <span title={cr.location || 'Unknown location'} className="max-w-[36ch] truncate">
                                                                    {cr.location || 'Unknown location'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-start gap-1.5 text-sm text-muted-foreground sm:items-end">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="h-4 w-4" />
                                                            <span>{formatDate(cr.created_at)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="h-4 w-4" />
                                                            <span className="max-w-[180px] truncate text-xs">
                                                                {cr.latitude && cr.longitude ? `${cr.latitude}, ${cr.longitude}` : 'No coordinates'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 space-y-4">
                                                    <div>
                                                        <Typography variant="sm/bold" as="h4" className="mb-2">
                                                            Additional Information
                                                        </Typography>
                                                        <div className="max-h-48 overflow-auto rounded-lg border bg-muted/20 p-4 text-sm break-words whitespace-pre-wrap">
                                                            {cr.description || 'No additional information provided.'}
                                                        </div>
                                                    </div>

                                                    <AlertDescription className="text-base">
                                                        Are you sure you want to approve <strong>{cr.name}</strong> as a vendor? This will grant them
                                                        access to the vendor dashboard and allow them to create and manage services.
                                                    </AlertDescription>
                                                </div>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
                                                    <AlertDialogCancel asChild>
                                                        <Button variant="outline" className="w-full sm:w-auto">
                                                            Cancel
                                                        </Button>
                                                    </AlertDialogCancel>

                                                    <Button
                                                        className="w-full sm:w-auto"
                                                        onClick={() => handleApprove(cr)}
                                                        disabled={processingId === cr.id}
                                                    >
                                                        {processingId === cr.id ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Processing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserCheck className="mr-2 h-4 w-4" />
                                                                Approve as Vendor
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>

                                                {cr.latitude && cr.longitude && (
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${cr.latitude},${cr.longitude}`)}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        Open in Maps
                                                    </a>
                                                )}
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {customerRequest.links.length > 3 && (
                <div className="mt-6 flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
                    <div className="text-sm text-muted-foreground">Showing {customerRequest.data.length} of many results</div>

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
                                        className="h-9 w-9 p-0"
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
                                        className="h-9 w-9 p-0"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                );
                            }

                            if (link.label === '...') {
                                return (
                                    <Button key={index} variant="ghost" size="sm" className="h-9 w-9 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                );
                            }

                            return (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    className="hidden h-9 w-9 p-0 sm:inline-flex"
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
