<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CustomerSubscription;
use App\Models\CustomerTransaction;

class TransactionSeeder extends Seeder
{
  public function run(): void
  {
    foreach (CustomerSubscription::all() as $sub) {
      CustomerTransaction::factory()->create([
        'customer_subscription_id' => $sub->id,
        'status' => 'completed',
      ]);

      // 30% chance of extra payments
      if (rand(1, 100) <= 30) {
        CustomerTransaction::factory()->count(rand(1, 3))->create([
          'customer_subscription_id' => $sub->id,
          'status' => 'completed',
        ]);
      }
    }
  }
}
