import { Typography } from '@/components/ui/typography';
import { CloudUpload, Lock, Server } from 'lucide-react';
const feature02Data = [
    {
        name: 'Automated User Onboarding',
        description:
            'NetNest streamlines the customer signup process with OTP/email verification, plan selection, and real-time connection request tracking.',
        icon: CloudUpload,
    },
    {
        name: 'Secure & Transparent Billing',
        description:
            'Offer customers clear billing histories and invoices with built-in payment gateways and auto-verification. Supports Stripe, Razorpay, and more.',
        icon: Lock,
    },
    {
        name: 'Robust Admin Dashboard',
        description:
            'Admins can manage users, track orders, edit CMS content, respond to support tickets, and generate reports all from one powerful interface.',
        icon: Server,
    },
];

export default function Feature02() {
    return (
        <div className="overflow-hidden bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-8">
                        <div className="lg:max-w-lg">
                            <Typography as="h2" variant="sm/semibold" className="text-primary">
                                Deploy faster
                            </Typography>

                            <Typography as="h3" variant="5xl/semibold" className="mt-2 tracking-tight text-pretty">
                                A better workflow
                            </Typography>

                            <Typography as="p" variant="lg/normal" className="mt-6 text-muted-foreground">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor
                                cupiditate blanditiis ratione.
                            </Typography>

                            <dl className="mt-10 max-w-xl space-y-8 text-muted-foreground lg:max-w-none">
                                {feature02Data.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-foreground">
                                            <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-primary" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        alt="Product screenshot"
                        src="/preview/og.jpg"
                        width={2432}
                        height={1442}
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    />
                </div>
            </div>
        </div>
    );
}
