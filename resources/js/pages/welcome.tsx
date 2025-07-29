import Feature01 from '@/components/sections/features/feature01';
import Feature02 from '@/components/sections/features/feature02';
import HeroPage from '@/components/sections/hero/default';
import GuestLayout from '@/layouts/guest-layout';

function welcome() {
    return (
        <>
            <GuestLayout>
                <HeroPage />
                <Feature01 />
                <Feature02 />
            </GuestLayout>
        </>
    );
}

export default welcome;
