import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { useState } from 'react';

export default function TransactionDialog({
    price,
    serviceId,
    package_name,
    payment_method,
}: {
    price: number;
    serviceId: number;
    payment_method: string;
    package_name: string;
}) {
    const [open, setOpen] = useState(false);

    const { data, setData, processing, post, reset, errors, clearErrors } = useForm({
        vendor_service_id: serviceId.toString(),
        package_name: package_name.toString(),
        payment_method: payment_method.toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('transaction.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    const closeModal = () => {
        reset();
        clearErrors();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">Subscribe Now</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold">Complete Your Subscription</DialogTitle>
                    <DialogDescription>
                        You’re subscribing to <b>{package_name}</b>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hidden fields */}
                    <input type="hidden" name="payment_method" value={data.payment_method} />
                    <input type="hidden" name="vendor_service_id" value={data.vendor_service_id} />
                    <input type="hidden" name="package_name" value={data.package_name} />

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? 'Processing...' : `Subscribe - PKR ${price}`}
                    </Button>
                    <Button type="button" variant="secondary" onClick={closeModal} className="w-full">
                        Cancel
                    </Button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-2 border-t pt-4 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    Secured with 256-bit SSL encryption
                </div>
            </DialogContent>
        </Dialog>
    );
}
