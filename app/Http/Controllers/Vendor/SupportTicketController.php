<?php

namespace App\Http\Controllers\Vendor;

use Illuminate\Http\Request;
use Inertia\Inertia;
class SupportTicketController
{
   public function index(){
        return Inertia::render('Vendor/Support');
    }
}
