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
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('title');
            $table->string('slug')->unique();
            $table->string('vendor_name');
            $table->string('logo')->nullable();
            $table->string('location');

            $table->enum('connection_type', ['fiber', 'dsl', 'wireless'])->default('fiber');
            $table->decimal('price', 10, 2);
            $table->enum('billing_cycle', ['Monthly', 'Quarterly', 'Yearly'])->default('Monthly');

            $table->date('posted_date')->nullable();
            $table->enum('highlight', ['new', 'trending', 'reliable', 'popular', 'undefined'])->nullable();

            $table->text('short_description');
            $table->longText('full_description');

            $table->json('features')->nullable();
            $table->json('faqs')->nullable();
            $table->json('images')->nullable();

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
