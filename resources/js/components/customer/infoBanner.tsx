import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const InfoBanner = ({ text, link, className }: { text: string; link: string; className?: string }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!text || text.trim().length === 0) {
            setIsVisible(false);
        }
    }, [text]);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                'relative my-3 mb-8 w-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-3',
                'shadow-lg transition-all duration-500 ease-in-out',
                className,
            )}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="animate-shine absolute top-0 -left-10 h-full w-20 -skew-x-12 transform bg-white/10"></div>
            </div>

            <div className="relative z-10 container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center overflow-hidden">
                    <p className="overflow-hidden text-sm font-medium whitespace-nowrap text-white md:text-base">
                        <span className="animate-marquee-bounce inline-block">
                            {text}
                            {link && (
                                <a
                                    href={link}
                                    className="ml-2 font-semibold underline underline-offset-2 transition-all duration-300 hover:text-blue-100 hover:no-underline"
                                >
                                    Learn more →
                                </a>
                            )}
                        </span>
                    </p>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/30">
                <div className="h-full bg-white/80"></div>
            </div>

            <style jsx>{`
                @keyframes shine {
                    0% {
                        left: -100px;
                    }
                    100% {
                        left: calc(100% + 100px);
                    }
                }
                .animate-shine {
                    animation: shine 3s ease-in-out infinite;
                }

                @keyframes marquee-bounce {
                    0% {
                        transform: translateX(1%);
                    }
                    50% {
                        transform: translateX(-47%);
                    }
                    100% {
                        transform: translateX(1%);
                    }
                }
                .animate-marquee-bounce {
                    display: inline-block;
                    animation: marquee-bounce 20s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};
