<?php

namespace App\Http\Controllers\Admin;
use App\Models\User;
use App\Models\CustomerTransaction;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Inertia\Inertia;
class DashboardController
{
    public function index(){
        $totalvendor = User::where('role','vendor')->count();
        $totalCustomer = User::where('role','customer')->count();
        $totalrevenue =  CustomerTransaction::where('status','completed')->sum('amount');
        $user =  ['totalvendor' => $totalvendor , 'totalRevenue'=>$totalrevenue , 'totalCustomer' => $totalCustomer];
    return Inertia::render('Admin/Dashboard', compact('user') );
   }
}
