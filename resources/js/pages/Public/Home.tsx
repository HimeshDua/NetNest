import Feature01 from '@/components/sections/features/feature01';
import Feature02 from '@/components/sections/features/feature02';
import HeroPage from '@/components/sections/hero/default';
import Layout from '@/layouts/layout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { log } from 'console';
import { Title, Meta, Link } from "react-head";

 
function home() {
    const { homePage , seo : seodata  } = usePage<PageProps>().props;
    const seo = seodata[0].seo; 
    console.log(seo)
    // console.log(JSON.stringify(seo.keywords))
   
    console.log(seo.keywords.map((k, index)=>k))
    const h = homePage?.[0];
    console.log(h);

    return (
        <>
        
         <Title>{seo.title}</Title>
      <Meta name="description" content={seo.description} />
      
      <Meta name="keywords" content={seo.keywords?.length ? seo.keywords.join(', ') :"NetNest, ISP, CMS"} />
      <Meta property="og:title" content={seo.title} />
      <Meta property="og:description" content={seo.description} />
      {/* <Meta property="og:image" content={seo.image} /> */}
      <Link rel="canonical" href={window.location.href} />

      
        <Layout title="">
            <HeroPage hero={h?.hero} />
            <Feature01 dynamicfeature01Data={h?.features_primary} />
            <Feature02 />
        </Layout>
        </>
    );
}

export default home;
