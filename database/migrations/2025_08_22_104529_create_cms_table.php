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

            // Hero Section
            $table->string('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();
            $table->string('hero_background_image')->nullable(); // store file path
            $table->string('hero_cta_text')->nullable();
            $table->string('hero_cta_link')->nullable();

            // Marquee / Announcements
            $table->json('marquees')->nullable();
            // Example: [{ "text": "50% off first month", "link": "/pricing" }, ...]

            // Features Section
            $table->json('features_primary')->nullable();
            // Example: [{ "title": "Fast Internet", "description": "Blazing fast speed", "icon": "wifi" }]

            $table->json('features_secondary')->nullable();
            // Example: [{ "name": "24/7 Support", "description": "Always available", "icon": "headset" }]

            // About / Info Section
            $table->string('about_title')->nullable();
            $table->text('about_description')->nullable();
            $table->string('about_image')->nullable();

            // Testimonials Section
            $table->json('testimonials')->nullable();
            // Example: [{ "name": "John Doe", "quote": "Amazing service!", "avatar": "path.jpg" }]

            // SEO + Meta
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('meta_keywords')->nullable();

            // Footer Links
            $table->json('footer_links')->nullable(); // [{ name, href }]
            $table->json('social_links')->nullable(); // [{ platform, url, icon }]

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
