<?php

namespace App\Http\Controllers\Vendor;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupportTicketController
{
    public function index()
    {
        $vendorId = Auth::id();

        $conversations = Conversation::where('vendor_id', $vendorId)
            ->with(['customer'])
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Vendor/Support', [
            'conversations' => $conversations,
            'auth' => ['user' => Auth::user()],
        ]);
    }
}
