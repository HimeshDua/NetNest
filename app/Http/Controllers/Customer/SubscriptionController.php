<?php

namespace App\Http\Controllers\Customer;

use App\Models\CustomerSubscription;
use App\Models\CustomerTransaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionController
{

  public function index()
  {
    $userId = Auth::id();

    $subscriptions = CustomerSubscription::with('vendorService:id,slug,location,city,connection_type,longitude,latitude,title,packages')
      ->where('user_id', $userId)
      ->get();

    $transactions = CustomerTransaction::whereIn('customer_subscription_id', $subscriptions->pluck('id'))
      ->get();

    $services = $subscriptions->map(function ($subscription) {
      $packages = $subscription->vendorService->packages ?? [];
      $package  = collect($packages)->firstWhere('name', $subscription->package_name);

      return [
        'subscription_id'   => $subscription->id,
        'vendor_service_id' => $subscription->vendor_service_id,
        'package'           => $package,
        'status'            => $subscription->status,
      ];
    });

    $subsByService = $subscriptions->groupBy('vendor_service_id')
      ->map(fn($group) => $group->map(fn($sub) => [
        'package_name' => $sub->package_name,
        'status'       => $sub->status,
      ])->values())
      ->toArray();

    $customerServices = $subscriptions->pluck('vendorService')->unique('id')->values();

    $billingData = [
      'transactions'     => $transactions,
      'customerServices' => $customerServices,
      'subsByService'    => $subsByService,
    ];

    return Inertia::render('Customer/Subscription', [
      'billingData'      => $billingData,

    ]);
  }
}
