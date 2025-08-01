'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { JobPosition, jobPositions } from '@/data/jobsList';
import {
    BarChartIcon,
    BookmarkIcon,
    BriefcaseIcon,
    BuildingIcon,
    CalendarIcon,
    DollarSignIcon,
    MapPinIcon,
    StarIcon,
    TrendingUpIcon,
    UsersIcon,
} from 'lucide-react';
import { useState } from 'react';

const jobsPerPage = 6;

export default function VendorComponent() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(jobPositions.length / jobsPerPage);
    const paginatedJobs = jobPositions.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    const getDaysAgo = (dateString: string) => {
        const postDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - postDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    };

    const formatLocationType = (type: string) => {
        switch (type) {
            case 'remote':
                return 'Remote';
            case 'hybrid':
                return 'Hybrid';
            case 'onsite':
                return 'On-site';
            default:
                return type;
        }
    };

    const formatEmploymentType = (type: string) => {
        switch (type) {
            case 'full-time':
                return 'Full-time';
            case 'part-time':
                return 'Part-time';
            case 'contract':
                return 'Contract';
            case 'internship':
                return 'Internship';
            default:
                return type;
        }
    };

    const getHighlightDetails = (highlight: JobPosition['highlight']) => {
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
            case 'competitive':
                return {
                    icon: <BarChartIcon className="h-4 w-4" />,
                    label: 'Competitive',
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
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">Featured Opportunities</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    Discover top job listings from leading vendors. These are handpicked roles offering career growth, benefits, and innovation.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedJobs.map((job) => {
                    const highlightDetails = job.highlight ? getHighlightDetails(job.highlight) : null;

                    return (
                        <Card key={job.id} className="flex h-full flex-col">
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <div className="relative flex h-12 w-12 items-center justify-center rounded-md border bg-card">
                                        <div className="absolute flex h-full w-full items-center justify-center">
                                            {job.companyLogo ? (
                                                <img
                                                    src={job.companyLogo}
                                                    alt={job.companyName}
                                                    width={48}
                                                    height={48}
                                                    className="h-12 w-12 object-contain"
                                                />
                                            ) : (
                                                <BuildingIcon className="h-6 w-6 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                    {highlightDetails && (
                                        <Badge variant="secondary" className={`flex items-center gap-1 ${highlightDetails.color}`}>
                                            {highlightDetails.icon}
                                            {highlightDetails.label}
                                        </Badge>
                                    )}
                                </div>
                                <div className="mt-3">
                                    <CardTitle>{job.title}</CardTitle>
                                    <div className="mt-1 flex items-center gap-1">
                                        <BuildingIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                        <CardDescription className="!mt-0">{job.companyName}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex flex-grow flex-col gap-3">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{job.location}</span>
                                        <Badge variant="outline" className="ml-auto text-xs">
                                            {formatLocationType(job.locationType)}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{job.department}</span>
                                        <Badge variant="outline" className="ml-auto text-xs">
                                            {formatEmploymentType(job.employmentType)}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{job.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Posted {getDaysAgo(job.postedDate)}</span>
                                    </div>
                                </div>

                                <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>

                                <div className="mt-auto">
                                    <p className="mb-1.5 text-xs font-medium text-muted-foreground">Perks & Benefits:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {job.perks.slice(0, 3).map((perk, index) => (
                                            <Badge variant="secondary" key={index} className="text-xs">
                                                {perk}
                                            </Badge>
                                        ))}
                                        {job.perks.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{job.perks.length - 3} more
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
                                    Apply Now
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
                <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}>
                    Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
