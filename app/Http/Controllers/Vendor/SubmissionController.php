<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\VendorService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SubmissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Vendor/Submission');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'slug'              => 'nullable|string|max:255',
            'city'              => 'nullable|string|max:255',
            'location'          => 'required|string|max:255',
            'connection_type'   => 'required|in:fiber,dsl,wireless,satellite',
            'highlight'         => 'nullable|in:new,trending,reliable,popular,undefined',
            'short_description' => 'required|string|max:500',
            'full_description'  => 'required|string',

            'packages'          => 'nullable|array',
            'features'          => 'nullable|array',
            'faqs'              => 'nullable|array',
            'images.*'          => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'speed_details'     => 'nullable|array',
            'coverage_area'     => 'nullable|string|max:255',
            'is_active'         => 'nullable|boolean',
        ]);
        // dd($request);

        $validated['user_id'] = Auth::user()->id;

        // Slug fallback
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        }

        // Handle images
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $img) {
                $imagePaths[] = $img->store('services', 'public');
            }
            $validated['images'] = $imagePaths;
        } else {
            $validated['images'] = [];
        }

        // Ensure arrays are arrays (avoid nulls)
        $validated['features'] = $validated['features'] ?? [];
        $validated['faqs']     = $validated['faqs'] ?? [];
        $validated['packages'] = $validated['packages'] ?? [];
        $validated['speed_details'] = $validated['speed_details'] ?? [];

        VendorService::Create($validated);

        return redirect()
            ->route('services.index')
            ->with('success', 'Vendor service added successfully.');
    }
}
