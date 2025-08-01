export interface VendorService {
    id: string;
    title: string;
    vendorName: string;
    vendorLogo: string;
    location: string;
    connectionType: 'fiber' | 'dsl' | 'wireless';
    serviceType: 'internet' | 'vpn' | 'dedicated-line' | 'hosting';
    price: string;
    postedDate: string;
    description: string;
    featured: boolean;
    highlight: 'new' | 'trending' | 'reliable' | 'popular' | undefined;
    features: string[];
}
