<?php

namespace App\Http\Controllers\Vendor;

use Illuminate\Http\Request;
use Inertia\Inertia;
class DashboardController
{
  public function index(){
    return Inertia::render('Vendor/Dashboard');
   }
}
