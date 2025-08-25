// types/cms.ts
import { z } from 'zod';

export const HeroSchema = z.object({
    title: z.string().min(5).max(120),
    subtitle: z?.string().min(10).max(300),
    mockup: z.object({
        srcLight: z.string().url(),
        srcDark: z.string().url(),
        alt: z.string().max(120),
    }),
    buttons: z.array(
        z.object({
            href: z
                .string()
                .url()
                .or(z.string().regex(/^\/[a-z0-9-/]*$/i)), // internal or external https
            text: z.string().max(40),
            variant: z.enum(['default', 'outline', 'secondary', 'destructive', 'ghost', 'link']).default('default'),
        }),
    ),
});

export type HeroCMS = z.infer<typeof HeroSchema>;
