<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// use App\Models\User;
// use App\Models\VendorService;
// use App\Models\CustomerSubscription;
// use App\Models\CustomerTransaction;
// use App\Models\Conversation;
// use App\Models\Message;
// use App\Models\CustomerRequest;

class DatabaseSeeder extends Seeder
{
  public function run()
  {
    $this->call([
      CmsSeeder::class,
      VendorSeeder::class,
      CustomerSeeder::class,
      SubscriptionSeeder::class,
      TransactionSeeder::class,
      ConversationSeeder::class,
    ]);
  }
}
