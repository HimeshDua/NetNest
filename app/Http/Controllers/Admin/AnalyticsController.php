<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
class AnalyticsController
{
    public function index(){
        return Inertia::render('Admin/Analytics');
    }
}
