import { Typography } from '@/components/ui/typography';
import Layout from '@/layouts/layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function About() {
    const { aboutPage } = usePage<PageProps>().props;

    return (
        <Layout title="About Us">
            <Main className="mx-auto max-w-5xl">
                {aboutPage.map((about, index) => (
                    <article key={index} className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <Typography variant="4xl/bold" as="h1" className="leading-tight tracking-tight">
                                {about.about_title}
                            </Typography>

                            <Typography variant="base/normal" as="p" className="text-lg leading-relaxed text-muted-foreground">
                                {about.about_description}
                            </Typography>
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
                            <img
                                src={`/storage/${about.about_image}`}
                                alt="About"
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                draggable={false}
                            />
                        </div>
                    </article>
                ))}
            </Main>
        </Layout>
    );
}

export default About;
