import FooterWithNewsletter from '@/components/footer/default';
import { LayoutProps, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../components/navbar/default';

function Layout({ children, title }: LayoutProps) {
    const { auth } = usePage<PageProps>().props;
    return (
        <main className="mx-auto max-w-6xl">
            <Head title={title} />
            <Navbar auth={auth} />
            <section className="min-h-[64vh]">{children}</section>
            <FooterWithNewsletter />
        </main>
    );
}

export default Layout;
