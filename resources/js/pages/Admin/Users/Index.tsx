import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { type PageProps, type User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Building, Calendar, Download, Eye, Filter, Mail, Phone, Plus, Search, Shield, Trash2, User as UserIcon, X } from 'lucide-react';
import { useDeferredValue, useEffect, useState } from 'react';

export default function UsersIndex() {
    const { users, filters } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [isLoading, setIsLoading] = useState(false);
    const deferredSearch = useDeferredValue(search, '');
    const [pageN, setPageN] = useState(filters.page || 1);

    // Debounced filter/search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPageN(1); // reset to first page on filter change
            setIsLoading(true);

            router.get(
                route('users.index'),
                {
                    search: deferredSearch,
                    role: roleFilter !== 'none' ? roleFilter : null,
                    page: 1,
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
    }, [deferredSearch, roleFilter]);

    const handlePageChange = (url: string | null) => {
        if (!url) return;

        setIsLoading(true);

        router.get(
            url,
            {
                search,
                role: roleFilter !== 'none' ? roleFilter : null,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    const currentPage = new URL(url).searchParams.get('page');
                    if (currentPage) setPageN(parseInt(currentPage, 10));
                },
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const handleRoleChange = (id: number, role: string) => {
        router.patch(route('users.update', id), { role });
    };

    const handleDelete = (id: number) => {
        if (confirm('⚠️ Are you sure you want to delete this user? This action cannot be undone.')) {
            router.delete(route('users.destroy', id));
        }
    };

    const handleExport = () => {
        // Export functionality would go here
        console.log('Export users');
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin':
                return <Shield className="h-4 w-4" />;
            case 'vendor':
                return <Building className="h-4 w-4" />;
            default:
                return <UserIcon className="h-4 w-4" />;
        }
    };

    const getRoleBadge = (role: string) => {
        const variants = {
            admin: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
            vendor: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
            customer: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
        };

        const variant = variants[role as keyof typeof variants] || variants.customer;

        return (
            <Badge variant="secondary" className={`${variant.bg} ${variant.text} ${variant.border} gap-1`}>
                {getRoleIcon(role)}
                {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
        );
    };

    const LoadingRow = () => (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                </div>
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-6 w-20" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </TableCell>
        </TableRow>
    );

    const UserAvatar = ({ user }: { user: User }) => (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
            <span className="font-medium text-blue-600">
                {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
            </span>
        </div>
    );

    return (
        <DashboardLayout title="User Management">
            <Main className="container mx-auto space-y-6 p-6">
                <TooltipProvider>
                    {/* Header Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                            <p className="text-muted-foreground">Manage user accounts, roles, and permissions across the platform</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{users.total || users.data.length}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Admins</CardTitle>
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">{users.data.filter((u: User) => u.role === 'admin').length}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Vendors</CardTitle>
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {users.data.filter((u: User) => u.role === 'vendor').length}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Customers</CardTitle>
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">
                                        {users.data.filter((u: User) => u.role === 'customer').length}
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
                                    <CardTitle>Users</CardTitle>
                                    <CardDescription>Manage all user accounts and their roles</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={handleExport} className="gap-2">
                                        <Download className="h-4 w-4" />
                                        Export
                                    </Button>
                                    <Button className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add User
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                    <Input
                                        placeholder="Search users by name, email, phone..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                    {search && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 transform"
                                            onClick={() => setSearch('')}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                                <Select value={roleFilter} onValueChange={setRoleFilter}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <div className="flex items-center gap-2">
                                            <Filter className="h-4 w-4" />
                                            <SelectValue placeholder="All roles" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">All Roles</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="vendor">Vendor</SelectItem>
                                        <SelectItem value="customer">Customer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Users Table */}
                            <div className="mt-6 rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead className="ps-4 text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            Array.from({ length: 5 }).map((_, i) => <LoadingRow key={i} />)
                                        ) : users.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <UserIcon className="h-12 w-12 text-muted-foreground/50" />
                                                        <p>No users found</p>
                                                        {search || roleFilter ? (
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setSearch('');
                                                                    setRoleFilter('');
                                                                }}
                                                            >
                                                                Clear filters
                                                            </Button>
                                                        ) : null}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            users.data.map((user: User) => (
                                                <TableRow key={user.id} className="group hover:bg-muted/50">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <UserAvatar user={user} />
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-foreground group-hover:text-primary">
                                                                    {user.name}
                                                                </span>
                                                                <span className="text-xs text-muted-foreground">ID: {user.id}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                <Mail className="h-3 w-3 text-muted-foreground" />
                                                                <span className="text-sm">{user.email}</span>
                                                            </div>
                                                            {user.email_verified_at && (
                                                                <Badge variant="outline" className="mt-1 w-fit text-xs">
                                                                    Verified
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="h-3 w-3 text-muted-foreground" />
                                                            <span className="text-sm">{user.phone || '—'}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                            value={user.role || 'customer'}
                                                            onValueChange={(value) => handleRoleChange(user.id, value)}
                                                        >
                                                            <SelectTrigger className="w-32 border-none bg-transparent shadow-none hover:bg-accent">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="customer">Customer</SelectItem>
                                                                <SelectItem value="vendor">Vendor</SelectItem>
                                                                <SelectItem value="admin">Admin</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Calendar className="h-3 w-3" />
                                                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-center gap-1">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        onClick={() => router.get(route('users.show', user.id))}
                                                                        className="h-8 w-8 p-0"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>View Profile</TooltipContent>
                                                            </Tooltip>

                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        onClick={() => handleDelete(user.id)}
                                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Delete User</TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {users.data.length > 0 && (
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {users.from} to {users.to} of {users.total} results
                                    </div>
                                    <div className="flex gap-1">
                                        {users.links.map((link: any, idx: number) => (
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
                </TooltipProvider>
            </Main>
        </DashboardLayout>
    );
}
