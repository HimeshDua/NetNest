<?php

// app/Models/VendorService.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VendorService extends Model
{
    use HasFactory;

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
        'highlight',
        'short_description',
        'full_description',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public static function booted()
    {
        parent::booted();

        static::creating(function ($VendorService) {
            $VendorService->slug = Str::slug($VendorService->title);
            $VendorService->posted_date = now();
        });

        static::updating(function ($VendorService) {
            $VendorService->slug =  Str::slug($VendorService->title);
        });
    }
}
