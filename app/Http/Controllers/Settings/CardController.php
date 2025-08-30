<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\CardDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;

class CardController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('settings/carddetails');
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'payment_method_id' => 'required|string',
        ]);

        // Attach payment method via Cashier
        $user->updateDefaultPaymentMethod($request->payment_method_id);

        return back()->with('success', 'Card saved successfully.');
    }
}
