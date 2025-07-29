import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh items-center justify-center bg-background px-4 py-10 md:px-6">
            <Card className="w-full max-w-sm border bg-card shadow-md">
                <CardHeader className="text-center">
                    {title && (
                        <Typography as="h1" variant="lg/semibold" className="mb-1">
                            {title}
                        </Typography>
                    )}
                    {description && (
                        <Typography as="p" variant="sm/normal" className="text-muted-foreground">
                            {description}
                        </Typography>
                    )}
                </CardHeader>
                <CardContent className="pt-0">{children}</CardContent>
            </Card>
        </div>
    );
}
