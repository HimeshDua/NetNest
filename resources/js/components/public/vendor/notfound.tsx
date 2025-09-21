import { Button } from '@/components/ui/button';
import { Main } from '@/layouts/main';
import { Link } from '@inertiajs/react';
import { Home, PackageX, RotateCcw } from 'lucide-react';

export default function ServicesNotFound() {
    return (
        <Main className="container mx-auto space-y-8 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md rounded-lg p-6 text-center">
                <PackageX className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-lg font-medium text-foreground">No Services Found</h3>
                <p className="mb-4 text-muted-foreground">
                    We couldn't find any services matching your criteria. Try adjusting your search or filters.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href={route('home')}>
                        <Button variant="outline" className="gap-2">
                            <Home className="h-4 w-4" />
                            Return Home
                        </Button>
                    </Link>
                    <Button onClick={() => window.location.reload()} className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                    </Button>
                </div>
            </div>

            {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <Skeleton className="h-12 w-12 animate-none! rounded-xl" />
                                {Math.random() < 0.5 && <Skeleton className="h-5 w-16 animate-none!" />}
                            </div>
                            <div className="mt-4 space-y-2">
                                <Skeleton className="h-6 w-3/4 animate-none!" />
                                <Skeleton className="h-4 w-full animate-none!" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 animate-none! rounded-full" />
                                <Skeleton className="h-4 w-24 animate-none!" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 animate-none! rounded-full" />
                                <Skeleton className="h-4 w-32 animate-none!" />
                            </div>
                            <div className="pt-4 text-center">
                                <p className="text-sm font-medium text-muted-foreground">No Services Available</p>
                                <p className="mt-1 text-xs text-muted-foreground/70">Please check back later</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-2">
                                <Skeleton className="h-6 w-16 animate-none! rounded-full" />
                                <Skeleton className="h-6 w-20 animate-none! rounded-full" />
                                <Skeleton className="h-6 w-14 animate-none! rounded-full" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="h-10 w-full rounded-lg bg-primary/10 text-muted-foreground hover:bg-primary/10">Unavailable</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div> */}
        </Main>
    );
}
