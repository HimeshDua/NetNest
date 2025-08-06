<?php

namespace Database\Factories;

use App\Models\CustomerSubscription;
use App\Models\User;
use App\Models\VendorService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerSubscription>
 */
class CustomerSubscriptionFactory extends Factory
{
    protected $model = CustomerSubscription::class;

    public function definition(): array
    {
        $vendorService = VendorService::inRandomOrder()->first() ?? VendorService::factory()->create();
        $billingCycle = $vendorService->billing_cycle;
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
            'status' => fake()->randomElement(['active', 'cancelled', 'expired']),
        ];
    }
}
