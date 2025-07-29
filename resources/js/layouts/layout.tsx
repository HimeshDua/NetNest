import FooterWithNewsletter from '@/components/footer/default';
import { type ReactNode } from 'react';
import Navbar from '../components/navbar/default';

interface LayoutProps {
    children: ReactNode;
}

export default ({ children }: LayoutProps) => (
    <main className="mx-auto max-w-6xl">
        <Navbar />
        {children}
        <FooterWithNewsletter />
    </main>
);
