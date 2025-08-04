<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class VendorService extends Model
{
    /** @use HasFactory<\Database\Factories\VendorServiceFactory> */
    use HasFactory;


    protected $table = 'vendor_services';

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'vendor_name',
        'logo',
        'location',
        'connection_type',
        'price',
        'billing_cycle',
        'posted_date',
        'short_description',
        'full_description',
        'highlight',
        'features',
        'faqs',
        'images',
    ];

    protected $casts = [
        'features' => 'array',
        'faqs' => 'array',
        'images' => 'array',
        'posted_date' => 'date',
        'price' => 'decimal:2',
    ];

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // Optional: auto-create slug from title (if you're not using Sluggable)
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->title) . '-' . uniqid();
            }
        });
    }
}
