import Feature01 from '@/components/sections/features/feature01';
import Feature02 from '@/components/sections/features/feature02';
import HeroPage from '@/components/sections/hero/default';
import Layout from '@/layouts/layout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function home() {
    const { homePage } = usePage<PageProps>().props;

    const h = homePage?.[0];
    console.log(h);

    return (
        <Layout title="">
            <HeroPage hero={h?.hero} />
            <Feature01 dynamicfeature01Data={h?.features_primary} />
            <Feature02 />
        </Layout>
    );
}

export default home;
