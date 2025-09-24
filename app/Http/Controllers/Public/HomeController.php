<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Cms;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
    $homePage = Cms::get()->makeHidden('about')->toArray();
    $seo = Cms::pluck('seo')->toArray();
    // dd($seo);

    return Inertia::render('Public/Home', ['homePage' => $homePage ?? null, 'seo' => $seo]);
  }
}
