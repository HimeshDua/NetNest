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
    'latitude',
    'longitude',
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
    'speed_details',    // JSON Object { download, upload, latency, data_cap }
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

  public function subscribers()
  {
    return $this->hasManyThrough(
      User::class,
      CustomerSubscription::class,
      'vendor_service_id', // Foreign key on CustomerSubscription table
      'id',                // Foreign key on User table
      'id',                // Local key on VendorService table
      'user_id'           // Local key on CustomerSubscription table
    );
  }

  public function subscribersCount(): int
  {
    return $this->hasManyThrough(
      User::class,
      CustomerSubscription::class,
      'vendor_service_id',
      'id',
      'id',
      'user_id'
    )->count();
  }

  public function activeSubscriptions()
  {
    return $this->hasMany(CustomerSubscription::class, 'vendor_service_id')->where('status', 'active');
  }

  public function transactions()
  {
    return $this->hasManyThrough(
      CustomerTransaction::class,
      CustomerSubscription::class,
      'vendor_service_id', // Foreign key on CustomerSubscription table
      'customer_subscription_id', // Foreign key on CustomerTransaction table
      'id',                // Local key on VendorService table
      'id'                 // Local key on CustomerSubscription table
    );
  }


  /*
    |--------------------------------------------------------------------------
    | Model Events
    |--------------------------------------------------------------------------
    */

  public function scopeNearby($query, $lat, $lng, $radiusKm = 20)
  {
    if (!is_numeric($lat) || !is_numeric($lng)) {
      return $query;
    }

    // Haversine formula (distance in km)
    $haversine = "(6371 * acos(
        cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?))
        + sin(radians(?)) * sin(radians(latitude))
    ))";

    // selectRaw will add distance_km; using bindings to avoid injection
    return $query->selectRaw("vendor_services.*, {$haversine} as distance_km", [$lat, $lng, $lat])
      ->whereNotNull('latitude')
      ->whereNotNull('longitude')
      ->having('distance_km', '<=', $radiusKm)
      ->orderBy('distance_km', 'asc');
  }


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
