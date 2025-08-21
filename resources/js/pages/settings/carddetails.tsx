import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import ConditionalLayout from '@/components/layout/conditionalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function CardDetails({ existing }: { existing?: any }) {
    const cardNumberInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, processing, reset, recentlySuccessful } = useForm({
        card_holder: existing?.card_holder || '',
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: '',
    });

    const saveCard: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('card.store'), {
            preserveScroll: true,
            onSuccess: () => reset('card_number', 'cvv'),
            onError: (errors) => {
                if (errors.card_number) {
                    reset('card_number');
                    cardNumberInput.current?.focus();
                }
            },
        });
    };

    return (
        <ConditionalLayout breadcrumbs={[]} title="Card details">
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Card details" description="Save your payment method securely for quick subscriptions" />

                    <form onSubmit={saveCard} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="card_holder">Card holder</Label>

                            <Input
                                id="card_holder"
                                value={data.card_holder}
                                onChange={(e) => setData('card_holder', e.target.value)}
                                type="text"
                                className="mt-1 block w-full"
                                placeholder="John Doe"
                            />

                            <InputError message={errors.card_holder} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="card_number">Card number</Label>

                            <Input
                                id="card_number"
                                ref={cardNumberInput}
                                value={data.card_number}
                                onChange={(e) => setData('card_number', e.target.value)}
                                type="text"
                                className="mt-1 block w-full"
                                placeholder="4242 4242 4242 4242"
                            />

                            <InputError message={errors.card_number} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="expiry_month">Expiry month</Label>
                                <Input
                                    id="expiry_month"
                                    value={data.expiry_month}
                                    onChange={(e) => setData('expiry_month', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                    placeholder="MM"
                                />
                                <InputError message={errors.expiry_month} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="expiry_year">Expiry year</Label>
                                <Input
                                    id="expiry_year"
                                    value={data.expiry_year}
                                    onChange={(e) => setData('expiry_year', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                    placeholder="YYYY"
                                />
                                <InputError message={errors.expiry_year} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cvv">CVV</Label>

                            <Input
                                id="cvv"
                                value={data.cvv}
                                onChange={(e) => setData('cvv', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                placeholder="123"
                            />

                            <InputError message={errors.cvv} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>{existing ? 'Update card' : 'Save card'}</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </ConditionalLayout>
    );
}
