<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\CustomerTransaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function store()
    {
        $transaction = CustomerTransaction::create();
    }
}
