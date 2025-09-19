<?php

namespace App\Http\Controllers\Admin;

use App\Models\CustomerRequest;
use App\Models\User;
use App\Models\CustomerTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController
{
  public function index()
  {
    $totalVendor = User::where('role', 'vendor')->count();
    $totalCustomer = User::where('role', 'customer')->count();
    $totalRevenue =  CustomerTransaction::where('status', 'completed')->sum('amount');
    $user =  ['totalVendor' => $totalVendor, 'totalRevenue' => $totalRevenue, 'totalCustomer' => $totalCustomer];

    $requestedUserIds = CustomerRequest::pluck('user_id');
    $customerRequests = User::whereIn('id', $requestedUserIds)->whereNotIn(
      'role',
      ['vendor', 'admin']
    )->latest()->paginate(4);

    $customerRequests->getCollection()->transform(function ($user) {
      $cr = $user->customerRequest;
      return [
        'id'          => $user->id,
        'email'       => $user->email,
        'name'        => $user->name,
        'role'        => $user->role,
        'phone'       => $cr->phone ?? null,
        'location'    => $cr->location ?? null,
        'latitude'    => $cr->latitude ?? null,
        'longitude'   => $cr->longitude ?? null,
        'description' => $cr->description ?? null,
        'requested_at' => $cr->created_at ?? null,
      ];
    });

    return Inertia::render('Admin/Dashboard',  [
      'user' => $user,
      'customerRequests' => $customerRequests
    ]);
  }

  public function updateCustomerRole(Request $request) // params
  {
    $validated = $request->validate([
      'role' => 'required|in:customer,vendor,admin',
      'user_id' => 'required|exists:users,id'
    ]);

    $user = User::findOrFail($validated['user_id']);
    $user->role = $validated['role'];
    $user->save();

    return back()->with('success', 'Role updated successfully.');
  }
}
