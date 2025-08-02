<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vendor extends Model
{
    use HasFactory;

    protected $table = 'vendors';

    protected $fillable = [
        'title',
        'vendorName',
        'vendorLogo',
        'location',
        'connectionType',
        'price',
        'postedDate',
        'description',
        'highlight',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
    ];
}
