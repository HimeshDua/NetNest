<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\VendorService;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $vendors = User::factory()->count(600)->vendor()->create();

    foreach ($vendors as $vendor) {
      // ensure one service per vendor using make+save so user_id is set correctly
      $svc = VendorService::factory()->make();
      $svc->user_id = $vendor->id;
      $svc->save();
    }
  }
}
