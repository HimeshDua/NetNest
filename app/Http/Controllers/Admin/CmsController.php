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
        $cms = Cms::firstOrNew([]);

        return Inertia::render('Admin/Cms', [
            'cms' => $cms,
        ]);
    }

    /**
     * Update CMS.
     */
    public function update(Request $request)
    {
        $cms = Cms::firstOrNew([]);

        $data = $request->validate([
            // Hero section stored as JSON
            'hero' => 'nullable|array',
            'hero.title' => 'nullable|string|max:255',
            'hero.subtitle' => 'nullable|string',
            'hero.background' => 'nullable|file|image|max:2048',
            'hero.cta_text' => 'nullable|string|max:255',
            'hero.cta_link' => 'nullable|url',

            // Marquees
            'marquees' => 'nullable|array',
            'marquees.*.text' => 'string|max:255',
            'marquees.*.link' => 'nullable|url',

            // Features
            'features_primary' => 'nullable|array',
            'features_primary.*.title' => 'string|max:255',
            'features_primary.*.description' => 'nullable|string',
            'features_primary.*.icon' => 'nullable|string',

            'features_secondary' => 'nullable|array',
            'features_secondary.*.title' => 'string|max:255',
            'features_secondary.*.description' => 'nullable|string',
            'features_secondary.*.icon' => 'nullable|string',

            // About section stored as JSON
            'about' => 'nullable|array',
            'about.title' => 'nullable|string|max:255',
            'about.description' => 'nullable|string',
            'about.image' => 'nullable|file|image|max:2048',

            // Testimonials
            'testimonials' => 'nullable|array',
            'testimonials.*.name' => 'string|max:255',
            'testimonials.*.quote' => 'string',
            'testimonials.*.avatar' => 'nullable|file|image|max:2048',

            // SEO
            'seo' => 'nullable|array',
            'seo.meta_title' => 'nullable|string|max:255',
            'seo.meta_description' => 'nullable|string',
            'seo.meta_keywords' => 'nullable|array',
            'seo.meta_keywords.*' => 'string',
        ]);

        // --- File handling ---
        // Hero background
        if ($request->hasFile('hero.background')) {
            if (isset($cms->hero['background'])) {
                Storage::disk('public')->delete($cms->hero['background']);
            }
            $data['hero']['background'] = $request->file('hero.background')->store('cms', 'public');
        } else {
            $data['hero']['background'] = $cms->hero['background'] ?? null;
        }

        // About image
        if ($request->hasFile('about.image')) {
            if (isset($cms->about['image'])) {
                Storage::disk('public')->delete($cms->about['image']);
            }
            $data['about']['image'] = $request->file('about.image')->store('cms', 'public');
        } else {
            $data['about']['image'] = $cms->about['image'] ?? null;
        }

        // Testimonials avatars
        if ($request->has('testimonials')) {
            foreach ($request->file('testimonials', []) as $index => $file) {
                if ($file && $file->isValid()) {
                    if (isset($cms->testimonials[$index]['avatar'])) {
                        Storage::disk('public')->delete($cms->testimonials[$index]['avatar']);
                    }
                    $data['testimonials'][$index]['avatar'] = $file->store('cms/testimonials', 'public');
                } else {
                    $data['testimonials'][$index]['avatar'] = $cms->testimonials[$index]['avatar'] ?? null;
                }
            }
        }

        // --- Save ---
        $cms->fill($data)->save();

        return redirect()->route('admin.cms.edit')->with('success', 'CMS updated successfully!');
    }
}
