<?php

namespace App\Http\Controllers\Customer;

use App\Models\CustomerSubscription;
use App\Models\VendorService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupportController
{
    public function index()
    {
        $user = Auth::user();

        // Get all services the user has subscribed to, with vendor info eager-loaded
        $vendorServices = VendorService::with('vendor')
            ->whereIn('id', CustomerSubscription::where('user_id', $user->id)->pluck('vendor_service_id'))
            ->get();

        // Transform for frontend (only send what’s needed)
        $threads = $vendorServices->map(function ($service) {
            return [
                'id' => $service->id,
                'service_name' => $service->name,
                'vendor' => [
                    'id' => $service->vendor->id,
                    'name' => $service->vendor->name,
                    'avatar' => $service->vendor->avatar ?? null,
                ],
            ];
        });

        return Inertia::render('Customer/Support', [
            'supportThreads' => $threads,
        ]);
    }
}
