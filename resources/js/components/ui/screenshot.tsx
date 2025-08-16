import { useEffect, useState } from 'react';

import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '../../lib/utils';

interface ScreenshotProps {
    srcLight: string;
    srcDark?: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export default function Screenshot({ srcLight, srcDark, alt, width, height, className }: ScreenshotProps) {
    const [src, setSrc] = useState<string | null>(null);
    const { resolvedAppearance } = useAppearance();

    useEffect(() => {
        if (resolvedAppearance) {
            setSrc(resolvedAppearance === 'light' ? srcLight : srcDark || srcLight);
        }
    }, [resolvedAppearance, srcLight, srcDark]);

    if (!src) {
        return <div style={{ width, height }} className={cn('bg-muted', className)} aria-label={alt} />;
    }

    return <img src={src} alt={alt} width={width} height={height} className={className} />;
}
