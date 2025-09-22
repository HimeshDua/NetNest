<?php
// database/factories/CustomerTransactionFactory.php

namespace Database\Factories;

use App\Models\CustomerTransaction;
use App\Models\CustomerSubscription;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerTransactionFactory extends Factory
{
  protected $model = CustomerTransaction::class;

  public function definition()
  {
    $sub = CustomerSubscription::inRandomOrder()->first() ?? CustomerSubscription::factory()->create();
    $amount = $this->faker->randomFloat(2, 500, 15000);

    return [
      'customer_subscription_id' => $sub->id,
      'amount' => $amount,
      'currency' => 'PKR',
      'payment_date' => $this->faker->dateTimeBetween('-90 days', 'now'),
      'payment_method' => $this->faker->randomElement(['card', 'bank_transfer', 'jazzcash', 'easypaisa']),
      'transaction_reference' => strtoupper(uniqid('TX_')),
      'status' => $this->faker->randomElement(['pending', 'completed', 'refunded']),
    ];
  }
}
