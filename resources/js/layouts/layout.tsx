import FooterWithNewsletter from '@/components/footer/default';
import { Banner } from '@/components/ui/banner';
import { Section } from '@/components/ui/section';
import { LayoutProps, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../components/navbar/default';

function Layout({ children, title }: LayoutProps) {
    const { auth } = usePage<PageProps>().props;
    return (
        <>
        {auth.user && auth.user.email.length > 0 &&   
            <Banner className="bg-gradient-to-b from-blue-500 to-blue-600" />
        }
        
            <main className="mx-auto max-w-6xl">
                <Head title={title} />
                <Navbar auth={auth} />
                <Section className="min-h-[64vh]">{children}</Section>
                <FooterWithNewsletter />
            </main>
        </>
    );
}

export default Layout;
