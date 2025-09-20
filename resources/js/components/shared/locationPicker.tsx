import L, { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, LocateFixed } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapNavigator({ position }: { position: LatLngLiteral }) {
    const map = useMap();
    const prevPosition = useRef<LatLngLiteral | null>(null);

    useEffect(() => {
        if (!prevPosition.current || prevPosition.current.lat !== position.lat || prevPosition.current.lng !== position.lng) {
            map.flyTo(position, 15, { animate: true, duration: 1.5 });
            prevPosition.current = position;
        }
    }, [position, map]);

    return null;
}

export type Location = {
    name: string;
    lat: number;
    lng: number;
};

type LocationPickerProps = {
    onSelect: (location: Location) => void;
    showTiles?: boolean;
    className?: string;
};

// export const LocationPicker: React.FC<LocationPickerProps> = ({ onSelect }) => {
export default function LocationPicker({ onSelect, showTiles = true, className }: LocationPickerProps) {
    const [position, setPosition] = useState<LatLngLiteral>({
        lat: 31.5204,
        lng: 74.3487,
    });
    const [locationName, setLocationName] = useState<string>('Detecting location...');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch location name when position changes
    useEffect(() => {
        setIsLoading(true);

        const fetchLocationName = async () => {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                const name = data.display_name || 'Unknown location';
                setLocationName(name);

                const location: Location = {
                    name,
                    lat: position.lat,
                    lng: position.lng,
                };
                onSelect(location);
            } catch {
                setLocationName('Error fetching location');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocationName();
    }, [position]); // 👈 no onSelect in deps

    // Detect user location
    const handleUseMyLocation = () => {
        setIsLoading(true);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition({ lat: latitude, lng: longitude });
                },
                () => setIsLoading(false),
                { enableHighAccuracy: true, timeout: 5000 },
            );
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleUseMyLocation();
    }, []);

    return (
        <div className={`relative ${className} ${showTiles ? 'h-[200px] md:h-[360px]' : null} w-full overflow-hidden rounded-lg border`}>
            {showTiles && (
                <MapContainer
                    center={position}
                    zoom={19}
                    maxZoom={19}
                    minZoom={5}
                    inertia
                    fadeAnimation={true}
                    className="absolute z-10 h-full w-full"
                    scrollWheelZoom={false}
                    dragging={false}
                    doubleClickZoom={false}
                    touchZoom={false}
                    zoomControl={false}
                >
                    <TileLayer
                        maxZoom={19}
                        crossOrigin={'anonymous'}
                        minZoom={5}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} draggable={false} />
                    <MapNavigator position={position} />
                </MapContainer>
            )}
            <div className="absolute right-4 bottom-4 z-50 flex flex-col items-end gap-2">
                <Button size="icon" variant="secondary" onClick={handleUseMyLocation} disabled={isLoading} className="shadow-md">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
                </Button>

                <Card className="relative max-w-xs bg-background p-2 text-right text-xs shadow-lg">
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>Fetching...</span>
                        </div>
                    ) : (
                        <>
                            <p className="line-clamp-1 font-medium">{locationName}</p>
                            <p className="text-muted-foreground">
                                {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
                            </p>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
