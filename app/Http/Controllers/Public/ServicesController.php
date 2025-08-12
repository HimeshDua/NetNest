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
        // Extract filters from query
        $filters = $request->only([
            'search',
            'city',
            'connection_type',
            'min_price',
        ]);

        // Start query
        $query = VendorService::query();

        // ... (other filters remain the same) ...

        // City filter
        if (!empty($filters['city'])) {
            $query->where('city', $filters['city']);
        }

        // Connection type filter
        if (!empty($filters['connection_type'])) {
            $query->where('connection_type', $filters['connection_type']);
        }

        // Min Price filter from a select dropdown
        if (!empty($filters['min_price'])) {
            $minPrice = (float) $filters['min_price'];
            $query->where(function ($q) use ($minPrice) {
                $q->whereRaw('EXISTS (
            SELECT 1
            FROM JSON_TABLE(
                vendor_services.packages,
                "$[*]" COLUMNS (
                    price FLOAT PATH "$.price"
                )
            ) AS packages_table
            WHERE packages_table.price >= ?
        )', [$minPrice]);
            });
        }

        // Get filtered services
        $services = $query
            ->orderBy('posted_date', 'desc')
            ->paginate(6)
            ->withQueryString();

        // Get unique dropdown options
        $cities = VendorService::select('city')->distinct()->pluck('city')->filter()->values();
        $connectionTypes = VendorService::select('connection_type')->distinct()->pluck('connection_type')->filter()->values();

        // Return Inertia page
        return Inertia::render('Public/Services', [
            'services' => $services,
            'filters' => $filters,
            'cities' => $cities,
            'connectionTypes' => $connectionTypes,
        ]);
    }

    public function show($slug)
    {
        $vendor = VendorService::where('slug', $slug)->firstOrFail();

        return Inertia::render('Public/DetailedVendorServices', [
            'vendor' => $vendor
        ]);
    }
}
