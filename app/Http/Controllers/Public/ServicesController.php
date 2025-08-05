<?php

namespace App\Http\Controllers\Public;

use App\Models\Vendor;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicesController
{
    public function index()
    {
        $vendors = VendorService::orderBy('created_at', 'desc')->paginate(1);
        return Inertia::render('Public/Vendors', compact('vendors'));
    }
    public function show($slug)
    {
        $vendor = VendorService::where('slug', $slug)->firstOrFail();
        return  Inertia::render('Public/DetailedVendorServices', compact('vendor'));
    }
}
