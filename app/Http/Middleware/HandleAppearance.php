<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    public function handle(Request $request, Closure $next): Response
    {
        // Proceed first
        $response = $next($request);

        // Share appearance variable (already exists)
        View::share('appearance', $request->cookie('appearance') ?? 'system');

        return $response;
    }
}
