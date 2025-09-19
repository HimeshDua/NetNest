import { BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// import { AlertDialogContent } from '@radix-ui/react-alert-dialog
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import ConditionalLayout from '@/components/layout/conditionalLayout';
import LogoutSection from '@/components/logout-user';
import LocationPicker, { type Location } from '@/components/shared/locationPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    latitude: number;
    longitude: number;
    location: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth, isRequestSend } = usePage<SharedData>().props;

    // console.log(isRequestSend);
    const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: auth.user.name,
        email: auth.user.email,
        latitude: 0,
        longitude: 0,
        location: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const vendorRequest = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('customer.request'));
    };

    const cleanup = useMobileNavigation();

    return (
        <ConditionalLayout breadcrumbs={breadcrumbs} title="Profile settings">
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

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

                {auth.user.role == 'customer' && !isRequestSend?.[0]?.id && (
                    <>
                        <Separator />

                        <div className="space-y-6">
                            <HeadingSmall title="Want to become a vendor?" description="Submit a request to list your services on the platform." />

                            <div className="space-y-4 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-200/10 dark:bg-blue-700/10">
                                <div className="relative space-y-0.5 text-blue-700 dark:text-blue-100">
                                    <p className="font-medium">Info</p>
                                    <p className="text-sm">
                                        Please provide your contact info and details about your service. Once approved, you’ll be able to create and
                                        manage your listings.
                                    </p>
                                </div>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Request Vendor Access</Button>
                                    </DialogTrigger>

                                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg sm:rounded-lg sm:p-6">
                                        <DialogTitle>Request Vendor Access</DialogTitle>
                                        <DialogDescription>
                                            Fill out the form below. Our team will review your request and contact you if additional verification is
                                            needed.
                                        </DialogDescription>

                                        <form className="space-y-6" onSubmit={vendorRequest}>
                                            <input type="hidden" name="email" value={data.email} />

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    className="w-full text-sm placeholder:text-accent-foreground/90"
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    required
                                                    autoComplete="tel"
                                                    placeholder="e.g. 0303-1234567"
                                                />
                                            </div>

                                            <LocationPicker
                                                onSelect={(location: Location) => {
                                                    // console.log(location);
                                                    setData('location', location.name);
                                                    setData('latitude', Number(location.lat));
                                                    setData('longitude', Number(location.lng));
                                                }}
                                            />

                                            <input type="hidden" name="latitude" value={data.latitude} />
                                            <input type="hidden" name="longitude" value={data.longitude} />

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="description">Service Description</Label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    required
                                                    placeholder="Describe your internet service, coverage, or unique offerings..."
                                                    className="w-full placeholder:text-accent-foreground/90"
                                                />
                                            </div>

                                            <InputError message={errors.email} />

                                            <DialogFooter className="gap-2">
                                                <DialogClose asChild>
                                                    <Button variant="secondary">Cancel</Button>
                                                </DialogClose>

                                                <Button disabled={processing} asChild>
                                                    <button type="submit">{processing ? 'Submitting...' : 'Submit Request'}</button>
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </>
                )}

                <Separator />

                <LogoutSection />

                <Separator />

                <DeleteUser />
            </SettingsLayout>
        </ConditionalLayout>
    );
}
