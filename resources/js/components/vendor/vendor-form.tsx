import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm } from '@inertiajs/react';
import { HelpCircle, Image, MapPin, Package, Plus, Trash2, Zap } from 'lucide-react';
import React from 'react';
import { RichEditor } from '../editor/rich-editor';
import LocationPicker from '../shared/locationPicker';

type PackageName = 'Basic' | 'Standard' | 'Premium';
type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly';

const PACKAGE_NAMES: PackageName[] = ['Basic', 'Standard', 'Premium'];
const CONNECTION_TYPES = ['fiber', 'dsl', 'wireless'] as const;
const HIGHLIGHTS = ['new', 'trending', 'reliable', 'popular', 'undefined'] as const;

// Auto-generate package configurations
const PACKAGE_PRESETS: Record<
    PackageName,
    {
        speed_label: string;
        featuresStr: string;
        description: string;
    }
> = {
    Basic: {
        speed_label: '25-50 Mbps',
        featuresStr: 'Basic internet, Email support, Standard router',
        description: 'Perfect for light browsing and emails',
    },
    Standard: {
        speed_label: '100-200 Mbps',
        featuresStr: 'HD streaming, Priority support, Advanced router, No data caps',
        description: 'Great for families and remote work',
    },
    Premium: {
        speed_label: '500-1000 Mbps',
        featuresStr: '4K streaming, 24/7 premium support, Mesh WiFi system, Static IP option',
        description: 'Ultimate performance for gaming and large households',
    },
};

type PackageForm = {
    name: PackageName;
    price: string;
    billing_cycle: BillingCycle;
    speed_label: string;
    featuresStr: string;
    description: string;
    currency: string;
    is_popular: boolean;
};

type FaqItem = { question: string; answer: string };

export type VendorServiceFormData = {
    title: string;
    city: string;
    latitude: number | string;
    longitude: number | string;
    location: string;
    posted_date: string;
    connection_type: 'fiber' | 'dsl' | 'wireless';
    highlight: 'new' | 'trending' | 'reliable' | 'popular' | 'undefined';
    short_description: string;
    full_description: string;
    featuresStr: string;
    speedDetailsStr: {
        download: string;
        upload: string;
        latency?: string;
        data_cap?: string;
    };
    packages: PackageForm[];
    faqs: FaqItem[];
    images: File[];
    coverage_area: string;
    is_active: boolean;
};

export default function VendorServiceForm() {
    const { data, setData, post, processing, errors, reset, transform } = useForm<VendorServiceFormData>({
        title: '',
        city: '',
        latitude: '',
        longitude: '',
        location: '',
        posted_date: new Date().toISOString().slice(0, 10),
        connection_type: 'fiber',
        highlight: 'undefined',
        short_description: '',
        full_description: '',
        featuresStr: '',
        speedDetailsStr: {
            download: '',
            upload: '',
            latency: '',
            data_cap: '',
        },
        packages: PACKAGE_NAMES.map<PackageForm>((name) => ({
            name,
            price: '',
            billing_cycle: 'Monthly',
            speed_label: PACKAGE_PRESETS[name].speed_label,
            featuresStr: PACKAGE_PRESETS[name].featuresStr,
            description: PACKAGE_PRESETS[name].description,
            currency: 'PKR',
            is_popular: name === 'Standard',
        })),
        faqs: [],
        images: [],
        coverage_area: '',
        is_active: true,
    });

    const [disabledPackages, setDisabledPackages] = React.useState<Record<PackageName, boolean>>({
        Basic: false,
        Standard: false,
        Premium: false,
    });

    // Auto-fill speed details based on package selection
    const applyPackageSpeedPreset = (packageName: PackageName) => {
        const preset = PACKAGE_PRESETS[packageName];
        const speedMatch = preset.speed_label.match(/(\d+)-(\d+)/);
        if (speedMatch) {
            setData('speedDetailsStr', {
                ...data.speedDetailsStr,
                download: `${speedMatch[2]} Mbps`,
                upload: `${Math.floor(parseInt(speedMatch[2]) * 0.5)} Mbps`,
            });
        }
    };

    // Auto-fill features based on connection type
    React.useEffect(() => {
        const featurePresets = {
            fiber: 'Symmetrical speeds, Low latency, Fiber optic technology',
            dsl: 'Copper line, Reliable, Wide coverage',
            wireless: 'Wireless technology, Quick installation, Flexible',
        };

        if (data.connection_type) {
            setData('featuresStr', featurePresets[data.connection_type]);
        }
    }, [data.connection_type, setData]);

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

    const handleSpeedDetailChange = <K extends keyof typeof data.speedDetailsStr>(key: K, value: string) => {
        setData('speedDetailsStr', {
            ...data.speedDetailsStr,
            [key]: value,
        });
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

    // Auto-generate FAQ suggestions
    const suggestFaqs = () => {
        const suggestedFaqs: FaqItem[] = [
            {
                question: 'What is the installation process?',
                answer: 'Professional installation typically takes 2-4 hours with minimal disruption.',
            },
            {
                question: 'Is there a contract required?',
                answer: 'We offer both contract and no-contract options to suit your needs.',
            },
            {
                question: 'What happens during outages?',
                answer: 'We provide 24/7 support and aim to resolve any issues within 4 hours.',
            },
        ];

        setData('faqs', [...data.faqs, ...suggestedFaqs]);
    };

    // ------- Submit -------
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((current) => {
            const packages = (current.packages as PackageForm[])
                .filter((p) => !disabledPackages[p.name])
                .map((p) => ({
                    name: p.name,
                    price: Number(p.price || 0),
                    billing_cycle: p.billing_cycle,
                    speed_label: p.speed_label || undefined,
                    features: splitCSV(p.featuresStr),
                    description: p.description || undefined,
                    currency: p.currency || 'PKR',
                    is_popular: !!p.is_popular,
                }));

            const speedDetails = Object.fromEntries(Object.entries(current.speedDetailsStr).filter(([_, value]) => value.trim() !== ''));

            return {
                title: current.title,
                city: current.city,
                location: current.location,
                latitude: current.latitude,
                longitude: current.longitude,
                posted_date: current.posted_date || undefined,
                connection_type: current.connection_type,
                highlight: current.highlight,
                short_description: current.short_description,
                full_description: current.full_description,
                coverage_area: current.coverage_area,
                is_active: current.is_active ? 1 : 0,
                images: current.images,
                features: splitCSV(current.featuresStr),
                speed_details: speedDetails,
                packages,
                faqs: (current.faqs as FaqItem[]).filter((f) => f.question.trim() && f.answer.trim()),
            };
        });

        post(route('submission.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Create Vendor Service</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">Fill in the details below to create your internet service listing</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                        <Label>Active</Label>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-10">
                        {/* ===== Basic Info ===== */}
                        <section className="grid gap-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-blue-500" />
                                <h2 className="text-xl font-semibold">Basic Information</h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Service Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Fiber Max — 50 Mbps"
                                        className="text-lg"
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Connection Type</Label>
                                    <div className="flex gap-2">
                                        {CONNECTION_TYPES.map((type) => (
                                            <Badge
                                                key={type}
                                                variant={data.connection_type === type ? 'default' : 'outline'}
                                                className="cursor-pointer rounded-md border capitalize dark:border-input"
                                                onClick={() => setData('connection_type', type)}
                                            >
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Highlight</Label>
                                    <Select value={data.highlight} onValueChange={(v) => setData('highlight', v as any)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select highlight" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {HIGHLIGHTS.map((highlight) => (
                                                <SelectItem key={highlight} value={highlight} className="capitalize">
                                                    {highlight === 'undefined' ? 'No Highlight' : highlight}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>
                                        Is Your Location Correct? If Not
                                        <span
                                            onClick={() => router.get(route('submission.index'))}
                                            className="inline-flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                                        >
                                            {' '}
                                            Refresh Page
                                        </span>
                                    </Label>

                                    {data.location && <Label className="text-balance">{data.location}</Label>}
                                    {data.latitude && data.longitude && (
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${data.latitude},${data.longitude}`)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                                        >
                                            Open in Maps
                                        </a>
                                    )}

                                    <LocationPicker
                                        className="border-none"
                                        showTiles={false}
                                        onSelect={(loc) => {
                                            setData('latitude', loc.lat);
                                            setData('longitude', loc.lng);
                                            setData('location', loc.name);
                                            setData('city', loc.city);
                                        }}
                                    />
                                    <div className="flex gap-3">
                                        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="coverage_area">Coverage Area</Label>
                                    <Textarea
                                        id="coverage_area"
                                        value={data.coverage_area}
                                        onChange={(e) => setData('coverage_area', e.target.value)}
                                        placeholder="List areas / blocks covered..."
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ===== Descriptions ===== */}
                        <section className="grid gap-6">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                <h2 className="text-xl font-semibold">Service Details</h2>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="short_description">Short Description *</Label>
                                <Textarea
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    placeholder="Concise selling points that appear in listings..."
                                    rows={3}
                                />
                                <div className="flex justify-between">
                                    <p className="text-xs text-muted-foreground">Keep it under 150 characters for best results</p>
                                    <span className={`text-xs ${data.short_description.length > 150 ? 'text-red-500' : 'text-muted-foreground'}`}>
                                        {data.short_description.length}/150
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Full Description</Label>
                                <RichEditor value={data.full_description} onChange={(html) => setData('full_description', html)} />
                            </div>
                        </section>

                        {/* ===== Features & Speed ===== */}
                        <section className="grid gap-6">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-green-500" />
                                <h2 className="text-xl font-semibold">Speed & Features</h2>
                            </div>

                            <div className="space-y-2">
                                <Label>Service Features</Label>
                                <Input
                                    value={data.featuresStr}
                                    onChange={(e) => setData('featuresStr', e.target.value)}
                                    placeholder="Free router, 24/7 support, No FUP"
                                />
                                <p className="text-xs text-muted-foreground">Separate features with commas. Auto-filled based on connection type.</p>
                            </div>

                            <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
                                <h3 className="text-lg font-semibold md:col-span-2">Speed Details</h3>

                                {(['download', 'upload', 'latency', 'data_cap'] as const).map((field) => (
                                    <div key={field} className="space-y-2">
                                        <Label htmlFor={field} className="capitalize">
                                            {field.replace('_', ' ')} {['download', 'upload'].includes(field) && '*'}
                                        </Label>
                                        <Input
                                            id={field}
                                            required={['download', 'upload'].includes(field)}
                                            value={data.speedDetailsStr[field] || ''}
                                            onChange={(e) => handleSpeedDetailChange(field, e.target.value)}
                                            placeholder={
                                                field === 'download'
                                                    ? 'e.g., 50 Mbps'
                                                    : field === 'upload'
                                                      ? 'e.g., 25 Mbps'
                                                      : field === 'latency'
                                                        ? 'e.g., 10 ms'
                                                        : 'e.g., Unlimited or 1TB'
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ===== Packages ===== */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-semibold">Packages</h2>
                            </div>

                            <div className="grid gap-4">
                                {data.packages.map((pkg, idx) => (
                                    <div key={pkg.name} className="rounded-lg border p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold">{pkg.name}</h3>
                                                {pkg.is_popular && (
                                                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                                        Popular
                                                    </Badge>
                                                )}
                                            </div>

                                            {pkg.name !== 'Basic' && (
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={!disabledPackages[pkg.name]}
                                                        onCheckedChange={(checked) => {
                                                            setDisabledPackages((prev) => ({ ...prev, [pkg.name]: !checked }));
                                                            if (checked) {
                                                                applyPackageSpeedPreset(pkg.name);
                                                            }
                                                        }}
                                                    />
                                                    <Label className="text-sm">Enable {pkg.name}</Label>
                                                </div>
                                            )}
                                        </div>

                                        {!disabledPackages[pkg.name] && (
                                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                <div className="space-y-2">
                                                    <Label>Price ({pkg.currency})</Label>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        value={pkg.price}
                                                        onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                                                        placeholder="e.g. 2999"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Billing Cycle</Label>
                                                    <Select
                                                        value={pkg.billing_cycle}
                                                        onValueChange={(v) => handlePackageChange(idx, 'billing_cycle', v as BillingCycle)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Monthly">Monthly</SelectItem>
                                                            <SelectItem value="Quarterly">Quarterly</SelectItem>
                                                            <SelectItem value="Yearly">Yearly</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Speed Label</Label>
                                                    <Input
                                                        value={pkg.speed_label}
                                                        onChange={(e) => handlePackageChange(idx, 'speed_label', e.target.value)}
                                                        placeholder="50 Mbps"
                                                    />
                                                </div>

                                                <div className="space-y-2 md:col-span-2">
                                                    <Label>Package Features</Label>
                                                    <Input
                                                        value={pkg.featuresStr}
                                                        onChange={(e) => handlePackageChange(idx, 'featuresStr', e.target.value)}
                                                        placeholder="Free installation, Static IP, Fair usage 1TB"
                                                    />
                                                </div>

                                                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                                                    <Label>Description</Label>
                                                    <Textarea
                                                        value={pkg.description}
                                                        onChange={(e) => handlePackageChange(idx, 'description', e.target.value)}
                                                        placeholder="More details about what's included..."
                                                        rows={2}
                                                    />
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <Input
                                                        id={`popular-${idx}`}
                                                        type="checkbox"
                                                        checked={pkg.is_popular}
                                                        onChange={(e) => handlePackageChange(idx, 'is_popular', e.target.checked)}
                                                        className="h-4 w-4"
                                                    />
                                                    <Label htmlFor={`popular-${idx}`}>Mark as Popular Package</Label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ===== FAQs ===== */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <HelpCircle className="h-5 w-5 text-blue-500" />
                                    <h2 className="text-xl font-semibold">FAQs</h2>
                                </div>
                                <div className="flex gap-2">
                                    <Button type="button" variant="outline" onClick={suggestFaqs}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Suggest FAQs
                                    </Button>
                                    <Button type="button" variant="outline" onClick={addFaq}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add FAQ
                                    </Button>
                                </div>
                            </div>

                            {data.faqs.length === 0 && (
                                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                                    <HelpCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                    <p className="text-muted-foreground">No FAQs added yet.</p>
                                    <Button type="button" variant="outline" onClick={suggestFaqs} className="mt-2">
                                        Add suggested FAQs
                                    </Button>
                                </div>
                            )}

                            <div className="space-y-4">
                                {data.faqs.map((f, i) => (
                                    <div key={i} className="grid gap-3 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">FAQ #{i + 1}</h4>
                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFaq(i)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="grid gap-3 md:grid-cols-2">
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ===== Images ===== */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Image className="h-5 w-5 text-green-500" />
                                <h2 className="text-xl font-semibold">Images</h2>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="images">Upload Service Images</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        const maxSize = 2 * 1024 * 1024;
                                        const validFiles = files.filter((file) => file.size <= maxSize);
                                        const invalidFiles = files.filter((file) => file.size > maxSize);

                                        if (invalidFiles.length > 0) {
                                            alert(`${invalidFiles.length} files were too large (max 2MB each). They were ignored.`);
                                        }

                                        setData('images', validFiles);
                                    }}
                                />
                                <p className="text-xs text-muted-foreground">Upload multiple images. Maximum 2MB per file. Recommended: 1200x630px</p>
                                {data.images.length > 0 && (
                                    <div className="mt-2">
                                        <Badge variant="secondary">{data.images.length} file(s) selected</Badge>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* ===== Submit ===== */}
                        <div className="flex items-center justify-between border-t pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    if (confirm('Are you sure? All unsaved changes will be lost.')) {
                                        reset();
                                    }
                                }}
                            >
                                Reset Form
                            </Button>

                            <Button type="submit" disabled={processing} size="lg">
                                {processing ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    'Publish Service'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
