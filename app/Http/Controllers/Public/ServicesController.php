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
        $services = VendorService::orderBy('created_at', 'desc')->paginate(6);
        return Inertia::render('Public/Services', compact('services'));
    }
    public function show($slug)
    {
        $vendor = VendorService::where('slug', $slug)->firstOrFail();
        return  Inertia::render('Public/DetailedVendorServices', compact('vendor'));
    }
}
