<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cms extends Model
{
    use HasFactory;

    protected $table = 'cms';

    protected $fillable = [
        // Hero Section
        'hero_title',
        'hero_subtitle',
        'hero_background_image',
        'hero_cta_text',
        'hero_cta_link',

        // Marquee
        'marquees',

        // Features
        'features_primary',
        'features_secondary',

        // About Section
        'about_title',
        'about_description',
        'about_image',

        // Testimonials
        'testimonials',

        // SEO
        'meta_title',
        'meta_description',
        'meta_keywords',

        // Footer
        'footer_links',
        'social_links',
    ];

    protected $casts = [
        // JSON → array automatically
        'marquees'         => 'array',
        'features_primary' => 'array',
        'features_secondary' => 'array',
        'testimonials'     => 'array',
        'meta_keywords'    => 'array',
        'footer_links'     => 'array',
        'social_links'     => 'array',
    ];
}
