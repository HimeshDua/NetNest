import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

export default function VendorForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        vendor_name: '',
        logo: '',
        location: '',
        connection_type: 'fiber',
        price: '',
        billing_cycle: 'Monthly',
        posted_date: '',
        short_description: '',
        full_description: '',
        highlight: 'undefined',
        features: '',
        faqs: '',
        images: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSelectChange = (name, value) => {
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            features: data.features
                .split(',')
                .map((f) => f.trim())
                .filter((f) => f !== ''),
            faqs: data.faqs ? JSON.parse(data.faqs) : [],
            images: data.images
                .split(',')
                .map((i) => i.trim())
                .filter((i) => i !== ''),
        };

        post(route('submission.store'), {
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
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Service Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={handleChange}
                                    placeholder="FastNet 100 Mbps Plan"
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={handleChange}
                                    placeholder="fastnet-100mbps-plan"
                                />
                                {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vendor_name">Vendor Name</Label>
                                <Input
                                    id="vendor_name"
                                    name="vendor_name"
                                    type="text"
                                    value={data.vendor_name}
                                    onChange={handleChange}
                                    placeholder="FastNet"
                                />
                                {errors.vendor_name && <p className="text-sm text-red-500">{errors.vendor_name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo">Logo URL or Path</Label>
                                <Input
                                    id="logo"
                                    name="logo"
                                    type="text"
                                    value={data.logo}
                                    onChange={handleChange}
                                    placeholder="/storage/logos/logo.png"
                                />
                                {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={data.location}
                                    onChange={handleChange}
                                    placeholder="Karachi"
                                />
                                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                            </div>
                        </div>

                        <Separator />

                        {/* Technical Info */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="connection_type">Connection Type</Label>
                                <Select value={data.connection_type} onValueChange={(val) => handleSelectChange('connection_type', val)}>
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
                                <Label htmlFor="price">Price (PKR)</Label>
                                <Input id="price" name="price" type="number" value={data.price} onChange={handleChange} placeholder="2500" />
                                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="billing_cycle">Billing Cycle</Label>
                                <Input
                                    id="billing_cycle"
                                    name="billing_cycle"
                                    type="text"
                                    value={data.billing_cycle}
                                    onChange={handleChange}
                                    placeholder="Monthly"
                                />
                                {errors.billing_cycle && <p className="text-sm text-red-500">{errors.billing_cycle}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="posted_date">Posted Date</Label>
                                <Input id="posted_date" name="posted_date" type="date" value={data.posted_date} onChange={handleChange} />
                                {errors.posted_date && <p className="text-sm text-red-500">{errors.posted_date}</p>}
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
                                    onChange={handleChange}
                                    placeholder="Affordable plan with no FUP."
                                />
                                {errors.short_description && <p className="text-sm text-red-500">{errors.short_description}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="full_description">Full Description</Label>
                                <Textarea
                                    id="full_description"
                                    name="full_description"
                                    value={data.full_description}
                                    onChange={handleChange}
                                    placeholder="Detailed overview..."
                                    rows={5}
                                />
                                {errors.full_description && <p className="text-sm text-red-500">{errors.full_description}</p>}
                            </div>
                        </div>

                        <Separator />

                        {/* Extras */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="highlight">Highlight</Label>
                                <Select value={data.highlight} onValueChange={(val) => handleSelectChange('highlight', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose highlight" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="trending">Trending</SelectItem>
                                        <SelectItem value="reliable">Reliable</SelectItem>
                                        <SelectItem value="popular">Popular</SelectItem>
                                        <SelectItem value="undefined">Undefined</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.highlight && <p className="text-sm text-red-500">{errors.highlight}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="features">Features (comma separated)</Label>
                                <Input
                                    id="features"
                                    name="features"
                                    type="text"
                                    value={data.features}
                                    onChange={handleChange}
                                    placeholder="Unlimited Data, Free Router"
                                />
                                {errors.features && <p className="text-sm text-red-500">{errors.features}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="faqs">FAQs (JSON format)</Label>
                                <Textarea
                                    id="faqs"
                                    name="faqs"
                                    value={data.faqs}
                                    onChange={handleChange}
                                    placeholder='[{"question": "Is it unlimited?", "answer": "Yes."}]'
                                />
                                {errors.faqs && <p className="text-sm text-red-500">{errors.faqs}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="images">Images (comma separated URLs)</Label>
                                <Textarea
                                    id="images"
                                    name="images"
                                    value={data.images}
                                    onChange={handleChange}
                                    placeholder="/img/1.jpg, /img/2.jpg"
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
