<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use Inertia\Inertia;
class ProfileController
{
    public function index(){
        return Inertia::render('Customer/Profile');
    }
}
