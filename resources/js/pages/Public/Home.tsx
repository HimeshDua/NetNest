import Feature01 from '@/components/sections/features/feature01';
import Feature02 from '@/components/sections/features/feature02';
import HeroPage from '@/components/sections/hero/default';
import Layout from '@/layouts/layout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function home() {
    const { homePage: h } = usePage<PageProps>().props;

    const hero = h[0].hero;
    console.log(hero);
    return (
        <Layout title="">
            <HeroPage hero={hero} />
            <Feature01 dynamicfeature01Data={h.feature1_title} />
            <Feature02 />
        </Layout>
    );
}

export default home;
