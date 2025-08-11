<?php

namespace App\Http\Controllers\Public;

use App\Models\Vendor;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicesController
{
    public function index(Request $request)
    {
        $services = VendorService::query()
            ->when($request->city, fn($q) => $q->where('city', $request->city))
            ->when($request->min_price, fn($q) => $q->where('price', '>=', $request->min_price))
            ->when($request->max_price, fn($q) => $q->where('price', '<=', $request->max_price))
            ->when($request->unlimited, fn($q) => $q->where('data_cap', 'unlimited'))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Public/Services', [
            'services' => $services,
            'filters' => $request->only(['city', 'min_price', 'max_price', 'unlimited'])
        ]);
    }
    public function show($slug)
    {
        $vendor = VendorService::where('slug', $slug)->firstOrFail();
        return  Inertia::render('Public/DetailedVendorServices', compact('vendor'));
    }
}
