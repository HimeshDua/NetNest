import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Cms } from '@/types/cms';
import { useForm } from '@inertiajs/react';
import { Plus, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export default function CmsPage({ cms }: { cms?: Cms }) {
    const { data, setData, post, processing, errors } = useForm<Cms>({
        // Hero
        hero_title: cms?.hero_title || '',
        hero_subtitle: cms?.hero_subtitle || '',
        hero_background_image: null,
        hero_background_image_path: cms?.hero_background_image || '',
        hero_cta_text: cms?.hero_cta_text || '',
        hero_cta_link: cms?.hero_cta_link || '',

        // Marquees
        marquees: cms?.marquees || [],

        // Features
        features_primary: cms?.features_primary || [],
        features_secondary: cms?.features_secondary || [],

        // About
        about_title: cms?.about_title || '',
        about_description: cms?.about_description || '',
        about_image: null,
        about_image_path: cms?.about_image || '',

        // Testimonials
        testimonials: cms?.testimonials || [],

        // SEO
        meta_title: cms?.meta_title || '',
        meta_description: cms?.meta_description || '',
        meta_keywords: cms?.meta_keywords || [],

        // Footer + Social
        footer_links: cms?.footer_links || [],
        social_links: cms?.social_links || [],
    });

    // state for image previews
    const [heroImagePreview, setHeroImagePreview] = useState(data.hero_background_image_path);
    const [aboutImagePreview, setAboutImagePreview] = useState(data.about_image_path);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | 'about') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'hero') {
                    setHeroImagePreview(reader.result as string);
                    setData('hero_background_image', file);
                } else if (type === 'about') {
                    setAboutImagePreview(reader.result as string);
                    setData('about_image', file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleListChange = (listName: keyof Cms, index: number, key: string, value: string) => {
        const updatedList = [...(data[listName] as any[])];
        updatedList[index][key] = value;
        setData(listName, updatedList as any);
    };

    const handleRemoveItem = (listName: keyof Cms, index: number) => {
        const updatedList = [...(data[listName] as any[])];
        updatedList.splice(index, 1);
        setData(listName, updatedList as any);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.cms.update', cms?.id || null), {
            forceFormData: true,
        });
    };

    // Helper function to get nested errors
    const getNestedError = (path: string): string | null => {
        const parts = path.split('.');
        let error: any = errors;
        for (const part of parts) {
            if (error && typeof error === 'object' && part in error) {
                error = error[part];
            } else {
                return null;
            }
        }
        return typeof error === 'string' ? error : null;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 p-6">
            {/* Hero Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Homepage Hero</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="hero_title">Hero Title</Label>
                        <Input id="hero_title" value={data.hero_title} onChange={(e) => setData('hero_title', e.target.value)} />
                        {errors.hero_title && <p className="text-sm text-red-500">{errors.hero_title}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="hero_subtitle">Subtitle</Label>
                        <Textarea id="hero_subtitle" value={data.hero_subtitle} onChange={(e) => setData('hero_subtitle', e.target.value)} />
                        {errors.hero_subtitle && <p className="text-sm text-red-500">{errors.hero_subtitle}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="hero_background_image">Background Image</Label>
                        <Input id="hero_background_image" type="file" onChange={(e) => handleImageChange(e, 'hero')} />
                        {heroImagePreview && (
                            <div className="sm:64 relative mt-2 h-96 w-full overflow-hidden rounded-md md:h-96 lg:h-48">
                                <img
                                    src={`/storage/${heroImagePreview}`}
                                    alt="Hero Background"
                                    className="h-full w-full rounded-t-md object-cover"
                                    draggable={false}
                                />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                    onClick={() => {
                                        setHeroImagePreview('');
                                        setData('hero_background_image', null);
                                        setData('hero_background_image_path', '');
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="hero_cta_text">CTA Text</Label>
                            <Input id="hero_cta_text" value={data.hero_cta_text} onChange={(e) => setData('hero_cta_text', e.target.value)} />
                            {errors.hero_cta_text && <p className="text-sm text-red-500">{errors.hero_cta_text}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hero_cta_link">CTA Link</Label>
                            <Input
                                id="hero_cta_link"
                                type="text"
                                value={data.hero_cta_link}
                                onChange={(e) => setData('hero_cta_link', e.target.value)}
                            />
                            {errors.hero_cta_link && <p className="text-sm text-red-500">{errors.hero_cta_link}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Marquees */}
            <Card>
                <CardHeader>
                    <CardTitle>Marquee Announcements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.marquees.map((m, i) => (
                        <div key={i} className="grid grid-cols-[1fr,1fr,auto] items-end gap-4">
                            <div className="grid gap-2">
                                <Label>Text</Label>
                                <Input
                                    placeholder="Announcement text"
                                    value={m.text}
                                    onChange={(e) => handleListChange('marquees', i, 'text', e.target.value)}
                                />
                                {getNestedError(`marquees.${i}.text`) && (
                                    <p className="text-sm text-red-500">{getNestedError(`marquees.${i}.text`)}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Link</Label>
                                <Input
                                    placeholder="Link URL (e.g., https://...)"
                                    type="url"
                                    value={m.link}
                                    onChange={(e) => handleListChange('marquees', i, 'link', e.target.value)}
                                />
                                {getNestedError(`marquees.${i}.link`) && (
                                    <p className="text-sm text-red-500">{getNestedError(`marquees.${i}.link`)}</p>
                                )}
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => handleRemoveItem('marquees', i)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => setData('marquees', [...data.marquees, { text: '', link: '' }])}>
                        <Plus className="mr-2 h-4 w-4" /> Add Marquee
                    </Button>
                </CardContent>
            </Card>

            <Separator />

            {/* Features */}
            <Card>
                <CardHeader>
                    <CardTitle>Primary Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.features_primary.map((f, i) => (
                        <div key={i} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input
                                    placeholder="Feature title"
                                    value={f.title}
                                    onChange={(e) => handleListChange('features_primary', i, 'title', e.target.value)}
                                />
                                {getNestedError(`features_primary.${i}.title`) && (
                                    <p className="text-sm text-red-500">{getNestedError(`features_primary.${i}.title`)}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea
                                    placeholder="Brief description of the feature"
                                    value={f.description}
                                    onChange={(e) => handleListChange('features_primary', i, 'description', e.target.value)}
                                />
                                {getNestedError(`features_primary.${i}.description`) && (
                                    <p className="text-sm text-red-500">{getNestedError(`features_primary.${i}.description`)}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Icon</Label>
                                <Input
                                    placeholder="Lucide Icon Name (e.g., 'CheckCircle')"
                                    value={f.icon}
                                    onChange={(e) => handleListChange('features_primary', i, 'icon', e.target.value)}
                                />
                                {getNestedError(`features_primary.${i}.icon`) && (
                                    <p className="text-sm text-red-500">{getNestedError(`features_primary.${i}.icon`)}</p>
                                )}
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => handleRemoveItem('features_primary', i)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setData('features_primary', [...data.features_primary, { title: '', description: '', icon: '' }])}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Feature
                    </Button>
                </CardContent>
            </Card>

            <Separator />

            {/* About Section */}
            <Card>
                <CardHeader>
                    <CardTitle>About Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="about_title">About Title</Label>
                        <Input id="about_title" value={data.about_title} onChange={(e) => setData('about_title', e.target.value)} />
                        {errors.about_title && <p className="text-sm text-red-500">{errors.about_title}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="about_description">About Description</Label>
                        <Textarea
                            id="about_description"
                            value={data.about_description}
                            onChange={(e) => setData('about_description', e.target.value)}
                        />
                        {errors.about_description && <p className="text-sm text-red-500">{errors.about_description}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="about_image">About Image</Label>
                        <Input id="about_image" type="file" onChange={(e) => handleImageChange(e, 'about')} />
                        {errors.about_image && <p className="text-sm text-red-500">{errors.about_image}</p>}
                        {aboutImagePreview && (
                            <div className="relative mt-2 h-48 w-full overflow-hidden rounded-md">
                                <img src={aboutImagePreview} alt="About" className="h-full w-full object-cover" />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                    onClick={() => {
                                        setAboutImagePreview('');
                                        setData('about_image', null);
                                        setData('about_image_path', '');
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Testimonials */}
            <Card>
                <CardHeader>
                    <CardTitle>Testimonials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.testimonials.map((t, i) => (
                        <div key={i} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <Input
                                    placeholder="Customer name"
                                    value={t.name}
                                    onChange={(e) => handleListChange('testimonials', i, 'name', e.target.value)}
                                />
                                {getNestedError(`testimonials.${i}.name`) && (
                                    <p className="text-sm text-red-500">{getNestedError(`testimonials.${i}.name`)}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Quote</Label>
                                <Textarea
                                    placeholder="The testimonial quote"
                                    value={t.quote}
                                    onChange={(e) => handleListChange('testimonials', i, 'quote', e.target.value)}
                                />
                                {getNestedError(`testimonials.${i}.quote`) && (
                                    <p className="text-sm text-red-500">{getNestedError(`testimonials.${i}.quote`)}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Avatar URL</Label>
                                <Input
                                    placeholder="Link to avatar image"
                                    type="url"
                                    value={t.avatar}
                                    onChange={(e) => handleListChange('testimonials', i, 'avatar', e.target.value)}
                                />
                                {getNestedError(`testimonials.${i}.avatar`) && (
                                    <p className="text-sm text-red-500">{getNestedError(`testimonials.${i}.avatar`)}</p>
                                )}
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => handleRemoveItem('testimonials', i)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setData('testimonials', [...data.testimonials, { name: '', quote: '', avatar: '' }])}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                    </Button>
                </CardContent>
            </Card>

            <Separator />

            {/* SEO */}
            <Card>
                <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="meta_title">Meta Title</Label>
                        <Input
                            id="meta_title"
                            placeholder="A brief, descriptive title"
                            value={data.meta_title}
                            onChange={(e) => setData('meta_title', e.target.value)}
                        />
                        {errors.meta_title && <p className="text-sm text-red-500">{errors.meta_title}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <Textarea
                            id="meta_description"
                            placeholder="A short summary of the page content"
                            value={data.meta_description}
                            onChange={(e) => setData('meta_description', e.target.value)}
                        />
                        {errors.meta_description && <p className="text-sm text-red-500">{errors.meta_description}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="meta_keywords">Meta Keywords</Label>
                        <Textarea
                            id="meta_keywords"
                            placeholder="Comma-separated keywords (e.g., product, service, pricing)"
                            value={data.meta_keywords.join(', ')}
                            onChange={(e) =>
                                setData(
                                    'meta_keywords',
                                    e.target.value.split(',').map((k) => k.trim()),
                                )
                            }
                        />
                        {errors.meta_keywords && <p className="text-sm text-red-500">{errors.meta_keywords}</p>}
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Footer + Social */}
            <Card>
                <CardHeader>
                    <CardTitle>Footer & Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label className="font-semibold">Footer Links</Label>
                        {data.footer_links.map((link, i) => (
                            <div key={i} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label>Name</Label>
                                    <Input
                                        placeholder="Link name"
                                        value={link.name}
                                        onChange={(e) => handleListChange('footer_links', i, 'name', e.target.value)}
                                    />
                                    {getNestedError(`footer_links.${i}.name`) && (
                                        <p className="text-sm text-red-500">{getNestedError(`footer_links.${i}.name`)}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label>URL</Label>
                                    <Input
                                        placeholder="Link URL"
                                        type="url"
                                        value={link.href}
                                        onChange={(e) => handleListChange('footer_links', i, 'href', e.target.value)}
                                    />
                                    {getNestedError(`footer_links.${i}.href`) && (
                                        <p className="text-sm text-red-500">{getNestedError(`footer_links.${i}.href`)}</p>
                                    )}
                                </div>
                                <Button variant="destructive" size="icon" onClick={() => handleRemoveItem('footer_links', i)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setData('footer_links', [...data.footer_links, { name: '', href: '' }])}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Footer Link
                        </Button>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                        <Label className="font-semibold">Social Links</Label>
                        {data.social_links.map((s, i) => (
                            <div key={i} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="grid gap-2">
                                    <Label>Platform</Label>
                                    <Input
                                        placeholder="Platform name (e.g., Twitter)"
                                        value={s.platform}
                                        onChange={(e) => handleListChange('social_links', i, 'platform', e.target.value)}
                                    />
                                    {getNestedError(`social_links.${i}.platform`) && (
                                        <p className="text-sm text-red-500">{getNestedError(`social_links.${i}.platform`)}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label>URL</Label>
                                    <Input
                                        placeholder="Profile URL"
                                        type="url"
                                        value={s.url}
                                        onChange={(e) => handleListChange('social_links', i, 'url', e.target.value)}
                                    />
                                    {getNestedError(`social_links.${i}.url`) && (
                                        <p className="text-sm text-red-500">{getNestedError(`social_links.${i}.url`)}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Icon</Label>
                                    <Input
                                        placeholder="Lucide Icon Name"
                                        value={s.icon}
                                        onChange={(e) => handleListChange('social_links', i, 'icon', e.target.value)}
                                    />
                                    {getNestedError(`social_links.${i}.icon`) && (
                                        <p className="text-sm text-red-500">{getNestedError(`social_links.${i}.icon`)}</p>
                                    )}
                                </div>
                                <Button variant="destructive" size="icon" onClick={() => handleRemoveItem('social_links', i)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setData('social_links', [...data.social_links, { platform: '', url: '', icon: '' }])}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Social Link
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={processing}>
                <Save className="mr-2 h-4 w-4" /> Save CMS Settings
            </Button>
        </form>
    );
}
