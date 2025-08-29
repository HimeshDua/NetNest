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
        Schema::create('card_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('card_last_four');
            $table->string('card_brand');
            // $table->string('card_number');
            // $table->string('card_holder');
            $table->string('expiry_month');
            $table->string('expiry_year');
            $table->string('gateway_customer_id');
            $table->string('gateway_payment_method_id');
            // $table->string('cvv'); // hashed or encrypted
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('card_details');
    }
};
