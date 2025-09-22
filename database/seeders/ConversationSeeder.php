<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;

class ConversationSeeder extends Seeder
{
  public function run(): void
  {
    $customers = User::where('role', 'customer')->take(20)->get();
    $vendors = User::where('role', 'vendor')->get();

    foreach ($customers as $customer) {
      $vendor = $vendors->random();
      $conv = Conversation::create([
        'customer_id' => $customer->id,
        'vendor_id' => $vendor->id,
      ]);

      Message::factory()->count(rand(1, 4))->create([
        'conversation_id' => $conv->id,
        'user_id'         => $customer->id,
      ]);
    }
  }
}
