<?php

namespace App\Http\Controllers\Customer;

use App\Models\CustomerSubscription;
use App\Models\VendorService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionController
{
    public function index()
    {
        $userId = Auth::user()->id;

        $subsByService = CustomerSubscription::query()
            ->where('user_id', $userId)
            ->get(['vendor_service_id', 'package_name', 'status'])
            ->groupBy('vendor_service_id')
            ->map(fn($group) => $group->map(fn($sub) => [
                'package_name' => $sub->package_name,
                'status'       => $sub->status,
            ])->values())->toArray();

        $serviceIds = array_keys($subsByService);

        $customerServices = VendorService::whereIn('id', $serviceIds)->get();

        // dd($subsByService);
        // dd($customerServices);
        // dd($subPackageNames);
        return Inertia::render('Customer/Subscription', [
            'customerServices' => $customerServices,
            'subsByService' => $subsByService
        ]);
    }
}
