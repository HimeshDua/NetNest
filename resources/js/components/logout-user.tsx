import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { router } from '@inertiajs/react';

export default function LogoutSection() {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.post(route('logout')); // standard inertia logout call
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Logout" description="Sign out of your account securely" />

            <div className="space-y-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="relative space-y-0.5 text-neutral-700 dark:text-neutral-200">
                    <p className="font-medium">Info</p>
                    <p className="text-sm">Logging out will end your current session. You’ll need to log back in to access your dashboard.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Logout</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to log out of your account? You will need to log back in to continue using the platform.
                        </DialogDescription>

                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>

                            <Button variant="destructive" onClick={handleLogout}>
                                Yes, Logout
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Separator />
        </div>
    );
}
