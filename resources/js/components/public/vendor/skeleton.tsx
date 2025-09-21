import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function VendorServiceGridSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <Skeleton className="h-12 w-12 rounded-xl" />
                                {Math.random() < 0.5 && <Skeleton className="h-5 w-16" />}
                            </div>
                            <div className="mt-4 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="space-y-2 pt-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-14 rounded-full" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
