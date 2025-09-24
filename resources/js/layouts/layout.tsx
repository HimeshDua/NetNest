import FooterWithNewsletter from '@/components/footer/default';
import { Banner } from '@/components/ui/banner';
import { Section } from '@/components/ui/section';
import { Toaster } from '@/components/ui/sonner';
import { LayoutProps, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Navbar from '../components/navbar/default';

function Layout({ children, title }: LayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.info) toast.info(flash.info);
        if (flash?.warning) toast.warning(flash.warning);
        // console.log(flash);
    }, [flash]);

    return (
        <>
            <Banner className="bg-gradient-to-b from-blue-500 to-blue-600" />
            <main className="relative mx-auto max-w-6xl">
                <Head title={title} />
                <Navbar auth={auth} />
                <Section className="min-h-[64vh]">
                    {children}
                    <Toaster
                        expand
                        swipeDirections={['bottom', 'left', 'top']}
                        richColors
                        containerAriaLabel="PopUp Container"
                        position="bottom-right"
                    />
                </Section>
                <FooterWithNewsletter />
            </main>
        </>
    );
}

export default Layout;
