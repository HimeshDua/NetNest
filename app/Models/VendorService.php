<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VendorService extends Model
{
    use HasFactory;

    protected $table = 'vendor_services';

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'slug',
        'city',
        'location',
        'connection_type',
        'highlight',
        'short_description',
        'full_description',
        'packages',         // JSON
        'posted_date',
        'features',         // JSON
        'faqs',             // JSON
        'images',           // JSON
        'speed_details',    // JSON
        'coverage_area',
        'is_active',
    ];

    protected $casts = [
        'features'       => 'array',
        'packages'       => 'array',
        'faqs'           => 'array',
        'images'         => 'array',
        'speed_details'  => 'array',
        'posted_date'    => 'datetime',
        'is_active'      => 'boolean',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    // VendorService belongs to a User (vendor)
    public function vendor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function subscriptions()
    {
        return $this->hasMany(CustomerSubscription::class, 'vendor_service_id');
    }

    /*
    |--------------------------------------------------------------------------
    | Model Events
    |--------------------------------------------------------------------------
    */
    protected static function booted()
    {
        static::creating(function ($model) {
            // Auto-generate slug if not provided
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title) . '-' . Str::random(6);
            }

            // Set posted_date if not provided
            if (empty($model->posted_date)) {
                $model->posted_date = now();
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('title')) {
                $model->slug = Str::slug($model->title) . '-' . Str::random(6);
            }
        });
    }
}
