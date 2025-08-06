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
        $title = fake()->company . ' Internet Service';
        return [
            'user_id' => User::factory()->create(['role' => 'vendor'])->id,
            'title' => $title,
            'slug' => Str::slug($title),
            'vendor_name' => fake()->company(),
            'logo' => null,
            'location' => fake()->city(),
            'connection_type' => fake()->randomElement(['fiber', 'dsl', 'wireless']),
            'price' => fake()->randomFloat(2, 500, 5000),
            'billing_cycle' => fake()->randomElement(['Monthly', 'Quarterly', 'Yearly']),
            'posted_date' => now(),
            'highlight' => fake()->randomElement(['new', 'trending', 'reliable', 'popular', 'undefined']),
            'short_description' => fake()->text(150),
            'full_description' => fake()->paragraph(10),
            'features' => fake()->randomElements([
                'Unlimited Data',
                'Free Router',
                '24/7 Support',
                'No Installation Fee',
                'Low Latency',
                'High Speed',
                'Flexible Plan',
                'Parental Control'
            ], rand(3, 6)),
            'faqs' => [
                ['question' => 'How do I upgrade?', 'answer' => 'Contact our support team.'],
                ['question' => 'What is the refund policy?', 'answer' => 'Refunds are given under certain conditions.']
            ],
            'images' => [],
        ];
    }
}
