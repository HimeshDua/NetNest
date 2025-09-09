<?php

namespace App\Http\Controllers\Vendor;

use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConversationController
{
    public function index()
    {
        $vendorId = Auth::id();

        $conversations = Conversation::where('vendor_id', $vendorId)
            ->with(['customer'])
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Vendor/Conversations', [
            'conversations' => $conversations,
            'auth' => ['user' => Auth::user()],
        ]);
    }
}
