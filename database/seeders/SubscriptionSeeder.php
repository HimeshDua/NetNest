<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CustomerSubscription;
use App\Models\CustomerTransaction;
use App\Models\User;
use App\Models\VendorService;
use Illuminate\Support\Str;

class SubscriptionSeeder extends Seeder
{
  public function run(): void
  {
    $customers    = User::where('role', 'customer')->get();
    $allServices  = VendorService::all();

    foreach ($customers as $customer) {
      // 70% chance to subscribe
      if (rand(1, 100) <= 80) {
        $service = $allServices->random();

        $package = collect(['Basic', 'Standard', 'Premium'])->random();
        $billingCycle = collect(['Monthly', 'Quarterly', 'Yearly'])->random();
        $priceMap = [
          'Basic'    => 10,
          'Standard' => 25,
          'Premium'  => 50,
        ];

        $nextBillingDate = match ($billingCycle) {
          'Quarterly' => now()->addMonths(3),
          'Yearly'    => now()->addYear(),
          default     => now()->addMonth(),
        };

        // Create subscription
        $subscription = CustomerSubscription::create([
          'user_id'           => $customer->id,
          'vendor_service_id' => $service->id,
          'package_name'      => $package,
          'status'            => 'active',
          'subscribed_at'     => now(),
          'next_billing_date' => $nextBillingDate,
        ]);

        // Always create initial transaction
        CustomerTransaction::create([
          'customer_subscription_id' => $subscription->id,
          'amount'       => $priceMap[$package],
          'currency'     => 'USD',
          'payment_date' => now(),
          'payment_method' => collect(['card', 'paypal', 'bank'])->random(),
          'transaction_reference' => strtoupper(Str::random(12)),
          'status'       => 'completed',
          'meta'         => ['note' => 'Initial subscription purchase'],
        ]);

        // Optional: create extra renewal payments
        if (rand(1, 100) <= 30) {
          CustomerTransaction::factory()->count(rand(1, 3))->create([
            'customer_subscription_id' => $subscription->id,
            'status' => 'completed',
          ]);
        }
      }
    }
  }
}
