<?php

namespace App\Http\Controllers\Vendor;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InstallationRequestController
{
    public function index()
    {
        return Inertia::render('Vendor/AssignedConnections');
    }
    public function requests()
    {
        return Inertia::render('Vendor/InstallationRequests');
    }
}
