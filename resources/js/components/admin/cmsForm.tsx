import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Cms, CmsYes } from '@/types/cms';
import { useForm } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Eye, EyeOff, HelpCircle, Plus, Save, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { ImageUpload } from '../image-upload';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';

export default function CmsForm({ cms }: { cms: Cms }) {
    const { data,  setData, post, processing, errors } = useForm<CmsYes>({
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
        marquee_text: cms?.marquee_text || '',
        marquee_link: cms?.marquee_link || '',
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
        testimonials: false,
        seo: false,
    });

    const [previewMode, setPreviewMode] = useState(false);

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    type ArrayKeys = 'features_primary' | 'features_secondary' | 'testimonials';

    const handleListChange = <K extends ArrayKeys>(listName: K, index: number, key: keyof CmsYes[K][number], value: string) => {
        const updatedList = [...(data[listName] as CmsYes[K])];
        (updatedList[index] as any)[key] = value;
        setData(listName, updatedList as any);
    };

    const handleRemoveItem = <K extends ArrayKeys>(listName: K, index: number) => {
        const updatedList = [...(data[listName] as CmsYes[K])];
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
        <div className="relative">
            {/* Preview Mode Toggle */}
            <div className="fixed top-6 right-6 z-10 flex items-center gap-2 rounded-lg bg-background p-3 shadow-md">
                <Switch id="preview-mode" checked={previewMode} onCheckedChange={setPreviewMode} />
                <Label htmlFor="preview-mode" className="flex cursor-pointer items-center gap-2">
                    {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {previewMode ? 'Preview Mode' : 'Edit Mode'}
                </Label>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">CMS Configuration</h1>
                        <p className="text-muted-foreground">Manage your website content and layout</p>
                    </div>
                    <Button type="submit" className="gap-2" disabled={processing}>
                        <Save className="h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>

                <Tabs defaultValue="content" className="w-full">
                    <TabsList className="mb-6 grid w-full grid-cols-2 lg:grid-cols-4">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="mt-6 space-y-6">
                        {/* Hero Section */}
                        <Collapsible
                            open={expandedSections.hero}
                            onOpenChange={() => toggleSection('hero')}
                            className="rounded-lg border bg-gradient-to-br from-background to-muted/20"
                        >
                            <Card className="border-none shadow-md">
                                <CollapsibleTrigger asChild>
                                    <CardHeader className="cursor-pointer transition-colors hover:bg-muted/30">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    Homepage Hero
                                                    {data.hero?.title && (
                                                        <Badge variant="secondary" className="ml-2">
                                                            Configured
                                                        </Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>Main banner section of your homepage</CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {expandedSections.hero ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                            </div>
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <CardContent className="grid gap-6 py-6">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="grid space-y-4">
                                                <div className="grid gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Label htmlFor="hero_title">Hero Title</Label>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Main headline that grabs attention</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                    <Input
                                                        id="hero_title"
                                                        value={data.hero?.title || ''}
                                                        onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })}
                                                        placeholder="Welcome to our website"
                                                        className={errors['hero.title'] ? 'border-destructive' : ''}
                                                    />
                                                    {errors['hero.title'] && <p className="text-sm text-destructive">{errors['hero.title']}</p>}
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label htmlFor="hero_subtitle">Subtitle</Label>
                                                    <Textarea
                                                        id="hero_subtitle"
                                                        value={data.hero?.subtitle || ''}
                                                        onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })}
                                                        placeholder="A brief description of your offering"
                                                        className={errors['hero.subtitle'] ? 'border-destructive' : ''}
                                                    />
                                                    {errors['hero.subtitle'] && <p className="text-sm text-destructive">{errors['hero.subtitle']}</p>}
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label>Hero Buttons</Label>
                                                    <div className="space-y-3">
                                                        {data.hero?.buttons?.map((btn, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 rounded-lg border bg-card p-3">
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
                                                                    value={btn.variant || 'default'}
                                                                    onValueChange={(value) => {
                                                                        const buttons = [...data.hero.buttons];
                                                                        buttons[idx].variant = value;
                                                                        setData('hero', { ...data.hero, buttons });
                                                                    }}
                                                                >
                                                                    <SelectTrigger className="w-[130px]">
                                                                        <SelectValue placeholder="Variant" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Button Style</SelectLabel>
                                                                            <SelectItem value="default">Default</SelectItem>
                                                                            <SelectItem value="outline">Outline</SelectItem>
                                                                            <SelectItem value="secondary">Secondary</SelectItem>
                                                                            <SelectItem value="destructive">Destructive</SelectItem>
                                                                            <SelectItem value="ghost">Ghost</SelectItem>
                                                                            <SelectItem value="link">Link</SelectItem>
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>

                                                                <Button
                                                                    type="button"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    onClick={() => {
                                                                        const buttons = data.hero.buttons.filter((_, i) => i !== idx);
                                                                        setData('hero', { ...data.hero, buttons });
                                                                    }}
                                                                    className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}

                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="outline"
                                                            className="gap-1"
                                                            onClick={() =>
                                                                setData('hero', {
                                                                    ...data.hero,
                                                                    buttons: [
                                                                        ...(data.hero.buttons || []),
                                                                        { text: '', href: '', variant: 'default' },
                                                                    ],
                                                                })
                                                            }
                                                        >
                                                            <Plus className="h-4 w-4" /> Add Button
                                                        </Button>
                                                    </div>
                                                    {errors['hero.buttons'] && <p className="text-sm text-destructive">{errors['hero.buttons']}</p>}
                                                </div>
                                            </div>

                                            <div className="grid gap-4">
                                                <div className="rounded-lg border bg-muted/20 p-4">
                                                    <h4 className="mb-3 flex items-center gap-2 font-medium">
                                                        <Upload className="h-4 w-4" /> Mockup Images
                                                    </h4>
                                                    <div className="space-y-4">
                                                        <ImageUpload
                                                            name="hero_mockup_light"
                                                            label="Light Mode Version"
                                                            // description="Displayed in light theme"
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
                                                            label="Dark Mode Version"
                                                            // description="Displayed in dark theme"
                                                            value={data.hero?.mockup?.srcDark}
                                                            onChange={(file) =>
                                                                setData('hero', {
                                                                    ...data.hero,
                                                                    mockup: { ...(data.hero.mockup || {}), srcDark: file },
                                                                })
                                                            }
                                                        />

                                                        <div className="grid gap-2">
                                                            <Label htmlFor="hero_mockup_alt">Alt Text</Label>
                                                            <Input
                                                                id="hero_mockup_alt"
                                                                value={data.hero?.mockup?.alt || ''}
                                                                onChange={(e) =>
                                                                    setData('hero', {
                                                                        ...data.hero,
                                                                        mockup: { ...(data.hero.mockup || {}), alt: e.target.value },
                                                                    })
                                                                }
                                                                placeholder="Description for screen readers"
                                                                className={errors['hero.mockup.alt'] ? 'border-destructive' : ''}
                                                            />
                                                            {errors['hero.mockup.alt'] && (
                                                                <p className="text-sm text-destructive">{errors['hero.mockup.alt']}</p>
                                                            )}
                                                        </div>
                                                    </div>
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
                                <CollapsibleTrigger asChild>
                                    <CardHeader className="cursor-pointer transition-colors hover:bg-muted/30">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    Marquee Announcement
                                                    {data.marquee_text && (
                                                        <Badge variant="secondary" className="ml-2">
                                                            Configured
                                                        </Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>Scrolling announcement at the top of your site</CardDescription>
                                            </div>
                                            {expandedSections.marquees ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <CardContent className="space-y-4 pt-6">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label>Text</Label>
                                                <Input
                                                    placeholder="Special announcement text"
                                                    value={data.marquee_text}
                                                    onChange={(e) => setData('marquee_text', e.target.value)}
                                                    className={getNestedError(`marquee_text`) ? 'border-destructive' : ''}
                                                />
                                                {getNestedError(`marquees.text`) && (
                                                    <p className="text-sm text-destructive">{getNestedError(`marquees.text`)}</p>
                                                )}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Link URL</Label>
                                                <Input
                                                    placeholder="https://example.com"
                                                    type="url"
                                                    value={data.marquee_link}
                                                    onChange={(e) => setData('marquee_link', e.target.value)}
                                                    className={getNestedError(`marquee_link`) ? 'border-destructive' : ''}
                                                />
                                                {getNestedError(`marquees.link`) && (
                                                    <p className="text-sm text-destructive">{getNestedError(`marquees.link`)}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>
                    </TabsContent>

                    <TabsContent value="features" className="mt-6 space-y-6">
                        {/* Features Section */}
                        <Collapsible open={expandedSections.features} onOpenChange={() => toggleSection('features')} className="rounded-lg border">
                            <Card>
                                <CollapsibleTrigger asChild>
                                    <CardHeader className="cursor-pointer transition-colors hover:bg-muted/30">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    Primary Features
                                                    {data.features_primary.length > 0 && (
                                                        <Badge variant="secondary" className="ml-2">
                                                            {data.features_primary.length} features
                                                        </Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>Key features to highlight on your homepage</CardDescription>
                                            </div>
                                            {expandedSections.features ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <CardContent className="space-y-4 pt-6">
                                        {data.features_primary.map((f, i) => (
                                            <div key={i} className="grid gap-4 rounded-lg border bg-card p-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-medium">Feature #{i + 1}</h4>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem('features_primary', i)}
                                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                    <div className="grid gap-2">
                                                        <Label>Title</Label>
                                                        <Input
                                                            placeholder="Feature title"
                                                            value={f.title}
                                                            onChange={(e) => handleListChange('features_primary', i, 'title', e.target.value)}
                                                            className={getNestedError(`features_primary.${i}.title`) ? 'border-destructive' : ''}
                                                        />
                                                        {getNestedError(`features_primary.${i}.title`) && (
                                                            <p className="text-sm text-destructive">
                                                                {getNestedError(`features_primary.${i}.title`)}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="grid gap-2 md:col-span-2">
                                                        <Label>Description</Label>
                                                        <Textarea
                                                            placeholder="Brief description of the feature"
                                                            value={f.description}
                                                            onChange={(e) => handleListChange('features_primary', i, 'description', e.target.value)}
                                                            className={
                                                                getNestedError(`features_primary.${i}.description`) ? 'border-destructive' : ''
                                                            }
                                                        />
                                                        {getNestedError(`features_primary.${i}.description`) && (
                                                            <p className="text-sm text-destructive">
                                                                {getNestedError(`features_primary.${i}.description`)}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label className="flex items-center gap-1">
                                                            Icon Name
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
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
                                                            className={getNestedError(`features_primary.${i}.icon`) ? 'border-destructive' : ''}
                                                        />
                                                        {getNestedError(`features_primary.${i}.icon`) && (
                                                            <p className="text-sm text-destructive">{getNestedError(`features_primary.${i}.icon`)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full gap-1"
                                            onClick={() =>
                                                setData('features_primary', [...data.features_primary, { title: '', description: '', icon: '' }])
                                            }
                                        >
                                            <Plus className="h-4 w-4" /> Add Feature
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
                                <CollapsibleTrigger asChild>
                                    <CardHeader className="cursor-pointer transition-colors hover:bg-muted/30">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    Testimonials
                                                    {data.testimonials.length > 0 && (
                                                        <Badge variant="secondary" className="ml-2">
                                                            {data.testimonials.length} testimonials
                                                        </Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>Customer reviews and testimonials</CardDescription>
                                            </div>
                                            {expandedSections.testimonials ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <CardContent className="space-y-4 pt-6">
                                        {data.testimonials.map((t, i) => (
                                            <div key={i} className="grid gap-4 rounded-lg border bg-card p-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-medium">Testimonial #{i + 1}</h4>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem('testimonials', i)}
                                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                    <div className="grid gap-2">
                                                        <Label>Customer Name</Label>
                                                        <Input
                                                            placeholder="John Doe"
                                                            value={t.name}
                                                            onChange={(e) => handleListChange('testimonials', i, 'name', e.target.value)}
                                                            className={getNestedError(`testimonials.${i}.name`) ? 'border-destructive' : ''}
                                                        />
                                                        {getNestedError(`testimonials.${i}.name`) && (
                                                            <p className="text-sm text-destructive">{getNestedError(`testimonials.${i}.name`)}</p>
                                                        )}
                                                    </div>
                                                    <div className="grid gap-2 md:col-span-2">
                                                        <Label>Testimonial Quote</Label>
                                                        <Textarea
                                                            placeholder="What the customer said..."
                                                            value={t.quote}
                                                            onChange={(e) => handleListChange('testimonials', i, 'quote', e.target.value)}
                                                            rows={3}
                                                            className={getNestedError(`testimonials.${i}.quote`) ? 'border-destructive' : ''}
                                                        />
                                                        {getNestedError(`testimonials.${i}.quote`) && (
                                                            <p className="text-sm text-destructive">{getNestedError(`testimonials.${i}.quote`)}</p>
                                                        )}
                                                    </div>
                                                    <div className="grid gap-2 md:col-span-3">
                                                        <Label>Avatar URL</Label>
                                                        <Input
                                                            placeholder="https://example.com/avatar.jpg"
                                                            type="url"
                                                            value={t.avatar}
                                                            onChange={(e) => handleListChange('testimonials', i, 'avatar', e.target.value)}
                                                            className={getNestedError(`testimonials.${i}.avatar`) ? 'border-destructive' : ''}
                                                        />
                                                        {getNestedError(`testimonials.${i}.avatar`) && (
                                                            <p className="text-sm text-destructive">{getNestedError(`testimonials.${i}.avatar`)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full gap-1"
                                            onClick={() => setData('testimonials', [...data.testimonials, { name: '', quote: '', avatar: '' }])}
                                        >
                                            <Plus className="h-4 w-4" /> Add Testimonial
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
                                        <Badge variant="secondary" className="ml-2">
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

                                <div className="grid gap-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        placeholder="Tell your story and what makes you unique..."
                                        value={data.about.description}
                                        onChange={(e) => setData('about', { ...data.about, description: e.target.value })}
                                        rows={6}
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <ImageUpload
                                        name="about_image"
                                        label="About Section Image"
                                        // description="Recommended: 600x400px, shows your team or product"
                                        value={data?.about?.image}
                                        onChange={(file) => setData('about', { ...data.about, image: file })}
                                    />

                                    {/* {data.about.image && (
                                        <div className="flex flex-col gap-2">
                                            <Label>Image Preview</Label>
                                            <div className="flex h-48 items-center justify-center overflow-hidden rounded-md border p-2">
                                                <img
                                                    src={data.about.image.startsWith('http') ? data.about.image : `/storage/${data.about.image}`}
                                                    alt="About section preview"
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    )} */}
                                </div>
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
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        placeholder="Your Brand - Main Offering"
                                        value={data.seo.title}
                                        onChange={(e) => setData('seo', { ...data.seo, title: e.target.value })}
                                        className={errors['seo.title'] ? 'border-destructive' : ''}
                                    />
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">Recommended: 50-60 characters</p>
                                        <span
                                            className={`text-xs ${(data.seo.title || '').length > 60 ? 'text-destructive' : 'text-muted-foreground'}`}
                                        >
                                            {(data.seo.title || '').length}/60
                                        </span>
                                    </div>
                                    {errors['seo.title'] && <p className="text-sm text-destructive">{errors['seo.title']}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        placeholder="Describe what your page is about in 150-160 characters..."
                                        value={data.seo.description}
                                        onChange={(e) => setData('seo', { ...data.seo, description: e.target.value })}
                                        rows={3}
                                        className={errors['seo.description'] ? 'border-destructive' : ''}
                                    />
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">Recommended: 150-160 characters</p>
                                        <span
                                            className={`text-xs ${(data.seo.description || '').length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}
                                        >
                                            {(data.seo.description || '').length}/160
                                        </span>
                                    </div>
                                    {errors['seo.description'] && <p className="text-sm text-destructive">{errors['seo.description']}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label>Meta Keywords</Label>
                                    <div className="mb-2 flex flex-wrap gap-2">
                                        {(data.seo.keywords || []).map((keyword, idx) => (
                                            <Badge key={idx} variant="secondary" className="gap-1 py-1">
                                                {keyword}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = data.seo.keywords.filter((_, i) => i !== idx);
                                                        setData('seo', { ...data.seo, keywords: updated });
                                                    }}
                                                    className="ml-1 rounded-full hover:text-destructive"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                        {(data.seo.keywords || []).length === 0 && (
                                            <span className="text-sm text-muted-foreground">No keywords added yet</span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a keyword and press Enter"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                                    e.preventDefault();
                                                    setData('seo', {
                                                        ...data.seo,
                                                        keywords: [...(data.seo.keywords || []), e.currentTarget.value.trim()],
                                                    });
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                const input = document.querySelector(
                                                    'input[placeholder="Add a keyword and press Enter"]',
                                                ) as HTMLInputElement;
                                                if (input && input.value.trim()) {
                                                    setData('seo', {
                                                        ...data.seo,
                                                        keywords: [...(data.seo.keywords || []), input.value.trim()],
                                                    });
                                                    input.value = '';
                                                }
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Add relevant keywords (5-10 recommended)</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="sticky bottom-6 rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            {processing ? 'Saving changes...' : 'All changes are saved locally until you submit'}
                        </div>
                        <Button type="submit" size="lg" disabled={processing}>
                            {processing ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save All Changes
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
