<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
class DashboardController
{
    public function index(){
    return Inertia::render('Admin/Dashboard');
   }
}
