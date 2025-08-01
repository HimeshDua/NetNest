'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Check, ChevronDown, Filter, X } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

// Modified base slider component to show end circle
interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    showEndCircle?: boolean;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(({ className, showEndCircle = false, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn('relative flex w-full touch-none items-center select-none', className)} {...props}>
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
        {showEndCircle && (
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
        )}
    </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
// End Modified base slider component to show end circle

interface HorizontalFiltersProps {
    className?: string;
    onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
    categories: string[];
    priceRange: [number, number];
    brands: string[];
    colors: string[];
    sizes: string[];
    sortBy: string;
}

export default function HorizontalFilters({ className, onFilterChange }: HorizontalFiltersProps) {
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        priceRange: [0, 500],
        brands: [],
        colors: [],
        sizes: [],
        sortBy: 'featured',
    });

    const [activeFiltersCount, setActiveFiltersCount] = useState(0);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const updateFilters = (newFilters: Partial<FilterState>) => {
        const updated = { ...filters, ...newFilters };
        setFilters(updated);

        // Count active filters
        let count = 0;
        if (updated.categories.length) count += updated.categories.length;
        if (updated.brands.length) count += updated.brands.length;
        if (updated.colors.length) count += updated.colors.length;
        if (updated.sizes.length) count += updated.sizes.length;
        if (updated.priceRange[0] > 0 || updated.priceRange[1] < 500) count += 1;

        setActiveFiltersCount(count);
        onFilterChange?.(updated);
    };

    const toggleFilter = (type: keyof FilterState, value: string) => {
        if (type === 'sortBy') {
            updateFilters({ [type]: value } as Partial<FilterState>);
            return;
        }

        const currentValues = filters[type] as string[];
        const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];

        updateFilters({ [type]: newValues } as Partial<FilterState>);
    };

    const clearFilters = () => {
        setFilters({
            categories: [],
            priceRange: [0, 500],
            brands: [],
            colors: [],
            sizes: [],
            sortBy: 'featured',
        });
        setActiveFiltersCount(0);
        onFilterChange?.({
            categories: [],
            priceRange: [0, 500],
            brands: [],
            colors: [],
            sizes: [],
            sortBy: 'featured',
        });
    };

    const categories = ['Clothing', 'Shoes', 'Accessories', 'Sportswear', 'Outerwear'];

    const brands = ['Nike', 'Adidas', 'Puma', 'Under Armour', 'New Balance'];

    const colors = [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Red', value: '#FF0000' },
        { name: 'Blue', value: '#0000FF' },
        { name: 'Green', value: '#00FF00' },
        { name: 'Yellow', value: '#FFFF00' },
    ];

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const sortOptions = [
        { label: 'Featured', value: 'featured' },
        { label: 'Price: Low to High', value: 'price-asc' },
        { label: 'Price: High to Low', value: 'price-desc' },
        { label: 'Newest', value: 'newest' },
        { label: 'Best Selling', value: 'best-selling' },
    ];

    const ActiveFilterBadges = () => {
        const activeFilters = [
            ...filters.categories.map((cat) => ({ type: 'categories', value: cat })),
            ...filters.brands.map((brand) => ({ type: 'brands', value: brand })),
            ...filters.colors.map((color) => ({ type: 'colors', value: color })),
            ...filters.sizes.map((size) => ({ type: 'sizes', value: size })),
            ...(filters.priceRange[0] > 0 || filters.priceRange[1] < 500
                ? [
                      {
                          type: 'price',
                          value: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
                      },
                  ]
                : []),
        ];

        if (activeFilters.length === 0) return null;

        return (
            <div className="mt-3 flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                    <Badge key={`${filter.type}-${filter.value}-${index}`} variant="outline" className="flex items-center gap-1 px-2 py-1">
                        {filter.value}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 h-4 w-4 p-0"
                            onClick={() => toggleFilter(filter.type as keyof FilterState, filter.value)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </Badge>
                ))}
                {activeFilters.length > 0 && (
                    <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearFilters}>
                        Clear all
                    </Button>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Height set for example purpose only */}
            <div className={cn('w-full p-6', className)}>
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Category Filter */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    Category
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-3">
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <div key={category} className="flex items-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={cn(
                                                    'w-full justify-start font-normal',
                                                    filters.categories.includes(category) && 'font-medium',
                                                )}
                                                onClick={() => toggleFilter('categories', category)}
                                            >
                                                <div className="flex w-full items-center justify-between">
                                                    {category}
                                                    {filters.categories.includes(category) && <Check className="h-4 w-4" />}
                                                </div>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Brand Filter */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    Brand
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-3">
                                <div className="space-y-2">
                                    {brands.map((brand) => (
                                        <div key={brand} className="flex items-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={cn('w-full justify-start font-normal', filters.brands.includes(brand) && 'font-medium')}
                                                onClick={() => toggleFilter('brands', brand)}
                                            >
                                                <div className="flex w-full items-center justify-between">
                                                    {brand}
                                                    {filters.brands.includes(brand) && <Check className="h-4 w-4" />}
                                                </div>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Price Range Filter */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    Price
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Price Range</h4>
                                    <Slider
                                        value={filters.priceRange}
                                        min={0}
                                        max={500}
                                        step={10}
                                        onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                                        showEndCircle
                                    />
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">${filters.priceRange[0]}</span>
                                        <span className="text-sm text-muted-foreground">${filters.priceRange[1]}</span>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Size Filter */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    Size
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-3">
                                <div className="grid grid-cols-3 gap-2">
                                    {sizes.map((size) => (
                                        <Button
                                            key={size}
                                            variant={filters.sizes.includes(size) ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => toggleFilter('sizes', size)}
                                            className="h-8"
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Color Filter */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    Color
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-3">
                                <div className="grid grid-cols-4 gap-2">
                                    {colors.map((color) => (
                                        <div key={color.name} className="flex flex-col items-center gap-1">
                                            <button
                                                className={cn(
                                                    'flex h-8 w-8 items-center justify-center rounded-full border border-input',
                                                    filters.colors.includes(color.name) && 'ring-2 ring-primary',
                                                )}
                                                style={{ backgroundColor: color.value }}
                                                onClick={() => toggleFilter('colors', color.name)}
                                            >
                                                {filters.colors.includes(color.name) && (
                                                    <Check
                                                        className={cn(
                                                            'h-4 w-4',
                                                            ['White', 'Yellow'].includes(color.name) ? 'text-black' : 'text-white',
                                                        )}
                                                    />
                                                )}
                                            </button>
                                            <span className="text-xs">{color.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Mobile All Filters Button */}
                        <Button variant="outline" size="sm" className="h-8 sm:hidden" onClick={() => setShowMobileFilters(true)}>
                            <Filter className="mr-1 h-3 w-3" />
                            All Filters
                            {activeFiltersCount > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </Button>
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="flex items-center gap-2">
                        <span className="hidden text-sm text-muted-foreground sm:inline">Sort by:</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    {sortOptions.find((opt) => opt.value === filters.sortBy)?.label || 'Featured'}
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {sortOptions.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        className={cn(filters.sortBy === option.value && 'font-medium')}
                                        onClick={() => toggleFilter('sortBy', option.value)}
                                    >
                                        {option.label}
                                        {filters.sortBy === option.value && <Check className="ml-2 h-4 w-4" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Active Filter Badges */}
                <ActiveFilterBadges />

                {/* Mobile Filters Overlay */}
                {showMobileFilters && (
                    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background p-6 shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Filters</h2>
                                <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <ScrollArea className="h-[calc(100vh-8rem)]">
                                <div className="space-y-6 pr-4">
                                    {/* Categories */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium">Categories</h3>
                                        <div className="space-y-2">
                                            {categories.map((category) => (
                                                <Button
                                                    key={category}
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn(
                                                        'w-full justify-start font-normal',
                                                        filters.categories.includes(category) && 'font-medium',
                                                    )}
                                                    onClick={() => toggleFilter('categories', category)}
                                                >
                                                    <div className="flex w-full items-center justify-between">
                                                        {category}
                                                        {filters.categories.includes(category) && <Check className="h-4 w-4" />}
                                                    </div>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Brands */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium">Brands</h3>
                                        <div className="space-y-2">
                                            {brands.map((brand) => (
                                                <Button
                                                    key={brand}
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn(
                                                        'w-full justify-start font-normal',
                                                        filters.brands.includes(brand) && 'font-medium',
                                                    )}
                                                    onClick={() => toggleFilter('brands', brand)}
                                                >
                                                    <div className="flex w-full items-center justify-between">
                                                        {brand}
                                                        {filters.brands.includes(brand) && <Check className="h-4 w-4" />}
                                                    </div>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Price Range */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium">Price Range</h3>
                                        <div className="space-y-4">
                                            <Slider
                                                value={filters.priceRange}
                                                min={0}
                                                max={500}
                                                step={10}
                                                onValueChange={(value) =>
                                                    updateFilters({
                                                        priceRange: value as [number, number],
                                                    })
                                                }
                                            />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">${filters.priceRange[0]}</span>
                                                <span className="text-sm text-muted-foreground">${filters.priceRange[1]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Sizes */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium">Sizes</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {sizes.map((size) => (
                                                <Button
                                                    key={size}
                                                    variant={filters.sizes.includes(size) ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => toggleFilter('sizes', size)}
                                                    className="h-8"
                                                >
                                                    {size}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Colors */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium">Colors</h3>
                                        <div className="grid grid-cols-4 gap-2">
                                            {colors.map((color) => (
                                                <div key={color.name} className="flex flex-col items-center gap-1">
                                                    <button
                                                        className={cn(
                                                            'flex h-8 w-8 items-center justify-center rounded-full border border-input',
                                                            filters.colors.includes(color.name) && 'ring-2 ring-primary',
                                                        )}
                                                        style={{ backgroundColor: color.value }}
                                                        onClick={() => toggleFilter('colors', color.name)}
                                                    >
                                                        {filters.colors.includes(color.name) && (
                                                            <Check
                                                                className={cn(
                                                                    'h-4 w-4',
                                                                    ['White', 'Yellow'].includes(color.name) ? 'text-black' : 'text-white',
                                                                )}
                                                            />
                                                        )}
                                                    </button>
                                                    <span className="text-xs">{color.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>

                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear all
                                </Button>
                                <Button onClick={() => setShowMobileFilters(false)}>Apply filters</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
