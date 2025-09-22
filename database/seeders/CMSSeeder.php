<?php

namespace Database\Seeders;

use App\Models\Cms;
use Illuminate\Database\Seeder;

class CMSSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Cms::factory()->create();
  }
}
