<?php

namespace App\Http\Controllers\Customer;

use App\Models\CustomerSubscription;
use App\Models\CustomerTransaction;
use App\Models\User;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BillingController
{
    public function index()
    {
        $user_id = Auth::user()->id;
        $subIds = CustomerSubscription::where('user_id', $user_id)->pluck('id');

        $transactions = CustomerTransaction::whereIn('customer_subscription_id', $subIds)->get();
        // $customerServices = VendorService::whereIn('id', $subIds)->pluck('packages');


        $customerServices = VendorService::whereIn('id', $subIds)->pluck('packages')->flatten(1);


        $billingData = ['transactions' => $transactions, 'customerServices' => $customerServices];
        return Inertia::render('Customer/Billing', compact('billingData'));
    }
}
