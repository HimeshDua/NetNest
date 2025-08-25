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

        // Validation
        $validated = $request->validate([
            // HERO
            'hero' => 'nullable|array',
            'hero.title' => 'nullable|string|max:255',
            'hero.subtitle' => 'nullable|string',
            'hero.buttons' => 'nullable|array',
            'hero.buttons.*.text' => 'required_with:hero.buttons|string|max:255',
            'hero.buttons.*.href' => ['required_with:hero.buttons', 'string', 'regex:/^(https?:\/\/|\/)/'],
            'hero.buttons.*.variant' => 'nullable|string|max:128',
            'hero.mockup' => 'nullable|array',
            'hero.mockup.alt' => 'nullable|string|max:255',

            // MARQUEE
            'marquee_text' => 'required|string|max:255',
            'marquee_link' => ['nullable', 'string', 'max:2048', 'regex:/^(https?:\/\/|\/)/'],

            // FEATURES
            'features_primary' => 'nullable|array',
            'features_primary.*.title' => 'required|string|max:255',
            'features_primary.*.description' => 'nullable|string',

            'features_secondary' => 'nullable|array',
            'features_secondary.*.title' => 'required|string|max:255',
            'features_secondary.*.description' => 'nullable|string',
            'features_secondary.*.icon' => 'nullable|string|max:255',

            // ABOUT
            'about' => 'nullable|array',
            'about.title' => 'nullable|string|max:255',
            'about.description' => 'nullable|string',

            // TESTIMONIALS
            'testimonials' => 'nullable|array',
            'testimonials.*.name' => 'required|string|max:255',
            'testimonials.*.quote' => 'required|string',
            'testimonials.*.avatar' => 'nullable|string|max:2048',

            // SEO
            'seo' => 'nullable|array',
            'seo.title' => 'nullable|string|max:255',
            'seo.description' => 'nullable|string',
            'seo.keywords' => 'nullable|array',
            'seo.keywords.*' => 'string|max:255',
        ]);

        // Handle file uploads separately as they're not in validated data
        // HERO MOCKUP IMAGES
        $heroData = $validated['hero'] ?? [];

        if ($request->hasFile('hero.mockup.srcLight')) {
            if (!empty($cms->hero['mockup']['srcLight'])) {
                Storage::disk('public')->delete($cms->hero['mockup']['srcLight']);
            }
            $heroData['mockup']['srcLight'] = $request->file('hero.mockup.srcLight')->store('cms/hero/mockups', 'public');
        } elseif (isset($cms->hero['mockup']['srcLight'])) {
            $heroData['mockup']['srcLight'] = $cms->hero['mockup']['srcLight'];
        }

        if ($request->hasFile('hero.mockup.srcDark')) {
            if (!empty($cms->hero['mockup']['srcDark'])) {
                Storage::disk('public')->delete($cms->hero['mockup']['srcDark']);
            }
            $heroData['mockup']['srcDark'] = $request->file('hero.mockup.srcDark')->store('cms/hero/mockups', 'public');
        } elseif (isset($cms->hero['mockup']['srcDark'])) {
            $heroData['mockup']['srcDark'] = $cms->hero['mockup']['srcDark'];
        }

        // ABOUT IMAGE
        $aboutData = $validated['about'] ?? [];

        if ($request->hasFile('about.image')) {
            if (!empty($cms->about['image'])) {
                Storage::disk('public')->delete($cms->about['image']);
            }
            $aboutData['image'] = $request->file('about.image')->store('cms/about', 'public');
        } elseif (isset($cms->about['image'])) {
            $aboutData['image'] = $cms->about['image'];
        }

        // Update the CMS model with all data
        $cms->hero = $heroData;
        $cms->marquee_text = $validated['marquee_text'] ?? '';
        $cms->marquee_link = $validated['marquee_link'] ?? '';
        $cms->features_primary = $validated['features_primary'] ?? [];
        $cms->features_secondary = $validated['features_secondary'] ?? [];
        $cms->about = $aboutData;
        $cms->testimonials = $validated['testimonials'] ?? [];
        $cms->seo = $validated['seo'] ?? [];

        $cms->save();

        return redirect()->route('admin.cms.edit')->with('success', 'CMS updated successfully!');
    }
}
