<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
class CMSController
{
    public function index(){
        return Inertia::render('Admin/CMS');
    }
}
