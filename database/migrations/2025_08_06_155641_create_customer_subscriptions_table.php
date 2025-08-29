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
        Schema::create('customer_subscriptions', function (Blueprint $table) {
            $table->id();

            // Who subscribed (must be a customer user)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // What service they subscribed to
            $table->foreignId('vendor_service_id')->constrained()->cascadeOnDelete();

            // Link to Cashier’s subscription row
            $table->foreignId('cashier_subscription_id')
                ->nullable()
                ->constrained('subscriptions')
                ->nullOnDelete(); // don’t break if cashier row is deleted

            // Domain-specific subscription metadata
            $table->enum('package_name', ['Basic', 'Standard', 'Premium']);

            // Billing timeline
            $table->date('subscribed_at')->default(now());
            $table->date('next_billing_date')->nullable();

            // Status tracking (decoupled from Stripe’s status)
            $table->enum('status', ['active', 'cancelled', 'expired'])
                ->default('active');

            $table->timestamps();

            // Indexing for queries
            $table->index(['vendor_service_id', 'package_name']);
            $table->index(['user_id', 'status']);
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_subscriptions');
    }
};
