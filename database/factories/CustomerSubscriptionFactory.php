<?php

namespace Database\Factories;

use App\Models\CustomerSubscription;
use App\Models\User;
use App\Models\VendorService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerSubscriptionFactory extends Factory
{
    protected $model = CustomerSubscription::class;

    public function definition(): array
    {
        $vendorService = VendorService::inRandomOrder()->first() ?? VendorService::factory()->create();

        // Get billing_cycle from first package (default to Monthly)
        $firstPackage = $vendorService->packages[0] ?? ['billing_cycle' => 'Monthly'];
        $billingCycle = $firstPackage['billing_cycle'] ?? 'Monthly';

        $start = Carbon::now();
        $nextBilling = match ($billingCycle) {
            'Quarterly' => $start->copy()->addMonths(3),
            'Yearly' => $start->copy()->addYear(),
            default => $start->copy()->addMonth(),
        };

        return [
            'user_id' => User::factory()->create(['role' => 'customer'])->id,
            'vendor_service_id' => $vendorService->id,
            'subscribed_at' => $start,
            'next_billing_date' => $nextBilling,
            'package_name' => fake()->randomElement(['Basic', 'Standard', 'Premium']),
            'status' => fake()->randomElement(['active', 'cancelled', 'expired']),
        ];
    }
}
