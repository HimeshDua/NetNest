<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
  use HasFactory, Notifiable;

  protected $fillable = [
    'id',
    'name',
    'email',
    'password',
    'phone',
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

  // Vendor has one service
  public function vendorService()
  {
    return $this->hasOne(VendorService::class);
  }

  public function transactions()
  {
    return $this->hasManyThrough(
      CustomerTransaction::class,
      CustomerSubscription::class,
      'user_id',                   // Foreign key on CustomerSubscription table...
      'customer_subscription_id',  // Foreign key on CustomerTransaction table...
      'id',                        // Local key on User table...
      'id'                         // Local key on CustomerSubscription table...
    );
  }

  public function subscriptions()
  {
    return $this->hasMany(CustomerSubscription::class, 'user_id');
  }


  public function customerRequest()
  {
    return $this->hasOne(customerRequest::class, 'user_id');
  }

  // === Role Helpers ===

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

  public function isSubscribed()
  {
    return $this->hasOne(CustomerSubscription::class, 'user_id')->exists();
  }

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
}
