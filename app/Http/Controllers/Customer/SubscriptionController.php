<?php

namespace App\Http\Controllers\Customer;

use App\Models\CustomerSubscription;
use App\Models\CustomerTransaction;
use App\Models\User;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionController
{
    public function index()
    {
        return Inertia::render('Customer/Subscription');
    }
}
