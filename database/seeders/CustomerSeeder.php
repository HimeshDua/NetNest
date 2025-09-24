<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CustomerRequest;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
  public function run(): void
  {
    User::factory()->count(100)->customer()->create();
    CustomerRequest::factory()->count(40)->create();
  }
}
