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
        'hero',

        // Marquee
        'marquee_text',
        'marquee_link',

        // Features
        'features_primary',
        'features_secondary',

        // About Section
        'about',

        // Testimonials
        'testimonials',

        // SEO
        'seo',

    ];

    protected $casts = [
        'hero' => 'array',
        'features_primary' => 'array',
        'features_secondary' => 'array',
        'about' => 'array',
        'testimonials' => 'array',
        'seo' => 'array',
    ];
}
