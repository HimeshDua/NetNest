<?php

namespace App\Http\Controllers\Vendor;

use Illuminate\Http\Request;
use Inertia\Inertia;
class ProfileController
{
     public function index(){
        return Inertia::render('Vendor/AssignedConnections');
    }
}
