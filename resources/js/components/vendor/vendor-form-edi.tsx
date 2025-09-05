import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { RichEditor } from '../editor/rich-editor';
import { PackageName, BillingCycle, ConnectionType, HighlightType, VendorService as BaseVendorService, FaqItem, PackageForm as BasePackageForm } from '@/types';

interface FormPackage {
    name: PackageName;
    price: string;
    billing_cycle: BillingCycle;
    speed_label: string;
    featuresStr: string;
    description: string;
    currency: string;
    is_popular: boolean;
}

interface VendorServiceFormData {
    title: string;
    slug: string;
    city: string;
    location: string;
    posted_date: string;
    connection_type: ConnectionType;
    highlight: HighlightType;
    short_description: string;
    full_description: string;
    featuresStr: string;
    speedDetailsStr: string;
    packages: FormPackage[];
    faqs: FaqItem[];
    coverage_area: string;
    is_active: boolean;
    images: File[];
    existing_images: string[];
    removed_images: string[];
}

const PACKAGE_NAMES: PackageName[] = ['Basic', 'Standard', 'Premium'];

export default function VendorServiceForm({ vendorService }: { vendorService?: BaseVendorService }) {
    const isEditMode = !!vendorService;

    // Convert arrays to comma-separated strings for form handling
    const featuresStr = vendorService?.features?.join(', ') || '';
    const speedDetailsStr = vendorService?.speed_details?.join(', ') || '';

    // Format packages for form
    const initialPackages: FormPackage[] = PACKAGE_NAMES.map((name) => {
        const existingPackage = vendorService?.packages?.find((p: BasePackageForm) => p.name === name);

        return existingPackage
            ? {
                  name,
                  price: existingPackage.price.toString(),
                  billing_cycle: existingPackage.billing_cycle,
                  speed_label: existingPackage.speed_label || '',
                  featuresStr: existingPackage.features.join(', '),
                  description: existingPackage.description || '',
                  currency: existingPackage.currency,
                  is_popular: existingPackage.is_popular || false,
              }
            : {
                  name,
                  price: '',
                  billing_cycle: 'Monthly',
                  speed_label: '',
                  featuresStr: '',
                  description: '',
                  currency: 'PKR',
                  is_popular: name === 'Standard',
              };
    });

    const { data, setData, post, put, processing, errors, reset } = useForm<VendorServiceFormData>({
        title: vendorService?.title || '',
        slug: vendorService?.slug || '',
        city: vendorService?.city || '',
        location: vendorService?.location || '',
        posted_date: vendorService?.posted_date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
        connection_type: vendorService?.connection_type || 'fiber',
        highlight: vendorService?.highlight || 'undefined',
        short_description: vendorService?.short_description || '',
        full_description: vendorService?.full_description || '',
        featuresStr,
        speedDetailsStr,
        packages: initialPackages,
        faqs: vendorService?.faqs || [],
        coverage_area: vendorService?.coverage_area || '',
        is_active: vendorService?.is_active ?? true,
        images: [],
        existing_images: vendorService?.images as string[] || [],
        removed_images: [],
    });

    // State for managing existing images
    const [existingImages, setExistingImages] = useState<string[]>(vendorService?.images as string[] || []);

    // Update form data when vendorService prop changes
    useEffect(() => {
        if (vendorService) {
            setData({
                title: vendorService.title,
                slug: vendorService.slug,
                city: vendorService.city,
                location: vendorService.location,
                posted_date: vendorService.posted_date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
                connection_type: vendorService.connection_type,
                highlight: vendorService.highlight,
                short_description: vendorService.short_description,
                full_description: vendorService.full_description,
                featuresStr: vendorService.features.join(', '),
                speedDetailsStr: vendorService.speed_details.join(', '),
                packages: initialPackages,
                faqs: vendorService.faqs,
                coverage_area: vendorService.coverage_area,
                is_active: vendorService.is_active,
                images: [],
                existing_images: vendorService.images as string[],
                removed_images: [],
            });
            setExistingImages(vendorService.images as string[]);
        }
    }, [vendorService]);

    // ------- Helpers -------
    const splitCSV = (value: string) =>
        value
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);

    const handlePackageChange = (idx: number, key: keyof FormPackage, value: FormPackage[keyof FormPackage]) => {
        const next = [...data.packages];
        next[idx] = { ...next[idx], [key]: value };
        setData('packages', next);
    };

    const addFaq = () => setData('faqs', [...data.faqs, { question: '', answer: '' }]);
    const removeFaq = (i: number) =>
        setData(
            'faqs',
            (data.faqs || []).filter((_, idx) => idx !== i)
        );
    const updateFaq = (i: number, key: keyof FaqItem, value: string) => {
        const next = [...(data.faqs || [])];
        next[i] = { ...next[i], [key]: value };
        setData('faqs', next);
    };

    // Handle removal of existing images
    const removeExistingImage = (imagePath: string) => {
        setExistingImages(existingImages.filter((img) => img !== imagePath));
        setData('removed_images', [...data.removed_images, imagePath]);
    };

    // Handle new image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('images', Array.from(e.target.files));
        }
    };

    // ------- Submit -------
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'packages') {
                const formattedPackages = (value as FormPackage[]).map(p => ({
                    name: p.name,
                    price: parseFloat(p.price),
                    billing_cycle: p.billing_cycle,
                    speed_label: p.speed_label,
                    features: splitCSV(p.featuresStr),
                    description: p.description,
                    currency: p.currency,
                    is_popular: p.is_popular,
                }));
                formData.append(key, JSON.stringify(formattedPackages));
            } else if (key === 'featuresStr') {
                formData.append('features', JSON.stringify(splitCSV(value as string)));
            } else if (key === 'speedDetailsStr') {
                formData.append('speed_details', JSON.stringify(splitCSV(value as string)));
            } else if (key === 'faqs') {
                const filteredFaqs = (value as FaqItem[]).filter(f => f.question.trim() && f.answer.trim());
                formData.append(key, JSON.stringify(filteredFaqs));
            } else if (key === 'images' && Array.isArray(value)) {
                value.forEach((file) => {
                    formData.append('images[]', file);
                });
            } else if (key === 'existing_images' || key === 'removed_images') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value as string);
            }
        });

        if (isEditMode && vendorService?.id) {
            put(route('vendor.services.update', vendorService.id), formData);
        } else {
            post(route('vendor.services.store'), formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form fields here */}
        </form>
    );
}
