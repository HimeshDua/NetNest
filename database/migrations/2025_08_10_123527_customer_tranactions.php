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

            // Links transaction to a subscription
            $table->foreignId('customer_subscription_id')
                ->constrained('customer_subscriptions')
                ->cascadeOnDelete();

            // Basic transaction fields
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD'); // ISO code (USD, PKR, EUR)

            // When the payment actually happened
            $table->timestamp('payment_date')->useCurrent();

            // Payment details
            $table->string('payment_method')->nullable(); // e.g. 'credit_card', 'paypal', 'jazzcash'
            $table->string('transaction_reference')->nullable(); // Gateway reference (txn_id)

            // More robust status tracking
            $table->enum('status', [
                'pending',     // waiting for confirmation
                'processing',  // in progress (useful for async gateways)
                'completed',   // success
                'failed',      // failed transaction
                'refunded',    // user got money back
            ])->default('pending');

            // Audit fields
            $table->json('meta')->nullable(); // store gateway raw response / debug info

            $table->timestamps();

            // Performance indexing
            $table->index(['customer_subscription_id', 'status']);
            $table->index(['payment_date']);
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
