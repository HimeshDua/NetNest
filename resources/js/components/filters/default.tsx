'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VendorService } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '../ui/button';

interface filterInterface {
    city: string;
    connection_type: string;
    min_price: string;
}

type Props = {
    filters: filterInterface;
    services: {
        data: VendorService[];
        links: {
            url: string | null;
            label: string;
        }[];
    };
    cities: string[];
    connectionTypes: string[];
};

export default function ServiceFilters({ filters, services, cities, connectionTypes }: Props) {
    const { data, setData, get } = useForm({
        city: filters.city || '',
        connection_type: filters.connection_type || '',
        min_price: filters.min_price || '',
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            get(route('services.index'), {
                data,
                preserveScroll: true,
                preserveState: true,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [data]);

    return (
        <div className="space-y-6 p-6">
            <div className="grid w-full grid-cols-5 gap-4 rounded-lg p-4 shadow md:grid-cols-5 dark:bg-card">
                {/* City Select */}
                <div className="col-span-4 grid w-full grid-cols-3 gap-4">
                    <Select value={data.city} onValueChange={(value) => setData('city', value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Connection Type Select */}
                    <Select value={data.connection_type} onValueChange={(value) => setData('connection_type', value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Connection Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {connectionTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Price Select */}
                    <Select value={data.min_price} onValueChange={(value) => setData('min_price', value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Min Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1000">Min 1000rs</SelectItem>
                            <SelectItem value="1500">Min 1500rs</SelectItem>
                            <SelectItem value="2000">Min 2000rs</SelectItem>
                            <SelectItem value="5000">Min 5000rs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Link className="w-full" href={route('services.index')}>
                    <Button className="col-span-1 w-full cursor-pointer" variant="default">
                        Clear
                    </Button>
                </Link>
            </div>
        </div>
    );
}
