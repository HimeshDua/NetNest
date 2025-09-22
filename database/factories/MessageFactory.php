<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
  protected $model = Message::class;

  public function definition()
  {
    $conversation = Conversation::inRandomOrder()->first() ?? Conversation::factory()->create();

    $authorId = $this->faker->randomElement([$conversation->customer_id, $conversation->vendor_id]);

    return [
      'conversation_id' => $conversation->id,
      'user_id' => $authorId,
      'body' => $this->faker->sentences(rand(2, 12), true),
    ];
  }
}
