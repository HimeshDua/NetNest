<?php

namespace App\Http\Controllers\Customer;

use App\Models\CustomerSubscription;
use App\Models\CustomerTransaction;
use App\Models\User;
use App\Models\VendorService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BillingController
{
  public function index()
  {
    $user_id = Auth::user()->id;
    $subIds = CustomerSubscription::where('user_id', $user_id)->pluck('id');

    $transactions = CustomerTransaction::whereIn('customer_subscription_id', $subIds)->get();

    $subscriptions = CustomerSubscription::where('user_id', $user_id)
      ->with('vendorService:id,packages')
      ->get();

    $services = $subscriptions->map(function ($subscription) {
      $packages = $subscription->vendorService->packages ?? [];

      $package = collect($packages)->firstWhere('name', $subscription->package_name);
      return [
        'subscription_id' => $subscription->id,
        'package' => $package,
        'vendor_service_id' => $subscription->vendor_service_id,
      ];
    });
    // ->with('vendor:id,name')
    // dd($services);
    $customerServices = VendorService::whereIn('id', $subIds)->pluck('packages')->flatten(1);

    $billingData = ['transactions' => $transactions, 'customerServices' => $services];
    return Inertia::render('Customer/Billing', compact('billingData'));
  }
}
