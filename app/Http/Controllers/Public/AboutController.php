<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Cms;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $aboutPage = Cms::get([
            'about'
        ])->toArray();
        // dd($aboutPage);
        return Inertia::render('Public/About', ['aboutPage' => $aboutPage]);
    }
}
