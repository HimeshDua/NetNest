<?php

namespace Database\Factories;

use App\Models\CustomerTransaction;
use App\Models\CustomerSubscription;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerTransactionFactory extends Factory
{
    protected $model = CustomerTransaction::class;

    public function definition(): array
    {
        return [
            'customer_subscription_id' => CustomerSubscription::factory(),
            'amount' => $this->faker->randomFloat(2, 10, 200),
            'currency' => 'USD',
            'payment_date' => now()->subDays(rand(1, 30)),
            'payment_method' => $this->faker->randomElement(['credit_card', 'paypal', 'bank_transfer']),
            'transaction_reference' => strtoupper($this->faker->bothify('TXN####??')),
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed', 'refunded']),
        ];
    }
}
