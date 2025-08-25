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
            $table->json('hero')->nullable();

            $table->string('marquee_text')->nullable();
            $table->string('marquee_link')->nullable();

            $table->json('features_primary')->nullable();
            $table->json('features_secondary')->nullable();
            $table->json('about')->nullable();
            $table->json('testimonials')->nullable();
            $table->json('seo')->nullable();
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('cms');
    }
};
