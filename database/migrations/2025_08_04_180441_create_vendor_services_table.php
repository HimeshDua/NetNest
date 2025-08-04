<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('vendor_services', function (Blueprint $table) {
            $table->id();
           // Foreign key to users table
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('title');                             // Name of the service
            $table->string('slug')->unique();                    // SEO-friendly URL
            $table->string('vendor_name');                       // Public vendor name
            $table->string('logo')->nullable();                  // Logo image path
            $table->string('location');                          // City/Area
            $table->enum('connection_type', ['fiber', 'dsl', 'wireless'])->default('fiber');
            $table->decimal('price', 10, 2);                     // Price in decimal
            $table->string('billing_cycle')->default('Monthly'); // Monthly, Quarterly, etc.
            $table->date('posted_date')->nullable();
            $table->text('short_description');                   // Brief overview
            $table->longText('full_description');                // Full detailed text
            $table->enum('highlight', ['new', 'trending', 'reliable', 'popular', 'undefined'])->nullable();
            $table->json('features')->nullable();                // Feature list
            $table->json('faqs')->nullable();                    // Optional: FAQ section
            $table->json('images')->nullable();                  // Optional: multiple image paths
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendor_services');
    }
};
