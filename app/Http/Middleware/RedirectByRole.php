<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectByRole
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user) {
            // echo ($user);
            switch ($user->role) {
                case 'customer':
                    return redirect()->route('home');
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'vendor':
                    return redirect()->route('vendor.dashboard');
            }
        }

        return redirect()->route('home'); // fallback for guests
    }
}
