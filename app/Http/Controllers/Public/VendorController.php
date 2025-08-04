<?php

namespace App\Http\Controllers\Public;

use App\Models\Vendor;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController
{
    public function index()
    {
        $vendors = VendorService::orderBy('created_at', 'desc')->paginate(1);
        return Inertia::render('Public/Vendors', compact('vendors'));
    }
}
