<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vendor;
class VendorController extends Controller
{public function index(Request $request)
{
    $services = Vendor::orderBy('created_at', 'desc')->paginate(6);

    return Inertia::render('Public/Vendors', [
        'services' => $services,
    ]);
}

}
