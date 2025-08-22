<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CmsController extends Controller
{
    /**
     * Display the CMS page.
     */
    public function edit()
    {
        // Find the first CMS record, or create a new one if it doesn't exist.
        $cms = Cms::firstOrNew([]);

        return Inertia::render('Admin/Cms', [
            'cms' => $cms
        ]);
    }

    /**
     * Update the CMS settings.
     */
    public function update(Request $request)
    {
        // Find the first CMS record or initialize a new one.
        $cms = Cms::firstOrNew([]);

        $data = $request->validate([
            // Hero
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string',
            'hero_background_image' => 'nullable|file|image|max:2048', // 2MB max
            'hero_cta_text' => 'nullable|string|max:255',
            'hero_cta_link' => 'nullable|url', // Use 'url' to validate link format

            // Marquees
            'marquees' => 'nullable|array',
            'marquees.*.text' => 'string|max:255',
            'marquees.*.link' => 'nullable|url',

            // Features
            'features_primary' => 'nullable|array',
            'features_primary.*.title' => 'string|max:255',
            'features_primary.*.description' => 'nullable|string',
            'features_primary.*.icon' => 'nullable|string',

            // About
            'about_title' => 'nullable|string|max:255',
            'about_description' => 'nullable|string',
            'about_image' => 'nullable|file|image|max:2048',

            // Testimonials
            'testimonials' => 'nullable|array',
            'testimonials.*.name' => 'string|max:255',
            'testimonials.*.quote' => 'string',
            'testimonials.*.avatar' => 'nullable|url', // Using url validation for simplicity

            // SEO
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.*' => 'string',

            // Footer + Social
            'footer_links' => 'nullable|array',
            'footer_links.*.name' => 'string|max:255',
            'footer_links.*.href' => 'nullable|url',

            'social_links' => 'nullable|array',
            'social_links.*.platform' => 'string|max:255',
            'social_links.*.url' => 'nullable|url',
            'social_links.*.icon' => 'nullable|string',
        ]);

        // Handle Hero image upload and deletion of old image
        if ($request->hasFile('hero_background_image')) {
            // Delete the old image if it exists
            if ($cms->hero_background_image) {
                Storage::disk('public')->delete($cms->hero_background_image);
            }
            $data['hero_background_image'] = $request->file('hero_background_image')->store('cms', 'public');
        } else {
            // If no new file is uploaded, retain the existing path or set to null if it's explicitly removed
            $data['hero_background_image'] = $cms->hero_background_image;
        }

        // Handle About image upload and deletion of old image
        if ($request->hasFile('about_image')) {
            // Delete the old image if it exists
            if ($cms->about_image) {
                Storage::disk('public')->delete($cms->about_image);
            }
            $data['about_image'] = $request->file('about_image')->store('cms', 'public');
        } else {
            // If no new file is uploaded, retain the existing path or set to null if it's explicitly removed
            $data['about_image'] = $cms->about_image;
        }

        // Use fill() to update attributes from the validated data
        $cms->fill($data);

        // Save the model (creates a new record or updates the existing one)
        $cms->save();

        return redirect()->route('admin.cms')->with('success', 'CMS updated successfully!');
    }
}
