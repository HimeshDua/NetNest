<?php

namespace Database\Seeders;

use App\Models\CustomerSubscription;
use App\Models\User;
use App\Models\Vendor_Service;
use App\Models\VendorService;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory(5)->create(['role' => 'vendor'])->each(function ($vendor) {
            VendorService::factory()->create(['user_id' => $vendor->id]);
        });

        // Create 10 customers with subscriptions
        User::factory(10)->create(['role' => 'customer'])->each(function ($customer) {
            $service = VendorService::inRandomOrder()->first();
            CustomerSubscription::factory()->create([
                'user_id' => $customer->id,
                'vendor_service_id' => $service->id,
            ]);
        });
    }
}
