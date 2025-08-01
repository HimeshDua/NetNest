import FooterWithNewsletter from '@/components/footer/default';
import { LayoutProps, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import Navbar from '../components/navbar/default';

function Layout({ children }: LayoutProps) {
    const { auth } = usePage<PageProps>().props;
    return (
        <main className="mx-auto max-w-6xl">
            <Navbar auth={auth} />
            {children}
            <FooterWithNewsletter />
        </main>
    );
}

export default Layout;
