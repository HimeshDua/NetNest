<?php

namespace Database\Seeders;

use App\Models\Cms;
use Illuminate\Database\Seeder;

class CMSSeeder extends Seeder
{
  public function run(): void
  {
    Cms::factory()->create();
  }
}
