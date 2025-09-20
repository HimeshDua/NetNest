import '@/css/styles/tiptap.scss';
import Layout from '@/layouts/layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

function About() {
    const { aboutPage } = usePage<PageProps>().props;
    const about = aboutPage[0].about;

    function safeHtml(content: string) {
        return content
            .split(/<br\s*\/?>/i)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => `<p>${line}</p>`)
            .join('');
    }
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
                <meta name="twitter:description" content="Find out more about NetNest and our mission to provide top-notch digital services." />
                <meta name="twitter:image" content="https://yourdomain.com/images/about-og.jpg" />
            </Head>

            <Layout title="About Us">
                <Main className="mx-auto max-w-5xl">
                    <article className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div
                            className="prose tiptap dark:prose-invert prose-sm dark:tiptap dark:prose-invert-0! max-w-none border-0! bg-background! shadow-none!"
                            dangerouslySetInnerHTML={{ __html: about.content }}
                        />

                        <div className="relative my-auto aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
                            <img
                                src={`/storage/${about.image}`}
                                alt="About"
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.005]"
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
