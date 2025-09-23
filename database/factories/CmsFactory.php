<?php

namespace Database\Factories;

use App\Models\Cms;
use Illuminate\Database\Eloquent\Factories\Factory;

class CmsFactory extends Factory
{
  protected $model = Cms::class;

  public function definition(): array
  {
    return [
      'hero' => [
        'title' => 'Build and Scale Your Internet Service with NetNest',
        'subtitle' => 'NetNest helps ISPs streamline customer onboarding, manage internet plans, handle billing, and resolve support requests — all from one intuitive and efficient platform.',
        'buttons' => [
          [
            'text' => 'Get Started',
            'href' => '/register',
            'variant' => 'default',
          ],
          [
            'text' => 'Github',
            'href' => 'https://github.com/HimeshDua/NetNest',
            'variant' => 'outline',
          ],
        ],
        'mockup' => [
          'srcLight' => '/app-light.png',
          'srcDark' => '/app-dark.png',
          'alt' => 'NetNest Dashboard Mockup',
        ],
      ],

      'marquee_text' => 'Fast • Reliable • Affordable — NetNest Internet',
      'marquee_link' => '/plans',

      'features_primary' => [
        ['title' => 'Blazing Speeds', 'description' => 'Up to 1Gbps for seamless streaming and gaming.'],
        ['title' => '24/7 Support', 'description' => 'Our team is always available to help.'],
        ['title' => 'Affordable Plans', 'description' => 'Flexible pricing for every household.'],
      ],

      'features_secondary' => [
        ['title' => 'Secure Network', 'description' => 'Advanced security keeps your data safe.'],
        ['title' => 'Nationwide Coverage', 'description' => 'Expanding across Pakistan rapidly.'],
      ],

      'about' => [
        'content' => 'NetNest is redefining internet in Pakistan with high-speed connectivity, unmatched reliability, and customer-first service. Our mission is to connect every home and business to the digital future.',
        'image' => '/images/about/netnest-team.jpg',
      ],

      'testimonials' => [
        [
          'name' => 'Ali Raza',
          'text' => 'NetNest has been a game-changer for my remote work — fast and reliable!',
          'avatar' => '/images/testimonials/ali.jpg',
        ],
        [
          'name' => 'Sara Khan',
          'text' => 'Streaming is smooth, no more buffering. Highly recommended!',
          'avatar' => '/images/testimonials/sara.jpg',
        ],
      ],

      'seo' => [
        'title' => 'NetNest - High Speed Internet in Pakistan',
        'description' => 'Discover NetNest Internet: lightning-fast speeds, reliable service, and affordable plans for everyone in Pakistan.',
        'keywords' => ['internet', 'NetNest', 'wifi', 'broadband', 'Pakistan ISP'],
      ],
    ];
  }
}
