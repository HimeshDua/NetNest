<?php


namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vendor;

class Submission extends Controller
{
    public function index()
    {
       return Inertia::render('Vendor/Submission');
    }

    public function create()
    {
        return Inertia::render('Vendor/Submission/Create');
    }

    public function store(Request $request)
    {
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

        Vendor::create($validated);

        return redirect()->route('vendor')->with('success', 'Vendor added successfully.');
    }

    // public function show(string $id)
    // {
    //     $services = Vendor::paginate(6);
    //     return Inertia::render('Vendor/Submission',['services' => $services]);
    // }

    public function edit(string $id)
    {
        $vendor = Vendor::findOrFail($id);
        return Inertia::render('Vendor/Submission/Edit', compact('vendor'));
    }

    public function update(Request $request, string $id)
    {
        $vendor = Vendor::findOrFail($id);

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

    public function destroy(string $id)
    {
        $vendor = Vendor::findOrFail($id);
        $vendor->delete();

        return redirect()->route('vendor.submissions.index')->with('success', 'Vendor deleted.');
    }
}
