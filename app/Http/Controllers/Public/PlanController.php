<?php

namespace App\Http\Controllers\Public;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController
{
   public function index(){
      return Inertia::render('Public/Home');
   }
 
}
