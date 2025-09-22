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
      if (rand(0, 1)) {
        CustomerTransaction::factory()->create([
          'customer_subscription_id' => $sub->id,
          'status' => 'completed',
        ]);
      }
    }
  }
}
