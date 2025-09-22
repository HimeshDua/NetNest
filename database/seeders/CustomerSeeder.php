<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CustomerRequest;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    User::factory()->count(50)->customer()->create();
    CustomerRequest::factory()->count(15)->create();
  }
}
