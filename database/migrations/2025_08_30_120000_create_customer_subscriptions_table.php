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
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->foreignId('vendor_service_id')->constrained()->cascadeOnDelete();

            // Link to Cashier subscription
            $table->foreignId('cashier_subscription_id')
                ->nullable()
                ->constrained('subscriptions')
                ->nullOnDelete();

            $table->enum('package_name', ['Basic', 'Standard', 'Premium']);
            $table->timestamps();

            $table->index(['user_id', 'vendor_service_id']);
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
