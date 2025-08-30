import Feature01 from '@/components/sections/features/feature01';
import Feature02 from '@/components/sections/features/feature02';
import HeroPage from '@/components/sections/hero/default';
import Layout from '@/layouts/layout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

function home() {
    const { homePage, seo: seodata } = usePage<PageProps>().props;
    const seo = seodata?.[0]?.seo || {
        title: 'NetNest',
        description: 'NetNest is a Internet Service Provider E-commerce Platform for both Users and Vendors with full fledged Intuitive Profile',
        keywords: 'NetNest, ISP, CMS',
    };
    // console.log(seo);
    // console.log(JSON.stringify(seo.keywords))

    const h = homePage?.[0];
    // console.log(h);

    return (
        <>
            <Head>
                <title>{seo?.title}</title>
                <meta name="description" content={seo?.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <link rel="canonical" href={window.location.href} />
            </Head>

            <Layout title="">
                <HeroPage hero={h?.hero} />
                <Feature01 dynamicfeature01Data={h?.features_primary} />
                <Feature02 />
            </Layout>
        </>
    );
}

export default home;
