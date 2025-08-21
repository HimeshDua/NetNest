<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class CardController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('settings/carddetails');
    }
}
