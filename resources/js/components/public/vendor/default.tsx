'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VendorService } from '@/types';
import { Link } from '@inertiajs/react';
import { BarChartIcon, BookmarkIcon, CalendarIcon, DollarSignIcon, GlobeIcon, ServerIcon, StarIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

type Props = {
    services: {
        data: VendorService[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    onPageChange: (url: string | null) => void;
};

export default function VendorServiceGrid({ services, onPageChange }: Props) {
    const getDaysAgo = (dateString: string) => {
        const postDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - postDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    };

    const getHighlightDetails = (highlight: VendorService['highlight']) => {
        switch (highlight) {
            case 'new':
                return {
                    icon: <StarIcon className="h-4 w-4" />,
                    label: 'New',
                    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                };
            case 'trending':
                return {
                    icon: <TrendingUpIcon className="h-4 w-4" />,
                    label: 'Trending',
                    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
                };
            case 'reliable':
                return {
                    icon: <BarChartIcon className="h-4 w-4" />,
                    label: 'Reliable',
                    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                };
            case 'popular':
                return {
                    icon: <UsersIcon className="h-4 w-4" />,
                    label: 'Popular',
                    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
                };
            default:
                return null;
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.data.map((service) => {
                    const highlight = getHighlightDetails(service.highlight);
                    return (
                        <Link href={route('services.show', service.slug)} className="block">
                            <Card key={service.id} className="flex h-full flex-col">
                                <CardHeader className="pb-2">
                                   
                                    <div className="mt-3">
                                        <CardTitle>{service.title}</CardTitle>
                                        <div className="mt-1 flex items-center gap-1">
                                            <GlobeIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                            <CardDescription className="!mt-0">{service.title}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex flex-grow flex-col gap-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{service.packages[0].price}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">Posted {getDaysAgo(service.posted_date)}</span>
                                        </div>
                                    </div>

                                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{service.short_description}</p>

                                    <div className="mt-auto">
                                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Features:</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {service.features.slice(0, 3).map((feature, index) => (
                                                <Badge variant="secondary" key={index} className="text-xs">
                                                    {feature}
                                                </Badge>
                                            ))}
                                            {service.features.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{service.features.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex gap-3 pt-2">
                                    <Button variant="outline" size="sm" className="w-1/2">
                                        <BookmarkIcon className="mr-1 h-4 w-4" />
                                        Save
                                    </Button>
                                    <Button size="sm" className="w-1/2">
                                        Subscribe
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 px-4">
                {services.links.map((link, index) => (
                    <button
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        disabled={!link.url}
                        onClick={() => onPageChange(link.url)}
                        className={`rounded border px-3 py-1 text-sm transition ${
                            link.active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                        }`}
                    />
                ))}
            </div>
        </>
    );
}
