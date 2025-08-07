import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

type TypographyFontSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

type TypographyFontWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

// extend type of props to include html attributes for the element
interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
    as?: React.ElementType;
    href?: string;
    variant?: `${TypographyFontSize}/${TypographyFontWeight}`;
}

const typographyVariants = cva('font-normal text-foreground', {
    variants: {
        variant: {
            // xs
            'xs/normal': 'text-xs font-normal',
            'xs/medium': 'text-xs font-medium',
            'xs/semibold': 'text-xs font-semibold',
            'xs/bold': 'text-xs font-bold',
            'xs/extrabold': 'text-xs font-extrabold',

            // sm
            'sm/normal': 'text-xs font-normal sm:text-sm',
            'sm/medium': 'text-xs font-medium sm:text-sm',
            'sm/semibold': 'text-xs font-semibold sm:text-sm',
            'sm/bold': 'text-xs font-bold sm:text-sm',
            'sm/extrabold': 'text-xs font-extrabold sm:text-sm',

            // base
            'base/normal': 'text-sm font-normal sm:text-md',
            'base/medium': 'text-sm font-medium sm:text-md',
            'base/semibold': 'text-sm font-semibold sm:text-md',
            'base/bold': 'text-sm font-bold sm:text-md',
            'base/extrabold': 'text-sm font-extrabold sm:text-md',

            // md
            'md/normal': 'text-sm font-normal md:text-md',
            'md/medium': 'text-sm font-medium md:text-md',
            'md/semibold': 'text-sm font-semibold md:text-md',
            'md/bold': 'text-sm font-bold md:text-md',
            'md/extrabold': 'text-sm font-extrabold md:text-md',

            // lg
            'lg/normal': 'text-md font-normal md:text-lg',
            'lg/medium': 'text-md font-medium md:text-lg',
            'lg/semibold': 'text-md font-semibold md:text-lg',
            'lg/bold': 'text-md font-bold md:text-lg',
            'lg/extrabold': 'text-md font-extrabold md:text-lg',

            // xl
            'xl/normal': 'text-lg font-normal md:text-xl',
            'xl/medium': 'text-lg font-medium md:text-xl',
            'xl/semibold': 'text-lg font-semibold md:text-xl',
            'xl/bold': 'text-lg font-bold md:text-xl',
            'xl/extrabold': 'text-lg font-extrabold md:text-xl',

            // 2xl
            '2xl/normal': 'text-lg font-normal sm:text-xl md:text-2xl',
            '2xl/medium': 'text-lg font-medium sm:text-xl md:text-2xl',
            '2xl/semibold': 'text-lg font-semibold sm:text-xl md:text-2xl',
            '2xl/bold': 'text-lg font-bold sm:text-xl md:text-2xl',
            '2xl/extrabold': 'text-lg font-extrabold sm:text-xl md:text-2xl',

            // 3xl
            '3xl/normal': 'text-xl font-normal sm:text-2xl md:text-3xl',
            '3xl/medium': 'text-xl font-medium sm:text-2xl md:text-3xl',
            '3xl/semibold': 'text-xl font-semibold sm:text-2xl md:text-3xl',
            '3xl/bold': 'text-xl font-bold sm:text-2xl md:text-3xl',
            '3xl/extrabold': 'text-xl font-extrabold sm:text-2xl md:text-3xl',

            // 4xl
            '4xl/normal': 'text-2xl font-normal sm:text-3xl md:text-4xl',
            '4xl/medium': 'text-2xl font-medium sm:text-3xl md:text-4xl',
            '4xl/semibold': 'text-2xl font-semibold sm:text-3xl md:text-4xl',
            '4xl/bold': 'text-2xl font-bold sm:text-3xl md:text-4xl',
            '4xl/extrabold': 'text-2xl font-extrabold sm:text-3xl md:text-4xl',

            // 5xl
            '5xl/normal': 'text-3xl font-normal sm:text-4xl md:text-5xl',
            '5xl/medium': 'text-3xl font-medium sm:text-4xl md:text-5xl',
            '5xl/semibold': 'text-3xl font-semibold sm:text-4xl md:text-5xl',
            '5xl/bold': 'text-3xl font-bold sm:text-4xl md:text-5xl',
            '5xl/extrabold': 'text-3xl font-extrabold sm:text-4xl md:text-5xl',

            // 6xl
            '6xl/normal': 'text-4xl font-normal sm:text-5xl md:text-6xl',
            '6xl/medium': 'text-4xl font-medium sm:text-5xl md:text-6xl',
            '6xl/semibold': 'text-4xl font-semibold sm:text-5xl md:text-6xl',
            '6xl/bold': 'text-4xl font-bold sm:text-5xl md:text-6xl',
            '6xl/extrabold': 'text-4xl font-extrabold sm:text-5xl md:text-6xl',

            // 7xl
            '7xl/normal': 'text-5xl font-normal sm:text-6xl md:text-7xl',
            '7xl/medium': 'text-5xl font-medium sm:text-6xl md:text-7xl',
            '7xl/semibold': 'text-5xl font-semibold sm:text-6xl md:text-7xl',
            '7xl/bold': 'text-5xl font-bold sm:text-6xl md:text-7xl',
            '7xl/extrabold': 'text-5xl font-extrabold sm:text-6xl md:text-7xl',
        },
    },
    defaultVariants: {
        variant: 'md/normal',
    },
});

function Typography({ as = 'p', href, variant = 'base/normal', className, ...props }: TypographyProps) {
    const Comp = as;

    return <Comp className={cn('text-balance', typographyVariants({ variant }), className)} {...props} />;
}

export { Typography, typographyVariants, type TypographyProps };
