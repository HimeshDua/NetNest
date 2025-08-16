<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ConnectionController
{
    public function services()
    {
        return Inertia::render('Customer/Services');
    }
    public function status()
    {
        return;
    }
}
