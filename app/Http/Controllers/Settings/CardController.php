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

    public function store(Request $req)
    {
        $validated = $req->validate([
            'card_number'   => ['required', 'digits_between:12,19'],
            'card_holder'   => ['nullable', 'string', 'max:255'],
            'expiry_month'  => ['required', 'digits:2'],
            'expiry_year'   => ['required', 'digits:4'],
            'cvv'           => ['required', 'digits_between:3,4'],
        ]);

        // 👉 Extract last four and brand (mock detection, in real life use gateway or regex)
        $cardNumber = preg_replace('/\s+/', '', $validated['card_number']);
        $lastFour   = substr($cardNumber, -4);
        $brand      = $this->detectCardBrand($cardNumber);

        // 👉 Upsert card details for the user
        $card = CardDetail::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'card_last_four' => $lastFour,
                'card_brand'     => $brand,
                'expiry_month'   => $validated['expiry_month'],
                'expiry_year'    => $validated['expiry_year'],
                'is_default'     => true,
            ]
        );

        return back()->with('success', 'Card details saved successfully.');
    }

    private function detectCardBrand(string $number): string
    {
        if (preg_match('/^4[0-9]{6,}$/', $number)) {
            return 'Visa';
        }
        if (preg_match('/^5[1-5][0-9]{5,}$/', $number)) {
            return 'MasterCard';
        }
        if (preg_match('/^3[47][0-9]{5,}$/', $number)) {
            return 'American Express';
        }
        return 'Unknown';
    }
}
