import { Main } from '@/layouts/main';
import { UserTransaction, VendorServicePackage } from '@/types';
import { Download, FileText, Settings } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';

interface billingData {
    transactions: UserTransaction[];
    customerServices: VendorServicePackage[];
}
export default function UserBilling({ billingData }: { billingData: billingData }) {
    const { transactions, customerServices } = billingData;

    // useEffect(() => {
    //     console.log('transactions', transactions);
    //     console.log('customerSubscription', customerServices);
    // }, [transactions, customerServices]);

    return (
        <Main>
            {/* Header */}
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div>
                    <h1 className="text-2xl font-semibold">Billing & Subscription</h1>
                    <p className="text-sm text-muted-foreground">Manage your subscription and billing details</p>
                </div>
                <Button variant="outline">
                    <Settings className="mr-2 size-4" />
                    Billing Settings
                </Button>
            </div>

            {/* Current Plan */}
            <Card className="mb-8 p-0">
                <CardContent className="space-y-4 p-6">
                    {customerServices.map((pkg, idx) => (
                        <div key={idx} className="rounded-lg border p-4">
                            <h3 className="text-lg font-semibold">{pkg.name}</h3>
                            <p className="line-clamp-2 text-sm text-muted-foreground">{pkg.description}</p>
                            <p className="mt-2 font-medium">
                                {pkg.currency ?? 'PKR'} {Number(pkg.price).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Payment Method */}
            {/* <Card className="mb-8 p-0">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                            <div className="space-y-1">
                                <h2 className="text-lg font-semibold">Payment Method</h2>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="size-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{transactions[0]?.payment_method || 'Not available'}</span>
                                </div>
                            </div>
                            <Button variant="outline">Update Payment Method</Button>
                        </div>
                    </CardContent>
                </Card> */}

            {/* Billing History */}
            <Card className="p-0">
                <CardContent className="p-6">
                    <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row">
                        <h2 className="text-lg font-semibold">Billing History</h2>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 size-4" />
                            Download All
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {transactions.length > 0 ? (
                            transactions.map((tx) => (
                                <div
                                    key={tx.transaction_reference || tx.customer_subscription_id}
                                    className="flex flex-col items-start justify-between gap-3 border-b py-3 last:border-0 sm:flex-row sm:items-center"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-md bg-muted p-2">
                                            <FileText className="size-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{tx.transaction_reference || 'No reference'}</p>
                                            <p className="text-sm text-muted-foreground">{new Date(tx.payment_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge
                                            variant={tx.status === 'completed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}
                                        >
                                            {tx.status}
                                        </Badge>
                                        <span className="font-medium">
                                            {tx.currency.toUpperCase()} {Number(tx.amount).toFixed(2)}
                                        </span>
                                        <Button variant="ghost" size="sm">
                                            <Download className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No billing history found.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Main>
    );
}
