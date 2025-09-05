<?php

use Illuminate\Support\Facades\Broadcast;

/*
 | Register the broadcasting auth route used by Echo:
 | - this creates POST /broadcasting/auth
 | - include 'auth' middleware so session cookies are checked
 */

Broadcast::routes(['middleware' => ['web', 'auth']]);

// Authorize private channel subscription
Broadcast::channel('chat.{conversationId}', function ($user, $conversationId) {
    return \App\Models\Conversation::where('id', $conversationId)
        ->where(function ($q) use ($user) {
            $q->where('customer_id', $user->id)
                ->orWhere('vendor_id', $user->id);
        })->exists();
});
