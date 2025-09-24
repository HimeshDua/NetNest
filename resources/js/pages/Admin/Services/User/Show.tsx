import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Main } from '@/layouts/main';
import type { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    Building,
    Calendar,
    CheckCircle,
    Clock,
    CreditCard,
    DollarSign,
    Download,
    Edit3,
    Hash,
    Mail,
    Phone,
    Shield,
    Trash2,
    User,
} from 'lucide-react';

export default function UsersShow() {
    const { user, service } = usePage<PageProps>().props;

    const handleDelete = () => {
        if (confirm('⚠️ Are you sure you want to delete this user? This action cannot be undone.')) {
            router.delete(route('users.destroy', user.id));
        }
    };

    const handleRoleChange = (role: string) => {
        if (confirm(`Change ${user.name}'s role to ${role}?`)) {
            router.patch(route('users.update', user.id), { role });
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin':
                return <Shield className="h-4 w-4" />;
            case 'vendor':
                return <Building className="h-4 w-4" />;
            default:
                return <User className="h-4 w-4" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
            failed: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
        };

        const variant = variants[status as keyof typeof variants] || variants.pending;
        const IconComponent = variant.icon;

        return (
            <Badge variant="secondary" className={`${variant.bg} ${variant.text} gap-1`}>
                <IconComponent className="h-3 w-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatCurrency = (amount: string, currency: string) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: currency,
        }).format(parseFloat(amount));
    };

    const UserAvatar = () => (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-xl font-bold text-blue-600">
            {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
        </div>
    );

    const StatCard = ({ icon: Icon, title, value, description, className = '' }) => (
        <Card className={className}>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold">{value}</p>
                        {description && <p className="text-xs text-muted-foreground">{description}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <DashboardLayout title={`${user.name} - User Profile`}>
            <Main className="container mx-auto space-y-6 p-6">
                {/* Header Navigation */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.get(route('admin.services.show', service.id))}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
                        <p className="text-muted-foreground">Manage user account and view activity</p>
                    </div>
                </div>

                {/* User Profile Header */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div className="flex items-center gap-4">
                                <UserAvatar />
                                <div>
                                    <h2 className="text-xl font-bold">{user.name}</h2>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Badge variant="secondary" className="gap-1">
                                            {getRoleIcon(user?.role!)}
                                            {user?.role!.charAt(0).toUpperCase() + user?.role?.slice(1)}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">ID: {user.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                <Select value={user.role} onValueChange={handleRoleChange}>
                                    <SelectTrigger className="w-full sm:w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="customer">Customer</SelectItem>
                                        <SelectItem value="vendor">Vendor</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="sm">
                                    <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" size="sm" onClick={handleDelete}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{user.email}</p>
                                    <Badge
                                        variant="outline"
                                        className={`mt-1 text-xs ${user.email_verified_at ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}
                                    >
                                        {user.email_verified_at ? 'Verified' : 'Pending'}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{user.phone || 'Not provided'}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">Phone number</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">Member since</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics Grid */}
                <div className="grid gap-4 md:grid-cols-4">
                    <StatCard icon={Hash} title="User ID" value={`#${user.id}`} className="bg-muted/50" description={undefined} />
                    <StatCard icon={CreditCard} title="Total Transactions" value={user.transactions?.length || 0} description="All time" />
                    <StatCard
                        icon={DollarSign}
                        title="Total Spent"
                        value={formatCurrency((user.transactions?.reduce((sum, tx) => sum + parseFloat(tx.amount), 0) || 0).toString(), 'PKR')}
                        description="Lifetime value"
                    />
                    <StatCard
                        icon={CheckCircle}
                        title="Completed"
                        value={user.transactions?.filter((tx) => tx.status === 'completed').length || 0}
                        description="Successful payments"
                    />
                </div>

                {/* Account Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Account Information
                            </CardTitle>
                            <CardDescription>Detailed user account information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                        Active
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                    <p className="text-sm">{new Date(user.updated_at).toLocaleDateString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Email Verified</p>
                                    <p className="text-sm">{user.email_verified_at ? 'Yes' : 'No'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                                    <p className="text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Financial Overview
                            </CardTitle>
                            <CardDescription>Payment statistics and averages</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Avg. Transaction</p>
                                    <p className="text-lg font-semibold">
                                        {user.transactions?.length
                                            ? formatCurrency(
                                                  (
                                                      user.transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0) / user.transactions.length
                                                  ).toString(),
                                                  'PKR',
                                              )
                                            : formatCurrency('0', 'PKR')}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Currency</p>
                                    <p className="text-lg font-semibold">{user.transactions?.[0]?.currency || 'PKR'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                    <p className="text-lg font-semibold">{user.transactions?.filter((tx) => tx.status === 'pending').length || 0}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Failed</p>
                                    <p className="text-lg font-semibold">{user.transactions?.filter((tx) => tx.status === 'failed').length || 0}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions Section */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle>Transaction History</CardTitle>
                                <CardDescription>All transactions made by {user.name}</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export CSV
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {user.transactions?.length > 0 ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Transaction ID</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Payment Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Subscription ID</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {user.transactions.map((transaction) => (
                                            <TableRow key={transaction.id} className="hover:bg-muted/50">
                                                <TableCell className="font-mono text-sm">{transaction.transaction_reference}</TableCell>
                                                <TableCell className="font-semibold">
                                                    {formatCurrency(transaction.amount, transaction.currency)}
                                                </TableCell>
                                                <TableCell>{new Date(transaction.payment_date).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="capitalize">
                                                        {transaction.payment_method}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                                <TableCell className="text-right font-mono text-sm">
                                                    #{transaction.customer_subscription_id}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CreditCard className="mb-4 h-12 w-12 text-muted-foreground/50" />
                                <p className="text-muted-foreground">No transactions found</p>
                                <p className="mt-1 text-sm text-muted-foreground">This user hasn't made any transactions yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Main>
        </DashboardLayout>
    );
}
