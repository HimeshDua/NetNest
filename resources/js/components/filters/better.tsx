import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ServiceFilters({ filters }: { filters: { city: string; price: number[]; unlimited: boolean } }) {
    // const { filters } = usePage<PageProps>().props; // Coming from Laravel
    const [city, setCity] = useState(filters.city || '');
    const [priceRange, setPriceRange] = useState(filters.price || [1000, 5000]);
    const [unlimited, setUnlimited] = useState(filters.unlimited || false);

    // Update filters instantly when changed
    useEffect(() => {
        router.get(
            route('services.index'),
            {
                city,
                min_price: priceRange[0],
                max_price: priceRange[1],
                unlimited,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true, // avoid history spam
            },
        );
    }, [city, priceRange, unlimited]);

    return (
        <div className="space-y-4 rounded-md border p-4">
            {/* City Filter */}
            <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="karachi">Karachi</SelectItem>
                    <SelectItem value="lahore">Lahore</SelectItem>
                    <SelectItem value="islamabad">Islamabad</SelectItem>
                </SelectContent>
            </Select>

            {/* Price Range */}
            <div>
                <label className="mb-2 block text-sm font-medium">Price Range (PKR)</label>
                <Slider min={500} max={10000} step={500} value={priceRange} onValueChange={setPriceRange} />
                <div className="mt-1 text-sm text-muted-foreground">
                    {priceRange[0]} PKR – {priceRange[1]} PKR
                </div>
            </div>

            {/* Unlimited Data */}
            <div className="flex items-center space-x-2">
                <Switch checked={unlimited} onCheckedChange={setUnlimited} />
                <span className="text-sm">Unlimited Data Only</span>
            </div>
        </div>
    );
}
