<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Vendor_Service;
use App\Models\VendorService;

class Submission extends Controller
{
    public function index()
    {
        return Inertia::render('Vendor/Submission');
    }

    public function store(Request $request)
    {
      $request->validate([
    'title' => 'required|string|max:255',
    'slug' => 'required|string|unique:vendor_services,slug',
    'vendor_name' => 'required|string|max:255',
    'logo' => 'nullable|image|max:2048',
    'location' => 'required|string|max:255',
    'connection_type' => 'required|in:fiber,dsl,wireless',
    'price' => 'required|numeric',
    'billing_cycle' => 'required|string',
    'posted_date' => 'nullable|date',
    'short_description' => 'required|string|max:500',
    'full_description' => 'required|string',
    'highlight' => 'nullable|in:new,trending,reliable,popular,undefined',
    'features' => 'nullable|array',
    'features.*' => 'string',
    'faqs' => 'nullable|array',
    'faqs.*.question' => 'required_with:faqs|string',
    'faqs.*.answer' => 'required_with:faqs|string',
    'images' => 'nullable|array',
    'images.*' => 'string', // or file validation if you're uploading
]);


        VendorService::create($validated);

        return redirect()->route('vendors')->with('success', 'Vendor added successfully.');
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
