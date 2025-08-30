<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_transactions', function (Blueprint $table) {
            $table->id();

            // Links to domain subscription
            $table->foreignId('customer_subscription_id')
                ->constrained('customer_subscriptions')
                ->cascadeOnDelete();

            // Optional direct link to Cashier’s invoice/charge for traceability
            $table->string('cashier_invoice_id')->nullable();  // Stripe invoice id
            $table->string('cashier_payment_intent_id')->nullable(); // Stripe PI id

            // Monetary values
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');

            // Transaction details
            $table->timestamp('payment_date')->useCurrent();
            $table->string('payment_method')->nullable();       // 'card', 'paypal', etc.
            $table->string('transaction_reference')->nullable(); // external txn id

            // Robust status
            $table->enum('status', [
                'pending',
                'processing',
                'completed',
                'failed',
                'refunded',
            ])->default('pending');

            // Raw gateway response
            $table->json('meta')->nullable();

            $table->timestamps();

            // Indexes for performance
            $table->index(['customer_subscription_id', 'status']);
            $table->index(['payment_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_transactions');
    }
};
