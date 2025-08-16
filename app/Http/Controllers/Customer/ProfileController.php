<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use App\Models\CustomerRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProfileController
{
    public function index()
    {
        return Inertia::render('Customer/Profile');
    }


    public function VendorRequest(Request $request)
    {

        $user = Auth::user();

        if (CustomerRequest::where('user_id', $user->id)->exists()) {
            return redirect()->back()->with('error', 'your request has been already recorded');
        }

        $request->validate([
            'email' => 'required | string'
        ]);

        CustomerRequest::create(
            [
                'user_id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
            ]
        );

        return redirect()->back()->with('success', 'Your request has been sent to the admin.');
    }
}
