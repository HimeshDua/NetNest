import HeadingSmall from '@/components/heading-small';
import ConditionalLayout from '@/components/layout/conditionalLayout';
import { Button } from '@/components/ui/button';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEventHandler } from 'react';

export default function CardDetails({ existing }: { existing?: any }) {
    const stripe = useStripe();
    const elements = useElements();

    const { post, processing, reset, recentlySuccessful } = useForm({});

    const saveCard: FormEventHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: existing?.card_holder || 'Customer',
            },
        });

        if (error) {
            console.error(error.message);
            return;
        }

        // Post directly with payment_method_id
        post(route('card.store'), {
            data: { payment_method_id: paymentMethod.id },
            preserveScroll: true,
            onSuccess: () => {
                reset(); // clear inertia form state
                cardElement.clear(); // clear the card input
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
                            <label className="text-sm font-medium">Card</label>
                            <div className="rounded-md border p-3">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#32325d',
                                                '::placeholder': { color: '#a0aec0' },
                                            },
                                            invalid: { color: '#e53e3e' },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={!stripe || processing}>{existing ? 'Update card' : 'Save card'}</Button>

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
