'use client';

import { useAppearance } from '@/hooks/use-appearance';

import { useEffect, useState } from 'react';

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
    const { appearance } = useAppearance();
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        if (appearance) {
            setSrc(appearance === 'light' ? srcLight : srcDark || srcLight);
        }
    }, [appearance, srcLight, srcDark]);

    if (!src) {
        return <div style={{ width, height }} className={cn('bg-muted', className)} aria-label={alt} />;
    }

    return <img src={src} alt={alt} width={width} height={height} className={className} />;
}
