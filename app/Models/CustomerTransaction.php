<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_subscription_id',
        'amount',
        'currency',
        'payment_date',
        'payment_method',
        'transaction_reference',
        'status',
    ];

    protected $casts = [
        'payment_date' => 'datetime',
        'amount' => 'decimal:2',
    ];

    // Relationships
    public function subscription()
    {
        return $this->belongsTo(CustomerSubscription::class, 'customer_subscription_id');
    }
}


