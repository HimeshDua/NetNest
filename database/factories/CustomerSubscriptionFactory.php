<?php
// database/factories/CustomerSubscriptionFactory.php

namespace Database\Factories;

use App\Models\CustomerSubscription;
use App\Models\VendorService;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerSubscriptionFactory extends Factory
{
  protected $model = CustomerSubscription::class;

  public function definition()
  {
    $service = VendorService::inRandomOrder()->first() ?? VendorService::factory()->create();
    $package = $this->faker->randomElement(['Basic', 'Standard', 'Premium']);

    $status = $this->faker->randomElement(['active', 'cancelled', 'trial', 'paused']);

    return [
      'user_id' => User::factory()->customer(),
      'vendor_service_id' => $service->id,
      'subscribed_at' => now()->subDays($this->faker->numberBetween(0, 120)),
      'package_name' => $package,
      'next_billing_date' => now()->addMonth(),
      'status' => $status,
    ];
  }
}
