<?php

namespace App\Http\Controllers\Public;

use App\Models\CustomerSubscription;
use App\Models\Vendor;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServicesController
{
    public function index()
    {
        $userId = Auth::user()->id;
        $subscribedServiceIds = CustomerSubscription::where('user_id', $userId)
            ->pluck('vendor_service_id');
        // dd($subscribedServiceIds);

        $services = VendorService::query()
            ->whereNotIn('id', $subscribedServiceIds)
            ->orderBy('posted_date', 'desc')
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('Public/Services', [
            'services' => $services,
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
