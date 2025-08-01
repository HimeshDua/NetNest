import Feature01 from '@/components/sections/features/feature01';
import Feature02 from '@/components/sections/features/feature02';
import HeroPage from '@/components/sections/hero/default';
import Layout from '@/layouts/layout';

function welcome() {
    return (
        <Layout>
            <HeroPage />
            <Feature01 />
            <Feature02 />
        </Layout>
    );
}

export default welcome;
