<?php
// database/factories/CustomerRequestFactory.php

namespace Database\Factories;

use App\Models\CustomerRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerRequestFactory extends Factory
{
  protected $model = CustomerRequest::class;

  protected static array $pakistanCoords = [
    ['city' => 'Karachi', 'lat' => 24.8607, 'lng' => 67.0011],
    ['city' => 'Lahore', 'lat' => 31.5546, 'lng' => 74.3572],
    ['city' => 'Islamabad', 'lat' => 33.6844, 'lng' => 73.0479],
    ['city' => 'Peshawar', 'lat' => 34.0151, 'lng' => 71.5249],
    ['city' => 'Quetta', 'lat' => 30.1798, 'lng' => 66.9750],
  ];

  public function definition()
  {
    $loc = $this->faker->randomElement(self::$pakistanCoords);
    $lat = $loc['lat'] + $this->faker->randomFloat(6, -0.02, 0.02);
    $lng = $loc['lng'] + $this->faker->randomFloat(6, -0.02, 0.02);

    return [
      'user_id' => User::factory()->customer(),
      'email' => $this->faker->safeEmail,
      'role' => 'customer',
      'phone' => $this->faker->phoneNumber,
      'location' => $loc['city'] . ', ' . $this->faker->streetName,
      'latitude' => $lat,
      'longitude' => $lng,
      'description' => $this->faker->sentence(12),
    ];
  }
}
