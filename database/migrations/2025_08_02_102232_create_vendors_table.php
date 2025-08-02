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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('vendorName');
            $table->string('vendorLogo');
            $table->string('location');
            $table->enum('connectionType', ['fiber', 'dsl', 'wireless'])->default('fiber');
            $table->string('price');
            $table->string('postedDate');
            $table->text('description');
            $table->enum('highlight', ['new', 'trending', 'reliable', 'popular', 'undefined']);
            $table->json('features')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
