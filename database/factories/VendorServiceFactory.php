<?php

namespace Database\Factories;

use App\Models\VendorService;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VendorServiceFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->company . ' Internet Service';

        $globalFeatures = [
            'Unlimited Data',
            'Free Router',
            '24/7 Support',
            'No Installation Fee',
            'Low Latency',
            'High Speed',
            'Flexible Plan',
            'Parental Control',
            'Static IP',
            'Free Installation'
        ];

        $speedLabels = ['10 Mbps', '20 Mbps', '50 Mbps', '100 Mbps', '200 Mbps'];

        $packageNames = ['Basic', 'Standard', 'Premium'];
        $numPackages = rand(1, 3);

        $packages = [];
        for ($i = 0; $i < $numPackages; $i++) {
            $packages[] = [
                'name' => $packageNames[$i],
                'price' => fake()->randomFloat(2, 300, 6000),
                'billing_cycle' => fake()->randomElement(['Monthly', 'Quarterly', 'Yearly']),
                'speed_label' => fake()->randomElement($speedLabels),
                'features' => fake()->randomElements($globalFeatures, rand(2, 5)),
                'description' => fake()->sentence(rand(12, 19)),
                'is_popular' => $i === 1 ? true : fake()->boolean(20), // mark Standard popular if exists
            ];
        }

        return [
            'user_id' => User::factory()->create(['role' => 'vendor'])->id,
            'title' => $title,
            'slug' => Str::slug($title) . '-' . fake()->unique()->numberBetween(1, 9999),
            'location' => fake()->city(),
            'city' => fake()->randomElement(['Karachi', 'Lahore', 'Islamabad', 'Thathe', 'Hydrabad', 'Multan', 'Bhawalpur', 'Rawalpindi']),
            'connection_type' => fake()->randomElement(['fiber', 'dsl', 'wireless']),
            'highlight' => fake()->randomElement(['new', 'trending', 'reliable', 'popular', 'undefined']),
            'short_description' => fake()->text(150),
            'full_description' => fake()->paragraph(10),
            'packages' => $packages,               // <-- IMPORTANT: structured packages array
            'features' => fake()->randomElements($globalFeatures, rand(3, 6)),
            'faqs' => [
                ['question' => 'How do I upgrade?', 'answer' => 'Contact our support team.'],
                ['question' => 'What is the refund policy?', 'answer' => 'Refunds are given under certain conditions.'],
            ],
            'images' => [
                'services/wow.jpg',
                'services/wow2.png',
            ],
            'speed_details' => fake()->randomElements([
                '10 Mbps Download',
                '2 Mbps Upload',
                'Low Ping',
                'Burst up to 50 Mbps',
                'Consistent Speed'
            ], rand(1, 3)),
            'coverage_area' => fake()->city() . ', ' . fake()->state(),
            'is_active' => true,
        ];
    }
}
