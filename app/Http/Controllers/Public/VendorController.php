<?php

namespace App\Http\Controllers\Public;
namespace App\Http\Controllers\Public;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController
class VendorController
{
    public function index()
    {
        $vendors = Vendor::orderBy('created_at', 'desc')->paginate(6);
        return Inertia::render('Public/Vendors', compact('vendors'));
    }
}
