import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import Github from '@/components/logos/github';
import { Button, type ButtonProps } from '@/components/ui/button';
import Glow from '@/components/ui/glow';
import { Mockup, MockupFrame } from '@/components/ui/mockup';
import Screenshot from '@/components/ui/screenshot';
import { Section } from '@/components/ui/section';

interface HeroButtonProps {
    href: string;
    text: string;
    variant?: ButtonProps['variant'];
    icon?: ReactNode;
    iconRight?: ReactNode;
}

interface HeroProps {
    title?: string;
    description?: string;
    mockup?: ReactNode | false;
    badge?: ReactNode | false;
    buttons?: HeroButtonProps[] | false;
    className?: string;
}

export default function HeroPage({
    title = 'Build and Scale Your Internet Service with NetNest',

    description = 'NetNest helps ISPs streamline customer onboarding, manage internet plans, handle billing, and resolve support requests — all from one intuitive and efficient platform.',
    mockup = (
        <Screenshot srcLight="/app-light.png" srcDark="/app-dark.png" alt="Launch UI app screenshot" width={1248} height={765} className="w-full" />
    ),
    buttons = [
        {
            href: 'https://www.launchuicomponents.com/',
            text: 'Get Started',
            variant: 'default',
        },
        {
            href: 'https://www.launchuicomponents.com/',
            text: 'Github',
            variant: 'glow',
            icon: <Github className="mr-2 size-4" />,
        },
    ],
    className,
}: HeroProps) {
    return (
        <Section className={cn('fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0', className)}>
            <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
                <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
                    <h1 className="animate-appear relative z-10 inline-block bg-linear-to-r from-foreground to-foreground bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight md:text-balance! dark:to-muted-foreground">
                        {title}
                    </h1>
                    <p className="text-md animate-appear relative z-10 max-w-[740px] font-medium text-balance text-muted-foreground opacity-0 delay-100 sm:text-xl">
                        {description}
                    </p>
                    {buttons !== false && buttons.length > 0 && (
                        <div className="animate-appear relative z-10 flex justify-center gap-4 opacity-0 delay-300">
                            {buttons.map((button, index) => (
                                <Button key={index} variant={button.variant || 'default'} size="lg" asChild>
                                    <a href={button.href}>
                                        {button.icon}
                                        {button.text}
                                        {button.iconRight}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    )}
                    {mockup !== false && (
                        <div className="relative w-full pt-12">
                            <MockupFrame className="animate-appear opacity-0 delay-700" size="small">
                                <Mockup type="responsive" className="w-full rounded-xl border-0 bg-background/90">
                                    {mockup}
                                </Mockup>
                            </MockupFrame>
                            <Glow variant="top" className="animate-appear-zoom opacity-0 delay-1000" />
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}
