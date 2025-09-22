<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cms extends Model
{
  use HasFactory;

  protected $table = 'cms';

  protected $fillable = [
    'hero',

    'marquee_text',
    'marquee_link',

    'features_primary',
    'features_secondary',

    'about',

    'testimonials',

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
