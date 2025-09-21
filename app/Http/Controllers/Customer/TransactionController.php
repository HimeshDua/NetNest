<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\CustomerTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\VendorService;
use App\Models\CustomerSubscription;
use Illuminate\Support\Str;


class TransactionController extends Controller
{
  public function store(Request $request)
  {
    $validated = $request->validate([
      'vendor_service_id' => ['required', 'exists:vendor_services,id'],
      'package_name'      => ['required', 'in:Basic,Standard,Premium'],
      'payment_method'    => ['required', 'string'],
    ]);

    $user = Auth::user();
    $role = $user->role;
    $vendorService = VendorService::findOrFail($validated['vendor_service_id']);

    $packages = collect($vendorService->packages ?? []);
    $package  = $packages->firstWhere('name', $validated['package_name']);

    if (!$package) {
      return back()->with('error', 'Selected package is not available for this service.');
    }

    if ($role == 'admin' || $role == 'vendor') {
      return back()->with('error', 'You are not Authorized to subscribe to this service');
    }

    $hasSubcribed = CustomerSubscription::where('user_id', $user->id)
      ->where('vendor_service_id', $validated['vendor_service_id'])
      ->exists();

    if ($hasSubcribed) {
      return back()->with('info', 'You have already subscribed to this service');
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
