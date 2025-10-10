import { Button } from '@/components/ui/button';
import { Mockup, MockupFrame } from '@/components/ui/mockup';
import Screenshot from '@/components/ui/screenshot';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/utils';
import { HeroCMS } from '@/types/cms-zod';

const staticDefaults: HeroCMS = {
    title: 'Build and Scale Your Internet Service with NetNest',
    subtitle:
        'NetNest helps ISPs streamline customer onboarding, manage internet plans, handle billing, and resolve support requests — all from one intuitive and efficient platform.',
    buttons: [
        { href: '/services', text: 'Get Started', variant: 'default' },
        {
            href: 'https://github.com/HimeshDua/NetNest',
            text: 'Github',
            variant: 'outline',
        },
    ],
    mockup: {
        srcLight: '/app-light.png',
        srcDark: '/app-dark.png',
        alt: 'NetNest app screenshot',
    },
};

export default function HeroPage({ hero }: { hero?: HeroCMS }) {
    const safeHero = { ...staticDefaults, ...hero };

    return (
        <Section className={cn('fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0')}>
            <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
                <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
                    <h1 className="animate-appear relative z-10 inline-block bg-linear-to-r from-foreground to-foreground bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight md:text-balance! dark:to-muted-foreground">
                        {safeHero.title}
                    </h1>
                    <p className="text-md animate-appear relative z-10 max-w-[740px] font-medium text-balance text-muted-foreground opacity-0 delay-100 sm:text-xl">
                        {safeHero.subtitle}
                    </p>
                    {safeHero.buttons && (
                        <div className="flex justify-center gap-4">
                            {safeHero.buttons.map((button, idx) => (
                                <Button key={idx} variant={button.variant || 'default'} asChild>
                                    <a href={button.href}>{button.text}</a>
                                </Button>
                            ))}
                        </div>
                    )}
                    {safeHero.mockup && (
                        <div className="relative w-full pt-12">
                            <MockupFrame size="small">
                                <Mockup>
                                    <Screenshot
                                        srcLight={hero?.mockup?.srcLight ? `/storage/${safeHero.mockup.srcLight}` : `${safeHero.mockup.srcLight}`}
                                        srcDark={hero?.mockup?.srcDark ? `/storage/${safeHero.mockup.srcDark}` : `${safeHero.mockup.srcDark}`}
                                        alt={safeHero.mockup.alt}
                                        width={1248}
                                        height={765}
                                    />
                                </Mockup>
                            </MockupFrame>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}
