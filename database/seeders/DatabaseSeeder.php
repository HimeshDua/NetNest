<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vendor_Service;
use App\Models\VendorService;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        VendorService::factory()->count(120)->create();
    }
}
