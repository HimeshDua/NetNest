<?php

namespace App\Http\Controllers\Vendor;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController
{
  public function index()
  {
    // $isEditable = Vendor::
    return Inertia::render('Vendor/Dashboard');
  }
}
