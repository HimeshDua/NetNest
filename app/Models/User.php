<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // === Relationships ===

    // Vendor has many services
    public function vendorServices()
    {
        return $this->hasOne(VendorService::class);
    }

    // Customer has many subscriptions
    public function subscriptions()
    {
        return $this->hasMany(CustomerSubscription::class, 'user_id');
    }

    // Customer has many 
    public function customerRequest()
    {
        return $this->hasOne(customerRequest::class, 'user_id');
    }

    // === Role Helpers ===

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isVendor(): bool
    {
        return $this->role === 'vendor';
    }

    public function isCustomer(): bool
    {
        return $this->role === 'customer';
    }


    public function conversations()
    {
        return $this->hasMany(Conversation::class, 'customer_id')
            ->orWhere('vendor_id', $this->id);
    }

    public function conversationsAsCustomer()
    {
        return $this->hasMany(Conversation::class, 'customer_id');
    }

    public function conversationsAsVendor()
    {
        return $this->hasMany(Conversation::class, 'vendor_id');
    }
}
