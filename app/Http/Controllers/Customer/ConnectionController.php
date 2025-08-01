<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use Inertia\Inertia; 

class ConnectionController
{
    public function myPlans(){
        return Inertia::render('Customer/MyPlans');
    }
    public function status(){
        return ;
    }
}
