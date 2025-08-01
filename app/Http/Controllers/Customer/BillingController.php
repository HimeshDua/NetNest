<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use Inertia\Inertia;
class BillingController
{
    public function index(){
        return Inertia::render('Customer/Billing');
    }
}
