import * as React from 'react';
import { cn } from '../../lib/utils';

function Section({ className, ...props }: React.ComponentProps<'section'>) {
    return <section data-slot="section" className={cn('bg-background px-4 py-12 text-foreground sm:py-24 md:py-32', className)} {...props} />;
}

export { Section };
