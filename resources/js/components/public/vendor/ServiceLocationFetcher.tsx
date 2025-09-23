import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, LocateFixed } from 'lucide-react';
import { useState } from 'react';

export type Location = {
    name: string;
    lat: number;
    lng: number;
};

type ServiceLocationFetcherProps = {
    onSelect: (location: Location) => void;
    className?: string;
};

export default function ServiceLocationFetcher({ onSelect, className }: ServiceLocationFetcherProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleFetchLocation: () => Promise<void> = async () => {
        setIsLoading(true);

        if (!('geolocation' in navigator)) {
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
                    const res = await axios.get(url);
                    const data = res.data;
                    console.log(data);
                    const a = data.address;
                    const name = a.amenity + ', ' + a.road + ', ' + a.town || 'Unknown location';

                    onSelect({
                        name,
                        lat: latitude,
                        lng: longitude,
                    });
                    const location = {
                        name,
                        lat: latitude,
                        lng: longitude,
                    };
                    localStorage.setItem('location', JSON.stringify(location));
                } catch {
                    // fallback with raw coords
                    onSelect({
                        name: 'Unknown location',
                        lat: latitude,
                        lng: longitude,
                    });
                } finally {
                    setIsLoading(false);
                }
            },
            () => setIsLoading(false),
            { enableHighAccuracy: true, timeout: 5000 },
        );
    };

    return (
        <Button onClick={handleFetchLocation} disabled={isLoading} variant="secondary" size="sm" className={className}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Detecting...
                </>
            ) : (
                <>
                    <LocateFixed className="mr-2 h-4 w-4" />
                    Use My Location
                </>
            )}
        </Button>
    );
}
