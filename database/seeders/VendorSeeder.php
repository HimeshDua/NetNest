<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\VendorService;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
  public function run(): void
  {
    $vendors = User::factory()->count(50)->vendor()->create();

    foreach ($vendors as $vendor) {
      VendorService::factory(1)->create(['user_id' => $vendor->id]);
    }
  }
}
