<?php
namespace Database\Factories;

use App\Models\VendorService;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VendorServiceFactory extends Factory
{
    protected $model = VendorService::class;

    public function definition()
    {
        $title = $this->faker->company . ' Internet Package';
        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'vendor_name' => $this->faker->company,
            'logo' => $this->faker->imageUrl(200, 100, 'business', true, 'logo'),
            'location' => $this->faker->city,
            'connection_type' => $this->faker->randomElement(['fiber', 'dsl', 'wireless']),
            'price' => $this->faker->randomFloat(2, 20, 100),
            'billing_cycle' => $this->faker->randomElement(['Monthly', 'Quarterly', 'Yearly']),
            'posted_date' => $this->faker->date(),
            'short_description' => $this->faker->sentence(10),
            'full_description' => $this->faker->paragraph(4),
            'highlight' => $this->faker->randomElement(['new', 'trending', 'reliable', 'popular', 'undefined']),
            'features' => json_encode([
                'Unlimited data',
                '24/7 support',
                'Free router',
                'High-speed connection'
            ]),
            'faqs' => json_encode([
                ['question' => 'Is installation free?', 'answer' => 'Yes, installation is free.'],
                ['question' => 'How long is the contract?', 'answer' => 'No contract required.']
            ]),
            'images' => json_encode([
                $this->faker->imageUrl(640, 480, 'tech'),
                $this->faker->imageUrl(640, 480, 'tech')
            ]),
        ];
    }
}
