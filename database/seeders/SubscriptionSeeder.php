<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CustomerSubscription;
use App\Models\User;
use App\Models\VendorService;

class SubscriptionSeeder extends Seeder
{
  public function run(): void
  {
    $customers = User::where('role', 'customer')->get();
    $allServices = VendorService::all();

    foreach ($customers as $customer) {
      if (rand(0, 1)) {
        $service = $allServices->random();
        CustomerSubscription::factory()->create([
          'user_id' => $customer->id,
          'vendor_service_id' => $service->id,
          'status' => 'active',
          'package_name' => collect(['Basic', 'Standard', 'Premium'])->random(),
        ]);
      }
    }
  }
}
