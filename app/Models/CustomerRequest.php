<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerRequest extends Model
{
    use HasFactory;

    protected $table = 'customer_requests';

    protected $fillable = [
        'user_id',
        'email',
        'role'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
