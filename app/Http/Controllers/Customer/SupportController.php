<?php

namespace App\Http\Controllers\Customer;

use App\Models\CustomerSubscription;
use App\Models\VendorService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Conversation;

class SupportController
{

  public function index()
  {
    $user = Auth::user();

    $vendorServices = VendorService::with('vendor')
      ->whereIn('id', CustomerSubscription::where('user_id', $user->id)->pluck('vendor_service_id'))
      ->latest()->get();

    $threads = $vendorServices->map(function ($service) use ($user) {
      // Ensure conversation exists between this customer & vendor
      $conversation = Conversation::firstOrCreate([
        'vendor_id'   => $service->vendor->id,
        'customer_id' => $user->id,
      ]);

      return [
        'id' => $conversation->id, // ✅ use conversation id
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
