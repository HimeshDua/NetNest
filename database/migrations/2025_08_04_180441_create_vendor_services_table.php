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

            // One-to-one: each user has one vendor service
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('location');
            $table->string('city');

            $table->enum('connection_type', ['fiber', 'dsl', 'wireless'])->default('fiber');
            $table->enum('highlight', ['new', 'trending', 'reliable', 'popular', 'undefined'])->nullable();

            $table->text('short_description');
            $table->longText('full_description');

            // JSON columns reflecting structured frontend types
            $table->json('packages');          // array of VendorServicePackage[]
            $table->date('posted_date')->nullable();
            $table->json('features')->nullable();    // array of string
            $table->json('faqs')->nullable();        // array of { question, answer }
            $table->json('images')->nullable();      // array of image paths
            $table->json('speed_details')->nullable(); // array of string (or convert to structured JSON later)
            $table->string('coverage_area');
            $table->boolean('is_active')->default(true);

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
