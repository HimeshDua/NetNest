<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use Inertia\Inertia;
class SupportTicketController
{
    public function index(){
        return Inertia::render('Customer/Support');
    }
    public function store(){
        return ;
    }
}
