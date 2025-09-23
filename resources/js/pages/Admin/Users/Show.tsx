import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import type { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: 'customer' | 'vendor' | 'admin';
    status?: 'active' | 'suspended';
    created_at: string;
    updated_at: string;
};

export default function UsersShow() {
    const { user } = usePage<PageProps>().props;

    const handleDelete = () => {
        if (confirm('⚠️ Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', user.id));
        }
    };

    const handleRoleChange = (role: string) => {
        router.patch(route('users.update', user.id), { role });
    };

    return (
        <DashboardLayout title={`User: ${user.name}`}>
            <Main className="container mx-auto space-y-6 p-6">
                {/* Header */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>User Profile</span>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => router.get(route('users.index'))}>
                                    Back
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-sm text-muted-foreground">{user.phone || 'No phone'}</p>
                            <div className="mt-2 flex gap-2">
                                <Badge>{user.role}</Badge>
                                <Badge variant={user.status === 'suspended' ? 'destructive' : 'secondary'}>{user.status || 'active'}</Badge>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => handleRoleChange('customer')}>
                                Set Customer
                            </Button>
                            <Button variant="outline" onClick={() => handleRoleChange('vendor')}>
                                Set Vendor
                            </Button>
                            <Button variant="outline" onClick={() => handleRoleChange('admin')}>
                                Set Admin
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>
                                <strong>ID:</strong> {user.id}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {user.phone || 'N/A'}
                            </p>
                            <p>
                                <strong>Role:</strong> {user.role}
                            </p>
                            <p>
                                <strong>Status:</strong> {user.status || 'active'}
                            </p>
                            <p>
                                <strong>Created:</strong> {new Date(user.created_at).toLocaleString()}
                            </p>
                            <p>
                                <strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleString()}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Future expansion: Transactions, Requests */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Transactions</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p>No transactions available. (TODO: load from backend)</p>
                        </CardContent>
                    </Card>
                </div>
            </Main>
        </DashboardLayout>
    );
}
