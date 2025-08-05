<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\VendorService;

class SubmissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Vendor/Submission');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'vendor_name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'location' => 'required|string|max:255',
            'connection_type' => 'required|in:fiber,dsl,wireless',
            'price' => 'required|numeric|min:0',
            'billing_cycle' => 'required|in:Monthly,Quarterly,Yearly',
            'short_description' => 'required|string|max:500',
            'full_description' => 'required|string',
            'highlight' => 'nullable|in:new,trending,reliable,popular,undefined',
            'features' => 'nullable|string', // comma separated
            'faqs' => 'nullable|json',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $validated['user_id'] = auth()->id();

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('logos', 'public');
        }

        if ($request->hasFile('images')) {
            $validated['images'] = [];
            foreach ($request->file('images') as $img) {
                $validated['images'][] = $img->store('services', 'public');
            }
        } else {
            $validated['images'] = [];
        }

        // Parse comma features
        $validated['features'] = isset($validated['features'])
            ? array_map('trim', explode(',', $validated['features']))
            : [];

        // Parse JSON FAQs
        $validated['faqs'] = isset($validated['faqs']) ? json_decode($validated['faqs'], true) : [];

        VendorService::create($validated);

        return redirect()->route('services.index')->with('success', 'Vendor service added successfully.');
    }



    public function edit(string $id) //get 
    {
        $vendor = VendorService::findOrFail($id);
        return Inertia::render('Vendor/Submission/Edit', compact('vendor'));
    }

    public function update(Request $request, string $id) // post
    {
        $vendor = VendorService::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string',
            'vendorName' => 'required|string',
            'vendorLogo' => 'required|string',
            'location' => 'required|string',
            'connectionType' => 'required|in:fiber,dsl,wireless',
            'price' => 'required|string',
            'postedDate' => 'required|date',
            'description' => 'required|string',
            'highlight' => 'required|in:new,trending,reliable,popular,undefined',
            'features' => 'nullable|array',
        ]);

        $vendor->update($validated);

        return redirect()->route('vendor.submissions.index')->with('success', 'Vendor updated successfully.');
    }
}
