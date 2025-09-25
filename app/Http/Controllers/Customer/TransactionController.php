<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\CustomerTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\VendorService;
use App\Models\CustomerSubscription;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;



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

    if (in_array($user->role, ['admin', 'vendor'])) {
      return back()->with('error', 'You are not authorized to subscribe.');
    }

    $vendorService = VendorService::findOrFail($validated['vendor_service_id']);
    $packages      = collect($vendorService->packages ?? []);
    $package       = $packages->firstWhere('name', $validated['package_name']);

    if (!$package) {
      return back()->with('error', 'Selected package is not available.');
    }

    return DB::transaction(function () use ($user, $vendorService, $package, $validated) {
      // Ensure no duplicate subscription
      $existing = CustomerSubscription::where('user_id', $user->id)
        ->where('vendor_service_id', $vendorService->id)
        ->lockForUpdate()
        ->first();

      if ($existing) {
        return back()->with('info', 'You have already subscribed.');
      }

      // Billing cycle handling
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
        'amount'       => (float) $package['price'],
        'currency'     => $package['currency'] ?? 'USD',
        'payment_date' => now(),
        'payment_method' => $validated['payment_method'],
        'transaction_reference' => strtoupper(Str::random(12)),
        'status'       => 'completed',
        'meta'         => ['note' => 'Initial subscription purchase'],
      ]);

      return back()->with('success', "Subscribed to {$vendorService->title} ({$package['name']})");
    });
  }
}
