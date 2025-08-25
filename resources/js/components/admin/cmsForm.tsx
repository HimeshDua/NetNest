import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Cms, CmsYes } from '@/types/cms';
import { useForm } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Plus, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { ImageUpload } from '../image-upload';
import { Badge } from '../ui/badge';

export default function CmsForm({ cms }: { cms: Cms }) {
    const { data, setData, post, processing, errors } = useForm<CmsYes>({
        hero: cms?.hero || {
            title: '',
            subtitle: '',
            buttons: [
                {
                    text: '',
                    href: '',
                    variant: '',
                },
            ],
            mockup: {
                srcLight: '',
                srcDark: '',
                alt: '',
            },
        },
        marquees: cms?.marquees || [{ text: '', link: '' }],
        features_primary: cms?.features_primary || [],
        features_secondary: cms?.features_secondary || [],
        about: cms?.about || { title: '', description: '', image: '' },
        testimonials: cms?.testimonials || [],
        seo: cms?.seo || { title: '', description: '', keywords: [] },
    });

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        hero: true,
        marquees: false,
        features: false,
        testimoniayls: false,
        seo: false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
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
        post(route('admin.cms.update'), { forceFormData: true });
    };

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
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">CMS Configuration</h1>
                <Button type="submit" className="gap-2" disabled={processing}>
                    <Save className="h-4 w-4" /> Save Changes
                </Button>
            </div>

            <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-6 space-y-6">
                    {/* Hero Section */}
                    <Collapsible open={expandedSections.hero} onOpenChange={() => toggleSection('hero')} className="rounded-lg border">
                        <Card>
                            <CardHeader className="cursor-pointer" onClick={() => toggleSection('hero')}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            Homepage Hero
                                            {data.hero?.title && (
                                                <Badge variant="outline" className="ml-2">
                                                    Configured
                                                </Badge>
                                            )}
                                        </CardTitle>
                                        <CardDescription>Main banner section of your homepage</CardDescription>
                                    </div>
                                    {expandedSections.hero ? <ChevronUp /> : <ChevronDown />}
                                </div>
                            </CardHeader>

                            <CollapsibleContent>
                                <CardContent className="grid gap-6 py-6">
                                    {/* Left side: text + buttons */}
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="grid space-y-4">
                                            {/* Hero Title */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="hero_title">Hero Title *</Label>
                                                <Input
                                                    id="hero_title"
                                                    value={data.hero?.title || ''}
                                                    onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })}
                                                    placeholder="Welcome to our website"
                                                />
                                                {errors['hero.title'] && <p className="text-sm text-red-500">{errors['hero.title']}</p>}
                                            </div>

                                            {/* Subtitle */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="hero_subtitle">Subtitle</Label>
                                                <Textarea
                                                    id="hero_subtitle"
                                                    value={data.hero?.subtitle || ''}
                                                    onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })}
                                                    placeholder="A brief description of your offering"
                                                />
                                                {errors['hero.subtitle'] && <p className="text-sm text-red-500">{errors['hero.subtitle']}</p>}
                                            </div>

                                            {/* Buttons (array) */}
                                            <div className="grid gap-2">
                                                <Label>Hero Buttons</Label>
                                                <div className="space-y-3">
                                                    {data.hero?.buttons?.map((btn, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <Input
                                                                className="flex-1"
                                                                value={btn.text}
                                                                onChange={(e) => {
                                                                    const buttons = [...data.hero.buttons];
                                                                    buttons[idx].text = e.target.value;
                                                                    setData('hero', { ...data.hero, buttons });
                                                                }}
                                                                placeholder="Button Text"
                                                            />
                                                            <Input
                                                                className="flex-1"
                                                                value={btn.href}
                                                                onChange={(e) => {
                                                                    const buttons = [...data.hero.buttons];
                                                                    buttons[idx].href = e.target.value;
                                                                    setData('hero', { ...data.hero, buttons });
                                                                }}
                                                                placeholder="/signup or https://example.com"
                                                            />

                                                            <Select
                                                                defaultValue={btn.variant || 'default'}
                                                                onValueChange={(value) => {
                                                                    const buttons = [...data.hero.buttons];
                                                                    buttons[idx].variant = value;
                                                                    setData('hero', { ...data.hero, buttons });
                                                                }}
                                                            >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Select Variant" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Variants</SelectLabel>
                                                                        <SelectItem value="default">Default</SelectItem>
                                                                        <SelectItem value="outline">Outline</SelectItem>
                                                                        <SelectItem value="destructive">Destructive</SelectItem>
                                                                        <SelectItem value="secondary">Secondary</SelectItem>
                                                                        <SelectItem value="ghost">Ghost</SelectItem>
                                                                        <SelectItem value="link">Link</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>

                                                            <Button
                                                                size="icon"
                                                                variant="destructive"
                                                                onClick={() => {
                                                                    const buttons = data.hero.buttons.filter((_, i) => i !== idx);
                                                                    setData('hero', { ...data.hero, buttons });
                                                                }}
                                                            >
                                                                ✕
                                                            </Button>
                                                        </div>
                                                    ))}

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            setData('hero', {
                                                                ...data.hero,
                                                                buttons: [...(data.hero.buttons || []), { text: '', href: '', variant: '' }],
                                                            })
                                                        }
                                                    >
                                                        + Add Button
                                                    </Button>
                                                </div>
                                                {errors['hero.buttons'] && <p className="text-sm text-red-500">{errors['hero.buttons']}</p>}
                                            </div>
                                        </div>

                                        {/* Right side: images */}
                                        <div className="grid gap-4">
                                            <ImageUpload
                                                name="hero_mockup_light"
                                                label="Mockup (Light Mode)"
                                                // description="PNG or JPG, Recommended: 1200px wide"
                                                value={data.hero?.mockup?.srcLight}
                                                onChange={(file) =>
                                                    setData('hero', {
                                                        ...data.hero,
                                                        mockup: { ...(data.hero.mockup || {}), srcLight: file },
                                                    })
                                                }
                                            />

                                            <ImageUpload
                                                name="hero_mockup_dark"
                                                label="Mockup (Dark Mode)"
                                                // description="PNG or JPG, Recommended: 1200px wide"
                                                value={data.hero?.mockup?.srcDark}
                                                onChange={(file) =>
                                                    setData('hero', {
                                                        ...data.hero,
                                                        mockup: { ...(data.hero.mockup || {}), srcDark: file },
                                                    })
                                                }
                                            />

                                            <div className="grid gap-2">
                                                <Label htmlFor="hero_mockup_alt">Mockup Alt Text</Label>
                                                <Input
                                                    id="hero_mockup_alt"
                                                    value={data.hero?.mockup?.alt || ''}
                                                    onChange={(e) =>
                                                        setData('hero', {
                                                            ...data.hero,
                                                            mockup: { ...(data.hero.mockup || {}), alt: e.target.value },
                                                        })
                                                    }
                                                    placeholder="Screenshot description"
                                                />
                                                {errors['hero.mockup.alt'] && <p className="text-sm text-red-500">{errors['hero.mockup.alt']}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    {/* Marquee Section */}
                    <Collapsible open={expandedSections.marquees} onOpenChange={() => toggleSection('marquees')} className="rounded-lg border">
                        <Card>
                            <CardHeader className="cursor-pointer" onClick={() => toggleSection('marquees')}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            Marquee Announcements
                                            {data.marquees.length > 0 && (
                                                <Badge variant="outline" className="ml-2">
                                                    {data.marquees.length} items
                                                </Badge>
                                            )}
                                        </CardTitle>
                                        <CardDescription>Scrolling announcements at the top of your site</CardDescription>
                                    </div>
                                    {expandedSections.marquees ? <ChevronUp /> : <ChevronDown />}
                                </div>
                            </CardHeader>
                            <CollapsibleContent>
                                <CardContent className="space-y-4 pt-6">
                                    {data.marquees.map((m, i) => (
                                        <div key={i} className="grid gap-4 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">Marquee #{i + 1}</h4>
                                                <Button variant="ghost" size="sm" onClick={() => handleRemoveItem('marquees', i)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label>Text *</Label>
                                                    <Input
                                                        placeholder="Special announcement text"
                                                        value={m.text}
                                                        onChange={(e) => handleListChange('marquees', i, 'text', e.target.value)}
                                                    />
                                                    {getNestedError(`marquees.${i}.text`) && (
                                                        <p className="text-sm text-red-500">{getNestedError(`marquees.${i}.text`)}</p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Link URL</Label>
                                                    <Input
                                                        placeholder="https://example.com"
                                                        type="url"
                                                        value={m.link}
                                                        onChange={(e) => handleListChange('marquees', i, 'link', e.target.value)}
                                                    />
                                                    {getNestedError(`marquees.${i}.link`) && (
                                                        <p className="text-sm text-red-500">{getNestedError(`marquees.${i}.link`)}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setData('marquees', [...data.marquees, { text: '', link: '' }])}
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add Marquee
                                    </Button>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    {/* Features Section */}
                    <Collapsible open={expandedSections.features} onOpenChange={() => toggleSection('features')} className="rounded-lg border">
                        <Card>
                            <CardHeader className="cursor-pointer" onClick={() => toggleSection('features')}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            Primary Features
                                            {data.features_primary.length > 0 && (
                                                <Badge variant="outline" className="ml-2">
                                                    {data.features_primary.length} features
                                                </Badge>
                                            )}
                                        </CardTitle>
                                        <CardDescription>Key features to highlight on your homepage</CardDescription>
                                    </div>
                                    {expandedSections.features ? <ChevronUp /> : <ChevronDown />}
                                </div>
                            </CardHeader>
                            <CollapsibleContent>
                                <CardContent className="space-y-4 pt-6">
                                    {data.features_primary.map((f, i) => (
                                        <div key={i} className="grid gap-4 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">Feature #{i + 1}</h4>
                                                <Button variant="ghost" size="sm" onClick={() => handleRemoveItem('features_primary', i)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                <div className="grid gap-2">
                                                    <Label>Title *</Label>
                                                    <Input
                                                        placeholder="Feature title"
                                                        value={f.title}
                                                        onChange={(e) => handleListChange('features_primary', i, 'title', e.target.value)}
                                                    />
                                                    {getNestedError(`features_primary.${i}.title`) && (
                                                        <p className="text-sm text-red-500">{getNestedError(`features_primary.${i}.title`)}</p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2 md:col-span-2">
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
                                                    <Label>
                                                        Icon Name{' '}
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span className="cursor-help text-muted-foreground">(?)</span>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Use Lucide icon names (e.g., "CheckCircle")</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </Label>
                                                    <Input
                                                        placeholder="CheckCircle"
                                                        value={f.icon}
                                                        onChange={(e) => handleListChange('features_primary', i, 'icon', e.target.value)}
                                                    />
                                                    {getNestedError(`features_primary.${i}.icon`) && (
                                                        <p className="text-sm text-red-500">{getNestedError(`features_primary.${i}.icon`)}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() =>
                                            setData('features_primary', [...data.features_primary, { title: '', description: '', icon: '' }])
                                        }
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add Feature
                                    </Button>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    {/* Testimonials Section */}
                    <Collapsible
                        open={expandedSections.testimonials}
                        onOpenChange={() => toggleSection('testimonials')}
                        className="rounded-lg border"
                    >
                        <Card>
                            <CardHeader className="cursor-pointer" onClick={() => toggleSection('testimonials')}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            Testimonials
                                            {data.testimonials.length > 0 && (
                                                <Badge variant="outline" className="ml-2">
                                                    {data.testimonials.length} testimonials
                                                </Badge>
                                            )}
                                        </CardTitle>
                                        <CardDescription>Customer reviews and testimonials</CardDescription>
                                    </div>
                                    {expandedSections.testimonials ? <ChevronUp /> : <ChevronDown />}
                                </div>
                            </CardHeader>
                            <CollapsibleContent>
                                <CardContent className="space-y-4 pt-6">
                                    {data.testimonials.map((t, i) => (
                                        <div key={i} className="grid gap-4 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">Testimonial #{i + 1}</h4>
                                                <Button variant="ghost" size="sm" onClick={() => handleRemoveItem('testimonials', i)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                <div className="grid gap-2">
                                                    <Label>Customer Name *</Label>
                                                    <Input
                                                        placeholder="John Doe"
                                                        value={t.name}
                                                        onChange={(e) => handleListChange('testimonials', i, 'name', e.target.value)}
                                                    />
                                                    {getNestedError(`testimonials.${i}.name`) && (
                                                        <p className="text-sm text-red-500">{getNestedError(`testimonials.${i}.name`)}</p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2 md:col-span-2">
                                                    <Label>Testimonial Quote *</Label>
                                                    <Textarea
                                                        placeholder="What the customer said..."
                                                        value={t.quote}
                                                        onChange={(e) => handleListChange('testimonials', i, 'quote', e.target.value)}
                                                        rows={3}
                                                    />
                                                    {getNestedError(`testimonials.${i}.quote`) && (
                                                        <p className="text-sm text-red-500">{getNestedError(`testimonials.${i}.quote`)}</p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2 md:col-span-3">
                                                    <Label>Avatar URL</Label>
                                                    <Input
                                                        placeholder="https://example.com/avatar.jpg"
                                                        type="url"
                                                        value={t.avatar}
                                                        onChange={(e) => handleListChange('testimonials', i, 'avatar', e.target.value)}
                                                    />
                                                    {getNestedError(`testimonials.${i}.avatar`) && (
                                                        <p className="text-sm text-red-500">{getNestedError(`testimonials.${i}.avatar`)}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setData('testimonials', [...data.testimonials, { name: '', quote: '', avatar: '' }])}
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                                    </Button>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>
                </TabsContent>

                {/* About Section */}
                <TabsContent value="about" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                About Section
                                {data.about.title && (
                                    <Badge variant="outline" className="ml-2">
                                        Configured
                                    </Badge>
                                )}
                            </CardTitle>
                            <CardDescription>Information about your company or service</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid gap-2">
                                <Label>About Title</Label>
                                <Input
                                    placeholder="About Our Company"
                                    value={data.about.title}
                                    onChange={(e) => setData('about', { ...data.about, title: e.target.value })}
                                />
                            </div>

                            <Label className="mb-2.5 h-fit">Description</Label>
                            <div className="grid-col grid grid-cols-7">
                                <Textarea
                                    placeholder="Tell your story and what makes you unique..."
                                    value={data.about.description}
                                    onChange={(e) => setData('about', { ...data.about, description: e.target.value })}
                                    rows={4}
                                    className="col-span-4 h-full"
                                />
                                <img className="col-span-3 h-full object-cover px-2" src={`/storage/${data.about.image}`} />
                            </div>

                            <ImageUpload
                                name="about_image"
                                label="About Section Image"
                                // description="Recommended: 600x400px, shows your team or product"
                                value={data?.about?.image}
                                onChange={(file) => setData('about', { ...data.about, image: file })}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seo" className="mt-6 space-y-6">
                    {/* SEO Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Settings</CardTitle>
                            <CardDescription>Optimize your page for search engines</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="meta_title">Meta Title *</Label>
                                <Input
                                    id="meta_title"
                                    placeholder="Your Brand - Main Offering"
                                    value={data.seo.title}
                                    onChange={(e) => setData('seo', { ...data.seo, title: e.target.value })}
                                />
                                <p className="text-sm text-muted-foreground">{(data.seo.title || '').length}/60 characters</p>
                                {errors['seo.title'] && <p className="text-sm text-red-500">{errors['seo.title']}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="meta_description">Meta Description *</Label>
                                <Textarea
                                    id="meta_description"
                                    placeholder="Describe what your page is about in 150-160 characters..."
                                    value={data.seo.description}
                                    onChange={(e) => setData('seo', { ...data.seo, description: e.target.value })}
                                    rows={3}
                                />
                                <p className="text-sm text-muted-foreground">{(data.seo.description || '').length}/160 characters</p>
                                {errors['seo.description'] && <p className="text-sm text-red-500">{errors['seo.description']}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label>Meta Keywords</Label>
                                <div className="mb-2 flex flex-wrap gap-2">
                                    {(data.seo.keywords || []).map((keyword, idx) => (
                                        <Badge key={idx} variant="secondary" className="gap-1">
                                            {keyword}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = data.seo.keywords.filter((_, i) => i !== idx);
                                                    setData('seo', { ...data.seo, keywords: updated });
                                                }}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                    {(data.seo.keywords || '').length === 0 && (
                                        <span className="text-sm text-muted-foreground">No keywords added yet</span>
                                    )}
                                </div>
                                <Input
                                    placeholder="Type a keyword and press Enter to add"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                            e.preventDefault();
                                            setData('seo', {
                                                ...data.seo,
                                                keywords: [...data.seo.keywords, e.currentTarget.value.trim()],
                                            });
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                                <p className="text-sm text-muted-foreground">Add relevant keywords separated by commas (max 10 recommended)</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="sticky bottom-6 rounded-lg border bg-background p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{processing ? 'Saving changes...' : 'Ready to save your changes'}</div>
                    <Button type="submit" size="lg" disabled={processing}>
                        {processing ? 'Saving...' : 'Save All Changes'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
