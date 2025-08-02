'use client';

import { usePage, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageProps, VendorService } from '@/types/index';
import {
  BarChartIcon,
  BookmarkIcon,
  CalendarIcon,
  DollarSignIcon,
  GlobeIcon,
  ServerIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react';

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
}

export default function VendorServiceGrid() {
  const { services } = usePage<PageProps>().props;

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

  const changePage = (url: string | null) => {
    if (!url) return;
    router.visit(url, { preserveScroll: true, preserveState: true });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.data.map((service:any) => {
          const highlight = getHighlightDetails(service.highlight);

          return (
            <Card key={service.id} className="flex h-full flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-md border bg-card">
                    {service.vendorLogo ? (
                      <img
                        src={service.vendorLogo}
                        alt={service.vendorName}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <ServerIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  {highlight && (
                    <Badge variant="secondary" className={`flex items-center gap-1 ${highlight.color}`}>
                      {highlight.icon}
                      {highlight.label}
                    </Badge>
                  )}
                </div>
                <div className="mt-3">
                  <CardTitle>{service.title}</CardTitle>
                  <div className="mt-1 flex items-center gap-1">
                    <GlobeIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <CardDescription className="!mt-0">{service.vendorName}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-grow flex-col gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ServerIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm capitalize">{service.connectionType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Posted {getDaysAgo(service.postedDate)}</span>
                  </div>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>

                <div className="mt-auto">
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">Features:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.slice(0, 3).map((feature:any, index:number) => (
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
          );
        })}
      </div>

      {/* Pagination Links */}
      <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
        {services.links.map((link:any, i:number) => (
          <Button
            key={i}
            onClick={() => changePage(link.url)}
            disabled={!link.url}
            variant={link.active ? 'default' : 'outline'}
            size="sm"
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </>
  );
}
