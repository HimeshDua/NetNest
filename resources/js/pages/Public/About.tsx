import { Typography } from '@/components/ui/typography';
import Layout from '@/layouts/layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

function About() {
    const { aboutPage } = usePage<PageProps>().props;
    const about =  aboutPage[0].about
    return (

        <>
        <Head>
        <title>About Us - NetNest</title>
        <meta
          name="description"
          content="Learn more about NetNest, our mission, vision, and commitment to delivering innovative digital solutions for businesses worldwide."
        />
        <meta
          name="keywords"
          content="About NetNest, Company Information, Our Mission, Digital Solutions, Web Development, Laravel, React, Inertia"
        />
        <meta name="author" content="NetNest" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="About Us - NetNest" />
        <meta
          property="og:description"
          content="Discover who we are at NetNest and how we are helping businesses grow with modern web and software solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:image" content="https://yourdomain.com/images/about-og.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - NetNest" />
        <meta
          name="twitter:description"
          content="Find out more about NetNest and our mission to provide top-notch digital services."
        />
        <meta name="twitter:image" content="https://yourdomain.com/images/about-og.jpg" />
      </Head>

        <Layout title="About Us">
            <Main className="mx-auto max-w-5xl">
                    <article className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <Typography variant="4xl/bold" as="h1" className="leading-tight tracking-tight">
                                {about.title}
                            </Typography>

                            <Typography variant="base/normal" as="p" className="text-lg leading-relaxed text-muted-foreground">
                                {about.description}
                            </Typography>
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
                            <img
                                src={`/storage/${about.image}`}
                                alt="About"
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                draggable={false}
                            />
                        </div>
                    </article>
             </Main>
        </Layout>
        </>
    );
}

export default About;
