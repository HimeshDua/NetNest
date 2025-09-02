// resources/js/pages/vendor/VendorServiceForm.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { RichEditor } from '../editor/rich-editor';

type PackageName = 'Basic' | 'Standard' | 'Premium';
type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly';

const PACKAGE_NAMES: PackageName[] = ['Basic', 'Standard', 'Premium'];

type PackageForm = {
    name: PackageName;
    price: string; // keep as string for inputs; convert to number on submit
    billing_cycle: BillingCycle;
    speed_label: string;
    featuresStr: string; // comma-separated in UI -> array on submit
    description: string;
    currency: string; // e.g. PKR
    is_popular: boolean;
};

type FaqItem = { question: string; answer: string };

export default function VendorServiceForm() {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        // Core
        title: '',
        slug: '',
        city: '',
        location: '',
        posted_date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
        connection_type: 'fiber' as 'fiber' | 'dsl' | 'wireless',
        highlight: 'undefined' as 'new' | 'trending' | 'reliable' | 'popular' | 'undefined',

        short_description: '',
        full_description: '',

        // Arrays (handled as strings in UI, parsed on submit)
        featuresStr: '', // top-level features
        speedDetailsStr: '', // top-level speed details (labels)

        // Structured
        packages: PACKAGE_NAMES.map<PackageForm>((name) => ({
            name,
            price: '',
            billing_cycle: 'Monthly',
            speed_label: '',
            featuresStr: '',
            description: '',
            currency: 'PKR',
            is_popular: name === 'Standard', // default popular mid-tier
        })),

        faqs: [] as FaqItem[],
        images: [] as File[],

        coverage_area: '',
        is_active: true,
    });

    // ------- Helpers -------
    const splitCSV = (value: string) =>
        value
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);

    const handlePackageChange = <K extends keyof PackageForm>(idx: number, key: K, value: PackageForm[K]) => {
        const next = [...data.packages];
        next[idx] = { ...next[idx], [key]: value };
        setData('packages', next);
    };

    const addFaq = () => setData('faqs', [...data.faqs, { question: '', answer: '' }]);
    const removeFaq = (i: number) =>
        setData(
            'faqs',
            data.faqs.filter((_, idx) => idx !== i),
        );
    const updateFaq = (i: number, key: keyof FaqItem, value: string) => {
        const next = [...data.faqs];
        next[i] = { ...next[i], [key]: value };
        setData('faqs', next);
    };

    // ------- Submit -------
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((current) => {
            // Map packages into API shape
            const packages = (current.packages as PackageForm[]).map((p) => ({
                name: p.name,
                price: Number(p.price || 0),
                billing_cycle: p.billing_cycle,
                speed_label: p.speed_label || undefined,
                features: splitCSV(p.featuresStr),
                description: p.description || undefined,
                currency: p.currency || 'PKR',
                is_popular: !!p.is_popular,
            }));

            return {
                // Direct scalars
                title: current.title,
                slug: current.slug || undefined,
                city: current.city,
                location: current.location,
                posted_date: current.posted_date || undefined,
                connection_type: current.connection_type,
                highlight: current.highlight,
                short_description: current.short_description,
                full_description: current.full_description,
                coverage_area: current.coverage_area,
                is_active: current.is_active ? 1 : 0, // in case backend expects boolean cast

                // Files
                images: current.images,

                // Arrays/objects -> JSON strings (because forceFormData)
                features: splitCSV(current.featuresStr),
                speed_details: splitCSV(current.speedDetailsStr),
                packages: packages,
                faqs: (current.faqs as FaqItem[]).filter((f) => f.question.trim() && f.answer.trim()),
            };
        });
        console.log(data);
        post(route('submission.store'), {
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
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-10">
                        {/* ===== Basic Info ===== */}
                        <section className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="title">Service Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Fiber Max — 50 Mbps"
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (optional)</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="fiber-max-50-mbps"
                                />
                                {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="Karachi" />
                                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="DHA Phase 6"
                                />
                                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="posted_date">Posted Date</Label>
                                <Input
                                    id="posted_date"
                                    type="date"
                                    value={data.posted_date}
                                    onChange={(e) => setData('posted_date', e.target.value)}
                                />
                                {errors.posted_date && <p className="text-sm text-red-500">{errors.posted_date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Connection Type</Label>
                                <Select value={data.connection_type} onValueChange={(v) => setData('connection_type', v as any)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
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
                                <Label>Highlight</Label>
                                <Select value={data.highlight} onValueChange={(v) => setData('highlight', v as any)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select highlight" />
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

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="coverage_area">Coverage Area</Label>
                                <Textarea
                                    id="coverage_area"
                                    value={data.coverage_area}
                                    onChange={(e) => setData('coverage_area', e.target.value)}
                                    placeholder="List areas / blocks covered..."
                                />
                                {errors.coverage_area && <p className="text-sm text-red-500">{errors.coverage_area}</p>}
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <Label htmlFor="is_active">Active</Label>
                                {errors.is_active && <p className="text-sm text-red-500">{errors.is_active}</p>}
                            </div>
                        </section>

                        {/* ===== Descriptions ===== */}
                        <section className="grid gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Textarea
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    placeholder="Concise selling points..."
                                />
                                {errors.short_description && <p className="text-sm text-red-500">{errors.short_description}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Full Description</Label>
                                <RichEditor value={data.full_description} onChange={(html) => setData('full_description', html)} />
                                {errors.full_description && <p className="text-sm text-red-500">{errors.full_description}</p>}
                            </div>
                        </section>

                        {/* ===== Top-level Features & Speed Details ===== */}
                        <section className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Service Features (comma separated)</Label>
                                <Input
                                    value={data.featuresStr}
                                    onChange={(e) => setData('featuresStr', e.target.value)}
                                    placeholder="Free router, 24/7 support, No FUP"
                                />
                                {errors.featuresStr && <p className="text-sm text-red-500">{errors.featuresStr}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Speed Details (comma separated)</Label>
                                <Input
                                    value={data.speedDetailsStr}
                                    onChange={(e) => setData('speedDetailsStr', e.target.value)}
                                    placeholder="Up to 50 Mbps, Upload 20 Mbps"
                                />
                                {errors.speedDetailsStr && <p className="text-sm text-red-500">{errors.speedDetailsStr}</p>}
                            </div>
                        </section>

                        {/* ===== Packages (Basic / Standard / Premium) ===== */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-semibold">Packages</h2>

                            {data.packages.map((pkg, idx) => (
                                <div key={pkg.name} className="grid gap-4 rounded-lg border p-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Package</Label>
                                        <Input value={pkg.name} readOnly className="bg-muted/40" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Price</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={pkg.price}
                                            onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                                            placeholder="e.g. 2999"
                                        />
                                        {errors[`packages.${idx}.price` as any] && (
                                            <p className="text-sm text-red-500">{(errors as any)[`packages.${idx}.price`]}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Billing Cycle</Label>
                                        <Select
                                            value={pkg.billing_cycle}
                                            onValueChange={(v) => handlePackageChange(idx, 'billing_cycle', v as BillingCycle)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Monthly">Monthly</SelectItem>
                                                <SelectItem value="Quarterly">Quarterly</SelectItem>
                                                <SelectItem value="Yearly">Yearly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Speed Label (optional)</Label>
                                        <Input
                                            value={pkg.speed_label}
                                            onChange={(e) => handlePackageChange(idx, 'speed_label', e.target.value)}
                                            placeholder="50 Mbps"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Currency</Label>
                                        <Input
                                            value={pkg.currency}
                                            onChange={(e) => handlePackageChange(idx, 'currency', e.target.value)}
                                            placeholder="PKR"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            id={`popular-${idx}`}
                                            type="checkbox"
                                            checked={pkg.is_popular}
                                            onChange={(e) => handlePackageChange(idx, 'is_popular', e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                        <Label htmlFor={`popular-${idx}`}>Mark as Popular</Label>
                                    </div>

                                    <div className="space-y-2 md:col-span-3">
                                        <Label>Package Features (comma separated)</Label>
                                        <Input
                                            value={pkg.featuresStr}
                                            onChange={(e) => handlePackageChange(idx, 'featuresStr', e.target.value)}
                                            placeholder="Free installation, Static IP, Fair usage 1TB"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-3">
                                        <Label>Description (optional)</Label>
                                        <Textarea
                                            value={pkg.description}
                                            onChange={(e) => handlePackageChange(idx, 'description', e.target.value)}
                                            placeholder="More details about what's included..."
                                        />
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* ===== FAQs ===== */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">FAQs</h2>
                                <Button type="button" variant="secondary" onClick={addFaq}>
                                    Add FAQ
                                </Button>
                            </div>

                            {data.faqs.length === 0 && <p className="text-sm text-muted-foreground">No FAQs added yet.</p>}

                            <div className="space-y-4">
                                {data.faqs.map((f, i) => (
                                    <div key={i} className="grid gap-3 rounded-lg border p-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Question</Label>
                                            <Input
                                                value={f.question}
                                                onChange={(e) => updateFaq(i, 'question', e.target.value)}
                                                placeholder="Do you charge installation?"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Answer</Label>
                                            <Input
                                                value={f.answer}
                                                onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                                                placeholder="Installation is free for annual plans."
                                            />
                                        </div>
                                        <div className="flex justify-end md:col-span-2">
                                            <Button type="button" variant="destructive" onClick={() => removeFaq(i)}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.faqs && <p className="text-sm text-red-500">{errors.faqs}</p>}
                        </section>

                        {/* ===== Images ===== */}
                        <section className="space-y-2">
                            <Label htmlFor="images">Images (multiple)</Label>
                            <Input id="images" type="file" multiple onChange={(e) => setData('images', Array.from(e.target.files || []))} />
                            {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
                        </section>

                        {/* ===== Submit ===== */}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit Service'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
