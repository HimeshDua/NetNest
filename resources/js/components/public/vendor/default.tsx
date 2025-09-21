import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VendorService } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BarChartIcon,
    CalendarIcon,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    DollarSignIcon,
    GlobeIcon,
    StarIcon,
    TrendingUpIcon,
    UsersIcon,
} from 'lucide-react';

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
                    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700',
                };
            case 'trending':
                return {
                    icon: <TrendingUpIcon className="h-4 w-4" />,
                    label: 'Trending',
                    color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700',
                };
            case 'reliable':
                return {
                    icon: <BarChartIcon className="h-4 w-4" />,
                    label: 'Reliable',
                    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700',
                };
            case 'popular':
                return {
                    icon: <UsersIcon className="h-4 w-4" />,
                    label: 'Popular',
                    color: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700',
                };
            default:
                return null;
        }
    };

    return (
        <>
            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.data.map((service: VendorService) => {
                    const highlight = getHighlightDetails(service.highlight);
                    return (
                        <Card key={service.id} className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100">
                                            <GlobeIcon className="h-6 w-6 text-blue-600" />
                                        </div>
                                    </div>
                                    {highlight && (
                                        <Badge variant="outline" className={`gap-1 py-1 ${highlight.color}`}>
                                            {highlight.icon}
                                            {highlight.label}
                                        </Badge>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                    <CardDescription className="mt-1 flex items-center gap-1.5">
                                        <span className="truncate">{service.vendor?.name || 'Unknown Vendor'}</span>
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="flex flex-grow flex-col gap-3">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Starting at ${service.packages[0]?.price || 'N/A'}/mo</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Posted {getDaysAgo(service.posted_date)}</span>
                                    </div>
                                </div>

                                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{service.short_description}</p>

                                <div className="mt-auto">
                                    <p className="mb-1.5 text-xs font-medium text-muted-foreground">Key Features:</p>
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

                            <CardFooter className="pt-4">
                                <Link href={route('services.show', service.slug)} className="block w-full">
                                    <Button size="sm" className="w-full gap-2">
                                        View Details
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {/* Enhanced Pagination */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <div className="text-sm text-muted-foreground">Showing {services.data.length} services</div>

                <div className="flex items-center gap-1">
                    {/* First Page */}
                    {services.links[0].url && (
                        <Button variant="outline" size="icon" onClick={() => onPageChange(services.links[0].url)} className="h-9 w-9">
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                    )}

                    {/* Previous Page */}
                    {services.links.find((link) => link.label === '&laquo; Previous')?.url && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onPageChange(services.links.find((link) => link.label === '&laquo; Previous')?.url || null)}
                            className="h-9 w-9"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    )}

                    {/* Page Numbers */}
                    {services.links.slice(1, -1).map((link, index) => (
                        <Button
                            key={index}
                            variant={link.active ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => onPageChange(link.url)}
                            className="h-9 w-9"
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Button>
                    ))}

                    {/* Next Page */}
                    {services.links.find((link) => link.label === 'Next &raquo;')?.url && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onPageChange(services.links.find((link) => link.label === 'Next &raquo;')?.url || null)}
                            className="h-9 w-9"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    )}

                    {/* Last Page */}
                    {services.links[services.links.length - 1].url && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onPageChange(services.links[services.links.length - 1].url)}
                            className="h-9 w-9"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
