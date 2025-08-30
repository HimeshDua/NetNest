import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Banner = ({ className }: { className?: string }) => {
    const { marquee } = usePage<PageProps>().props;
    // const { marquee_link: link, marquee_text: text } = marquee[0] || [{
    //     marquee_link : '',
    //     marquee_text : ''
    // }];
    if (marquee[0]) return <div>juice</div>;

    const link = marquee[0]?.marquee_link || '';
    const text = marquee[0]?.marquee_text || '';

    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!text || text.trim().length === 0) {
            setIsVisible(false);
        }
    }, [text]);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                'relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-3',
                'shadow-lg transition-all duration-500 ease-in-out',
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="animate-shine absolute top-0 -left-10 h-full w-20 -skew-x-12 transform bg-white/10"></div>
            </div>

            <div className="relative z-10 container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center overflow-hidden">
                    {/* Animated icon */}
                    <div className={cn('mr-3 transition-all duration-500', isHovered ? 'scale-110 rotate-12' : 'scale-100')}>
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    {/* Marquee text with smooth transition */}
                    <p className="overflow-hidden text-sm font-medium whitespace-nowrap text-white md:text-base">
                        <span className={cn('inline-block transition-all duration-700', isHovered ? 'translate-x-1' : 'translate-x-0')}>
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

                {/* Close button with smooth transition */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-4 rounded-full bg-white/10 p-1 transition-all duration-300 hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
                    aria-label="Close banner"
                >
                    <X className="h-4 w-4 text-white" />
                </button>
            </div>

            {/* Progress bar at the bottom */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/30">
                <div className="h-full bg-white/80 transition-all duration-1000 ease-linear" style={{ width: isHovered ? '0%' : '100%' }}></div>
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
            `}</style>
        </div>
    );
};
