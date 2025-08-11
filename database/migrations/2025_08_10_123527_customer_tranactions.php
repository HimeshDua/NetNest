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
        Schema::create('customer_transactions', function (Blueprint $table) {
            $table->id();

            // Links payment to a subscription
            $table->foreignId('customer_subscription_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD'); // optional

            $table->dateTime('payment_date');
            $table->string('payment_method')->nullable(); // e.g., 'credit_card', 'paypal'
            $table->string('transaction_reference')->nullable(); // from payment gateway

            $table->enum('status', ['pending', 'completed', 'failed', 'refunded'])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_transactions');
    }
};
