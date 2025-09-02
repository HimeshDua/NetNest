<?php

namespace App\Http\Controllers\Customer;

use App\Models\CustomerSubscription;
use App\Models\CustomerTransaction;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_service_id' => ['required', 'exists:vendor_services,id'],
            'package_name'      => ['required', 'in:Basic,Standard,Premium'],
            'payment_method'    => ['required', 'string'],
        ]);

        $user = Auth::user();
        $vendorService = VendorService::findOrFail($validated['vendor_service_id']);

        // Ensure packages are cast to array
        $packages = collect($vendorService->packages ?? []);
        $package  = $packages->firstWhere('name', $validated['package_name']);

        if (!$package) {
            return back()->withErrors(['package_name' => 'Selected package is not available for this service.']);
        }

        // Compute next billing date properly
        $nextBillingDate = match ($package['billing_cycle']) {
            'Quarterly' => now()->addMonths(3),
            'Yearly'    => now()->addYear(),
            default     => now()->addMonth(),
        };

        // Create subscription
        $subscription = CustomerSubscription::create([
            'user_id'           => $user->id,
            'vendor_service_id' => $vendorService->id,
            'package_name'      => $package['name'],
            'status'            => 'active',
            'subscribed_at'     => now(),
            'next_billing_date' => $nextBillingDate,
        ]);

        // Create initial transaction
        CustomerTransaction::create([
            'customer_subscription_id' => $subscription->id,
            'amount'       => $package['price'],
            'currency'     => $package['currency'],
            'payment_date' => now(),
            'payment_method' => $validated['payment_method'],
            'transaction_reference' => strtoupper(Str::random(10)),
            'status'       => 'completed',
            'meta'         => ['note' => 'Initial subscription purchase'],
        ]);

        return back()->with('success', "Successfully subscribed to {$vendorService->title} ({$package['name']})");
    }
}
