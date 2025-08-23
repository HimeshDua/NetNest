<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('cms', function (Blueprint $table) {
            $table->id();

            // Each section stored as JSON for flexibility
            $table->json('hero')->nullable();
            // Example: { "title": "Welcome", "subtitle": "Fastest Internet", "background": "hero.jpg", "cta_text": "Get Started", "cta_link": "/signup" }

            $table->json('marquees')->nullable();
            // Example: [{ "text": "50% off first month", "link": "/pricing" }]

            $table->json('features_primary')->nullable();
            // Example: [{ "title": "Fast Internet", "description": "Blazing fast speed", "icon": "wifi" }]

            $table->json('features_secondary')->nullable();
            // Example: [{ "title": "24/7 Support", "description": "Always available", "icon": "headset" }]

            $table->json('about')->nullable();
            // Example: { "title": "About Us", "description": "We provide reliable...", "image": "about.jpg" }

            $table->json('testimonials')->nullable();
            // Example: [{ "name": "John Doe", "quote": "Amazing service!", "avatar": "john.jpg" }]

            $table->json('seo')->nullable();
            // Example: { "title": "ISP Company", "description": "Fastest internet in town", "keywords": ["internet", "wifi", "broadband"] }

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('c_m_s');
    }
};
