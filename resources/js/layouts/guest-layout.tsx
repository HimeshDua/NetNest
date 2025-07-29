import { type ReactNode } from 'react';
import Navbar from '../components/navbar/default';

interface GuestLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: GuestLayoutProps) => (
    <>
        <Navbar />
        {children}
    </>
);
