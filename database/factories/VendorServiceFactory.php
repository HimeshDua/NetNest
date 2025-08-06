<?php

namespace Database\Factories;

use App\Models\VendorService;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VendorServiceFactory extends Factory
{
    protected $model = VendorService::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->words(3, true);
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'vendor_name' => $this->faker->company,
            'logo' => 'logos/' . $this->faker->image('public/storage/logos', 100, 100, null, false),
            'location' => $this->faker->city,
            'connection_type' => $this->faker->randomElement(['fiber', 'dsl', 'wireless']),
            'price' => $this->faker->randomFloat(2, 1000, 5000),
            'billing_cycle' => $this->faker->randomElement(['Monthly', 'Quarterly', 'Yearly']),
            'posted_date' => now(),
            'highlight' => $this->faker->randomElement(['new', 'trending', 'reliable', 'popular', 'undefined']),
            'short_description' => $this->faker->sentence(),
            'full_description' => $this->faker->paragraph(4),
            'features' => $this->faker->randomElements([
                'Unlimited Data',
                'Free Router',
                '24/7 Support',
                'Free Installation',
                'No FUP'
            ], rand(2, 5)),
            'faqs' => [
                ['question' => 'Is it unlimited?', 'answer' => 'Yes, it is.'],
                ['question' => 'Can I upgrade?', 'answer' => 'Yes, any time.'],
            ],
            'images' => [
                'services/sample1.jpg',
                'services/sample2.jpg',
            ],
        ];
    }
}
