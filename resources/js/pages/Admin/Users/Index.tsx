import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import { type User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type props = {
    users: {
        data: User[];
        links: any;
    };
};

export default function UsersIndex() {
    const { users, filters } = usePage<props>().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('users.index'), { search: value }, { preserveState: true, replace: true });
    };

    const handleRoleChange = (id: number, role: string) => {
        router.patch(route('users.update', id), { role });
    };

    const handleDelete = (id: number) => {
        if (confirm('⚠️ Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', id));
        }
    };

    return (
        <DashboardLayout title="Admin Dashboard">
            <Main className="container mx-auto space-y-6 p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl font-semibold">User Management</h1>
                    <div className="flex w-full max-w-md gap-2">
                        <Input placeholder="Search by name, email, phone..." value={search} onChange={(e) => handleSearch(e.target.value)} />
                        {search && (
                            <Button variant="ghost" onClick={() => handleSearch('')}>
                                ✕
                            </Button>
                        )}
                    </div>
                </div>

                {/* Users Table */}
                <Card>
                    <CardContent>
                        {users.data.length === 0 ? (
                            <p className="p-4 text-sm text-muted-foreground">No users found.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table className="w-full border-collapse text-sm">
                                    <TableHeader>
                                        <TableRow className="w-full! items-baseline justify-around border-b bg-muted/50 text-center">
                                            <TableHead className="p-3">Name</TableHead>
                                            <TableHead className="p-3">Email</TableHead>
                                            <TableHead className="p-3">Phone</TableHead>
                                            <TableHead className="p-3 text-center">Actions</TableHead>
                                            <TableHead className="p-3">View</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.data.map((user: User) => (
                                            <TableRow key={user.id} className="border-b hover:bg-muted/30">
                                                <TableCell className="p-3 font-medium">{user.name}</TableCell>
                                                <TableCell className="p-3">{user.email}</TableCell>
                                                <TableCell className="p-3">{user.phone || '—'}</TableCell>
                                                <TableCell className="flex items-center justify-end gap-2 p-3 text-right">
                                                    {/* Role Selector */}
                                                    <Select value={user.role || 'null'} onValueChange={(value) => handleRoleChange(user.id, value)}>
                                                        <SelectTrigger className="w-28">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="customer">Customer</SelectItem>
                                                            <SelectItem value="vendor">Vendor</SelectItem>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    {/* Delete Button */}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        🗑
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm" onClick={() => router.get(route('users.show', user.id))}>
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-center gap-2">
                    {users.links.map((link: any, idx: number) => (
                        <Button
                            key={idx}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => link.url && router.get(link.url)}
                            disabled={!link.url}
                        >
                            {link.label.replace('&raquo;', '›').replace('&laquo;', '‹')}
                        </Button>
                    ))}
                </div>
            </Main>
        </DashboardLayout>
    );
}
