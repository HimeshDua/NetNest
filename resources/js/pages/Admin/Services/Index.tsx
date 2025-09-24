import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import type { PageProps, VendorService } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Building2, Calendar, Eye, MapPin, Plus, Power, Search, Trash2, Users, View } from 'lucide-react';
import { useDeferredValue, useEffect, useState } from 'react';

export default function ServicesIndex() {
    const { services, filters } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [isLoading, setIsLoading] = useState(false);
    const deferredSearch = useDeferredValue(search, '');
    const [pageN, setPageN] = useState(1);

    // Debounced search effect
    // Debounced search & status effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // whenever search or status changes, reset page to 1
            setPageN(1);
            setIsLoading(true);

            router.get(
                route('admin.services.index'),
                {
                    search: deferredSearch,
                    status: status !== 'none' ? status : null,
                    page: 1, // always reset to page 1
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onFinish: () => setIsLoading(false),
                },
            );
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [deferredSearch, status]);

    // Pagination handler
    const handlePageChange = (url: string | null) => {
        if (!url) return;

        router.get(
            url,
            {
                search,
                status: status !== 'none' ? status : null,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    // update pageN from response
                    const currentPage = new URL(url).searchParams.get('page');
                    if (currentPage) setPageN(parseInt(currentPage, 10));
                },
            },
        );
    };

    const handleToggle = (id: number) => {
        router.patch(route('admin.services.toggle', id));
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    const handleView = () => {
        router.get(route('services.index'));
    };

    const StatusBadge = ({ isActive }: { isActive: boolean }) => (
        <Badge
            variant={isActive ? 'default' : 'secondary'}
            className={`flex w-fit! items-center gap-1 rounded-md ${isActive ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-100'}`}
        >
            <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-destructive'}`} />
            {isActive ? 'Active' : 'Inactive'}
        </Badge>
    );

    const LoadingRow = () => (
        <TableRow>
            <TableCell colSpan={6}>
                <div className="flex items-center space-x-4 py-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );

    return (
        <DashboardLayout title="Service Management">
            <Main className="container mx-auto space-y-6 p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">Service Management</h1>
                        <p className="text-muted-foreground">Manage and monitor all internet services in your system</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{services.total || services.data.length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                                <Power className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {services.data.filter((s: VendorService) => s.is_active).length}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {services.data.reduce((sum: number, s: VendorService) => sum + s.subscribers_count, 0)}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Avg. Subscribers</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {services.data.length > 0
                                        ? Math.round(
                                              services.data.reduce((sum: number, s: VendorService) => sum + s.subscribers_count, 0) /
                                                  services.data.length,
                                          )
                                        : 0}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Filters and Actions */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle>Services</CardTitle>
                                <CardDescription>Manage all internet services and their status</CardDescription>
                            </div>
                            <Button onClick={handleView} className="gap-2">
                                <View className="h-4 w-4" />
                                View Service
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                <Input
                                    placeholder="Search services by title, city, location..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={status || 'none'} onValueChange={setStatus}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Services Table */}
                        <div className="mt-6 rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Service Information</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Subscribers</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => <LoadingRow key={i} />)
                                    ) : services.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Building2 className="h-12 w-12 text-muted-foreground/50" />
                                                    <p>No services found</p>
                                                    <Button variant="outline" onClick={handleView} className="mt-2">
                                                        <Plus className="mr-2 h-4 w-4" />
                                                        Create your first service
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        services.data.map((service: VendorService) => (
                                            <TableRow key={service.id} className="group hover:bg-muted/50">
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <div className="font-medium text-foreground group-hover:text-primary">{service.title}</div>
                                                        <div className="text-sm text-muted-foreground">by {service.vendor.name}</div>
                                                        <div className="mt-1 text-xs text-muted-foreground">{service.connection_type}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                        <span>{service.city}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-medium">{service.subscribers_count}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <StatusBadge isActive={service.is_active} />
                                                </TableCell>
                                                <TableCell>
                                                    <div
                                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                                        title={`${Math.floor((Date.now() - new Date(service.posted_date).getTime()) / (1000 * 60 * 60 * 24))} days ago`}
                                                    >
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(service.posted_date).toLocaleDateString()}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => router.get(route('admin.services.show', service.id))}
                                                            className="gap-1"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            View
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleToggle(service.id)}
                                                            className="gap-1"
                                                        >
                                                            <Power className="h-4 w-4" />
                                                            {service.is_active ? 'Deactivate' : 'Activate'}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(service.id)}
                                                            className="gap-1"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {services.data.length > 0 && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing {services.from} to {services.to} of {services.total} results
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {services.links.map((link: any, idx: number) => (
                                        <Button
                                            key={idx}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url || link.active}
                                            className="min-w-[40px]"
                                        >
                                            {link.label.replace('&raquo;', '»').replace('&laquo;', '«')}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Main>
        </DashboardLayout>
    );
}
