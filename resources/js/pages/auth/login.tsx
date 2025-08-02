import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/ui/input-error';
import TextLink from '@/components/ui/text-link';
import AuthLayout from '@/layouts/auth-layout';
import Layout from '@/layouts/layout';

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <AuthLayout title="Log in to your account" description="Access your dashboard and manage your ISP from a single place.">
                <Head title="Login" />
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                {canResetPassword && (
                                    <TextLink href={route('password.request')} className="text-sm">
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(checked: any) => setData('remember', checked as boolean)}
                            />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Log in
                    </Button>

                    <Typography as="p" variant="sm/normal" className="text-center text-muted-foreground">
                        Don’t have an account?{' '}
                        <TextLink href={route('register')} className="font-medium">
                            Sign up
                        </TextLink>
                    </Typography>

                    {status && (
                        <Typography as="p" variant="sm/medium" className="text-center text-green-600">
                            {status}
                        </Typography>
                    )}
                </form>
            </AuthLayout>
        </Layout>
    );
}
