<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerSubscription extends Model
{
    use HasFactory;


    // Customer Hbilling histo
    protected $fillable = [
        'user_id',
        'vendor_service_id',
        'subscribed_at',
        'next_billing_date',
        'status',
    ];

    protected $casts = [
        'subscribed_at' => 'date',
        'next_billing_date' => 'date',
    ];

    // === Relationships ===

    // The customer who subscribed
    public function customer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function vendorService()
    {
        return $this->belongsTo(VendorService::class, 'vendor_service_id');
    }

    public function transactions()
    {
        return $this->hasMany(CustomerTransaction::class, 'customer_subscription_id');
    }

    // === Scopes and Helpers ===

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // === Boot: Set billing dates dynamically ===

    protected static function booted()
    {
        static::creating(function ($subscription) {
            $subscription->subscribed_at = $subscription->subscribed_at ?? now();

            if (!$subscription->next_billing_date && $subscription->vendorService) {
                switch ($subscription->vendorService->billing_cycle) {
                    case 'Quarterly':
                        $subscription->next_billing_date = now()->addMonths(3);
                        break;
                    case 'Yearly':
                        $subscription->next_billing_date = now()->addYear();
                        break;
                    default:
                        $subscription->next_billing_date = now()->addMonth();
                        break;
                }
            }
        });
    }
}
