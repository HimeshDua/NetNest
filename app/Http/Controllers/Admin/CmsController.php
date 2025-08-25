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

        // ---- Validation (matches cms.d.ts) ----
        $data$request->validate([
            // HERO
            'hero' => 'nullable|array',
            'hero.title' => 'nullable|string|max:255',
            'hero.subtitle' => 'nullable|string',
            'hero.buttons' => 'nullable|array',
            'hero.buttons.*.text' => 'required_with:hero.buttons.*.href|string|max:255',
            'hero.buttons.*.href' => ['required_with:hero.buttons.*.text', 'string', 'regex:/^(https?:\/\/|\/)/'],
            'hero.buttons.*.variant' => 'nullable|string|max:128',

            'hero.mockup' => 'nullable|array',
            'hero.mockup.srcLight' => 'nullable|file|image|max:8192',
            'hero.mockup.srcDark' => 'nullable|file|image|max:8192',
            'hero.mockup.alt' => 'nullable|string|max:255',

            // MARQUEES
            'marquees' => 'nullable|array',
            'marquees.*.text' => 'required|string|max:255',
            'marquees.*.link' => ['nullable', 'string', 'max:2048', 'regex:/^(https?:\/\/|\/)/'],

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
            'about.image' => 'nullable|file|image|max:4096',

            // TESTIMONIALS (avatar is a string path/url in your TS)
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

        // ---- Build & merge JSON payloads ----

        // HERO
        $hero = array_replace_recursive($data->hero ?? [], $request->input('hero', []));

        // HERO MOCKUP (srcLight/srcDark)
        $hero['mockup'] = $hero['mockup'] ?? [];
        foreach (['srcLight', 'srcDark'] as $k) {
            if ($request->hasFile("hero.mockup.$k")) {
                if (!empty($cms->hero['mockup'][$k])) {
                    Storage::disk('public')->delete($cms->hero['mockup'][$k]);
                }
                $hero['mockup'][$k] = $request->file("hero.mockup.$k")->store('cms/hero/mockups', 'public');
            } else {
                $hero['mockup'][$k] = $hero['mockup'][$k] ?? ($cms->hero['mockup'][$k] ?? null);
            }
        }
        $cms->hero = $hero;

        // MARQUEES / FEATURES
        $cms->marquees = $request->input('marquees', $data->marquees ?? []);
        $cms->features_primary = $request->input('features_primary', $data->features_primary ?? []);
        $cms->features_secondary = $request->input('features_secondary', $data->features_secondary ?? []);

        

        // ABOUT
        $about = array_replace_recursive($data->about ?? [], $request->input('about', []));
        if ($request->hasFile('about.image')) {
            if (!empty($cms->about['image'])) {
                Storage::disk('public')->delete($cms->about['image']);
            }
            $about['image'] = $request->file('about.image')->store('cms/about', 'public');
        } else {
            $about['image'] = $about['image'] ?? ($cms->about['image'] ?? null);
        }
        $cms->about = $about;

        // TESTIMONIALS (string avatar; no file processing here)
        $cms->testimonials = $request->input('testimonials', $data->testimonials ?? []);

        // SEO
        $cms->seo = $request->input('seo', $cms->seo ?? []);

        $cms->fill($data)->save();

        return redirect()->route('admin.cms.edit')->with('success', 'CMS updated successfully!');
    }
}
