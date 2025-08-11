<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\VendorService;
use App\Models\CustomerSubscription;
use App\Models\CustomerTransaction;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create vendors with services
        User::factory(5)
            ->create(['role' => 'vendor'])
            ->each(function ($vendor) {
                VendorService::factory()->create(['user_id' => $vendor->id]);
            });

        // Create customers with subscriptions and transactions
        User::factory(10)
            ->create(['role' => 'customer'])
            ->each(function ($customer) {
                $service = VendorService::inRandomOrder()->first();

                // Create a subscription for this customer
                $subscription = CustomerSubscription::factory()->create([
                    'user_id' => $customer->id,
                    'vendor_service_id' => $service->id,
                ]);

                // Attach 3 transactions to the subscription
                CustomerTransaction::factory(3)->create([
                    'customer_subscription_id' => $subscription->id,
                ]);
            });
    }
}
