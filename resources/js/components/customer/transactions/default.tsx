import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { useState } from 'react';

// Luhn algorithm to validate card numbers
const validateCardNumber = (num: string) => {
    const digits = num.replace(/\s/g, '');
    let sum = 0,
        shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
};

export default function TransactionDialog({ price }: { price: number }) {
    const [open, setOpen] = useState(false);

    const { data, setData, processing, post, reset, errors, setError, clearErrors } = useForm({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    // Input formatting
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formatted = value;

        if (name === 'cardNumber') {
            formatted = value
                .replace(/\D/g, '')
                .replace(/(.{4})/g, '$1 ')
                .trim()
                .slice(0, 19);
        }
        if (name === 'expiryDate') {
            formatted = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d{1,2})/, '$1/$2')
                .slice(0, 5);
        }
        if (name === 'cvv') {
            formatted = value.replace(/\D/g, '').slice(0, 4);
        }

        setData(name as keyof typeof data, formatted);
        clearErrors(name as keyof typeof data);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;

        // Validations
        if (!data.cardholderName.trim()) {
            setError('cardholderName', 'Cardholder name is required.');
            valid = false;
        }
        if (!validateCardNumber(data.cardNumber)) {
            setError('cardNumber', 'Invalid card number.');
            valid = false;
        }
        if (!/^\d{2}\/\d{2}$/.test(data.expiryDate)) {
            setError('expiryDate', 'Invalid expiry date (MM/YY).');
            valid = false;
        }
        if (data.cvv.length < 3) {
            setError('cvv', 'CVV must be 3 or 4 digits.');
            valid = false;
        }

        if (!valid) return;

        // Mock submission
        console.log('Submitting payment', data);
        post(route('transaction.store', data));

        // Here you’d call an Inertia post route
        // post('/transactions', data, { onSuccess: ... })

        setTimeout(() => {
            reset();
            setOpen(false);
        }, 1500);
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
                    <DialogTitle className="text-2xl font-bold">Complete Your Payment</DialogTitle>
                    <DialogDescription>Enter your payment details securely to subscribe</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Cardholder Name */}
                    <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                            id="cardholderName"
                            name="cardholderName"
                            placeholder="John Doe"
                            value={data.cardholderName}
                            onChange={handleInputChange}
                            className={errors.cardholderName ? 'border-destructive' : ''}
                        />
                        {errors.cardholderName && <p className="text-sm text-destructive">{errors.cardholderName}</p>}
                    </div>

                    {/* Card Number */}
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={data.cardNumber}
                            onChange={handleInputChange}
                            className={errors.cardNumber ? 'border-destructive' : ''}
                        />
                        {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
                    </div>

                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                                id="expiryDate"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={data.expiryDate}
                                onChange={handleInputChange}
                                className={errors.expiryDate ? 'border-destructive' : ''}
                            />
                            {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                value={data.cvv}
                                onChange={handleInputChange}
                                className={errors.cvv ? 'border-destructive' : ''}
                            />
                            {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Processing...' : `Pay now - PKR ${price}`}
                        </Button>
                        <Button type="button" variant="secondary" onClick={closeModal} className="w-full">
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>

                <div className="mt-4 flex items-center justify-center gap-2 border-t pt-4 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    Secured with 256-bit SSL encryption
                </div>
            </DialogContent>
        </Dialog>
    );
}
