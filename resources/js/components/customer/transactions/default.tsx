import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Shield } from 'lucide-react';

export default function TransactionDialog({ price }: { price: number }) {
    // const [formData, setFormData] = useState({
    //     cardholderName: '',
    //     cardNumber: '',
    //     expiryDate: '',
    //     cvv: '',
    // });

    const { data, setData, processing, reset, errors, clearErrors } = useForm<{
        cardholderName: Required<string>;
        cardNumber: Required<string>;
        expiryDate: Required<string>;
        cvv: Required<string>;
    }>({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        setData((prev) => ({ ...prev, [name]: formattedValue }));
        // validateField(name, formattedValue);
        console.log(data);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { cardNumber, expiryDate, cvv } = data;
        cardNumber
            .replace(/\s/g, '')
            .replace(/(.{4})/g, '$1 ')
            .trim();
        if (cardNumber.length > 19) data.cardNumber = cardNumber.slice(0, 19);

        expiryDate.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
        if (expiryDate.length > 5) data.expiryDate = expiryDate.slice(0, 5);

        cvv.replace(/\D/g, '').slice(0, 4);

        console.log(data, errors);
    };
    // Close Modal
    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger className="mt-2.5 w-full">
                <Button className="w-full">Subscribe Now</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold">Complete Your Payment</DialogTitle>
                    <DialogDescription>Enter your payment details securely below</DialogDescription>
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

                    {/* Expiry and CVV */}
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

                    <DialogFooter className="gap-2">
                        {/* <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose> */}

                        <Button type="submit" className="w-full" variant="destructive" disabled={processing}>
                            Pay now - ${price}
                        </Button>
                    </DialogFooter>
                </form>

                <div className="flex items-center justify-center gap-4 border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        Your payment is secured with 256-bit SSL encryption
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
