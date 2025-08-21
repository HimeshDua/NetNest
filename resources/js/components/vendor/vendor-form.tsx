import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import '@/css/global.css';
import { useForm } from '@inertiajs/react';
import React from 'react';

import { RichEditor } from '../editor/rich-editor';

export default function VendorForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        location: '',
        connection_type: 'fiber',
        short_description: '',
        full_description: '',
        highlight: 'undefined',
        features: '',
        faqs: '',
        images: [] as File[],
        speed_details: '',
        coverage_area: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const featuresArray = data.features
            .split(',')
            .map((f) => f.trim())
            .filter(Boolean);

        const speedDetailsArray = data.speed_details
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        let faqsObject = [];
        try {
            faqsObject = data.faqs ? JSON.parse(data.faqs) : [];
        } catch (error) {
            alert('Invalid JSON in FAQs. Please fix it before submitting.');
            return;
        }

        post(route('submission.store'), {
            ...data,
            features: JSON.stringify(featuresArray),
            speed_details: JSON.stringify(speedDetailsArray),
            faqs: JSON.stringify(faqsObject),
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
            <Card>
                <CardHeader>
                    <CardTitle>Create Vendor Service</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Service Title</Label>
                                <Input id="title" name="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" value={data.location} onChange={(e) => setData('location', e.target.value)} />
                                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                            </div>
                        </div>
                        <Separator />
                        {/* Technical Info */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="connection_type">Connection Type</Label>
                                <Select value={data.connection_type} onValueChange={(value) => setData('connection_type', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a connection type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fiber">Fiber</SelectItem>
                                        <SelectItem value="dsl">DSL</SelectItem>
                                        <SelectItem value="wireless">Wireless</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.connection_type && <p className="text-sm text-red-500">{errors.connection_type}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="speed_details">Speed Details (comma separated)</Label>
                                <Input
                                    id="speed_details"
                                    name="speed_details"
                                    value={data.speed_details}
                                    onChange={(e) => setData('speed_details', e.target.value)}
                                />
                                {errors.speed_details && <p className="text-sm text-red-500">{errors.speed_details}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverage_area">Coverage Area</Label>
                                <Textarea
                                    id="coverage_area"
                                    name="coverage_area"
                                    value={data.coverage_area}
                                    onChange={(e) => setData('coverage_area', e.target.value)}
                                />
                                {errors.coverage_area && <p className="text-sm text-red-500">{errors.coverage_area}</p>}
                            </div>
                        </div>
                        <Separator />
                        {/* Descriptions */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Textarea
                                    id="short_description"
                                    name="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                />
                                {errors.short_description && <p className="text-sm text-red-500">{errors.short_description}</p>}
                            </div>

                            {/* <div className="space-y-2">
                                <Label htmlFor="full_description">Full Description</Label>
                                <Textarea
                                    id="full_description"
                                    name="full_description"
                                    value={data.full_description}
                                    onChange={(e) => setData('full_description', e.target.value)}
                                    rows={5}
                                />
                                {errors.full_description && <p className="text-sm text-red-500">{errors.full_description}</p>}
                            </div> */}
                        </div>

                        <Separator />

                        <RichEditor value={data.full_description} onChange={(html) => setData('full_description', html)} />

                        <Separator />
                        {/* Extras */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="highlight">Highlight</Label>
                                <Select value={data.highlight} onValueChange={(value) => setData('highlight', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a highlight" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="trending">Trending</SelectItem>
                                        <SelectItem value="reliable">Reliable</SelectItem>
                                        <SelectItem value="popular">Popular</SelectItem>
                                        <SelectItem value="undefined">None</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.highlight && <p className="text-sm text-red-500">{errors.highlight}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="features">Features (comma separated)</Label>
                                <Input id="features" name="features" value={data.features} onChange={(e) => setData('features', e.target.value)} />
                                {errors.features && <p className="text-sm text-red-500">{errors.features}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="faqs">FAQs (JSON format)</Label>
                                <Textarea id="faqs" name="faqs" value={data.faqs} onChange={(e) => setData('faqs', e.target.value)} />
                                {errors.faqs && <p className="text-sm text-red-500">{errors.faqs}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="images">Images (multiple)</Label>
                                <Input
                                    id="images"
                                    name="images"
                                    type="file"
                                    multiple
                                    onChange={(e) => setData('images', Array.from(e.target.files || []))}
                                />
                                {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing}>
                                Submit Service
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
