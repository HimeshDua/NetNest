<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
  public function definition(): array
  {
    $roles = ['customer', 'vendor', 'admin'];

    return [
      'name' => $this->faker->name(),
      'email' => $this->faker->unique()->safeEmail(),
      'password' => Hash::make('password'),
      'role' => $this->faker->randomElement($roles),
      'email_verified_at' => now(),
      'remember_token' => Str::random(10),
    ];
  }

  public function admin()
  {
    return $this->state(function (array $attributes) {
      return [
        'role' => 'admin',
        'name' => 'Admin ' . $this->faker->firstName(),
      ];
    });
  }

  public function vendor()
  {
    return $this->state(function (array $attributes) {
      return [
        'role' => 'vendor',
        'name' => $this->faker->company() . ' Provider',
        'phone' => $this->generatePakistaniPhoneNumber(),
      ];
    });
  }

  public function customer()
  {
    return $this->state(function (array $attributes) {
      return [
        'role' => 'customer',
      ];
    });
  }

  public function unverified(): static
  {
    return $this->state(function (array $attributes) {
      return [
        'email_verified_at' => null,
      ];
    });
  }
  private function generatePakistaniPhoneNumber(): string
  {
    $operatorCode = $this->faker->randomElement([
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9'
    ]);
    $number = '03' . $operatorCode . $this->faker->randomNumber(8, true);
    return $number;
  }
}
