<?php

namespace Database\Factories;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
  protected $model = Conversation::class;

  public function definition()
  {

    $vendor = User::factory()->vendor()->create();
    $customer = User::factory()->customer()->create();

    return [
      'customer_id' => $customer->id,
      'vendor_id' => $vendor->id,
    ];
  }
}
