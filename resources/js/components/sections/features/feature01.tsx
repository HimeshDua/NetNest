import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../../resources/js/lib/utils';

const featuresData = [
    {
        feature: 'SEO',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan',
    },
    {
        feature: 'PPC',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan',
    },
    {
        feature: 'Social Media',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan',
    },
];

export default function Feature01() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="mt-16 grid grid-cols-1 gap-4 rounded-lg p-6 sm:grid-cols-2 xl:grid-cols-3">
                {featuresData.map((item) => (
                    <div
                        key={item.feature}
                        className={cn('flex flex-col gap-y-4 rounded-lg p-4 lg:p-9', 'border bg-gradient-to-b from-muted/40 to-background')}
                    >
                        <div className="size-fit rounded-lg border bg-gradient-to-b from-muted/40 to-background p-2 shadow">
                            <CheckCircle2 className="size-6 fill-primary text-white lg:size-7" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h3 className="text-xl font-medium capitalize">{item.feature}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
