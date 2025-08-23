<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Cms;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $homePage = Cms::get()->makeHidden('about')->toArray();

        // dd($homePage);

        return Inertia::render('Public/Home', ['homePage' => $homePage ?? null]);
    }
}
