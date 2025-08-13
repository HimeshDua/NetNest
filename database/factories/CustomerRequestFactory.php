<?php

namespace Database\Factories;

use App\Models\CustomerRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerRequestFactory extends Factory
{
    protected $model = CustomerRequest::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory()->create(['role' => 'customer'])->id,
            'email' => fake()->unique()->safeEmail(),
            'role' => 'customer'
        ];
    }
}
