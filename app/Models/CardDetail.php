<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardDetail extends Model
{
    protected $fillable = [
        'user_id',
        'card_last_four',
        'card_brand',
        'expiry_month',
        'expiry_year',
        'gateway_customer_id',
        'gateway_payment_method_id',
        'is_default',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
