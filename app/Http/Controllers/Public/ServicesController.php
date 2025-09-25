<?php

namespace App\Http\Controllers\Public;

use App\Models\CustomerSubscription;
use App\Models\Vendor;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServicesController
{
  public function index(Request $request)
  {
    if (Auth::check()) {
      $userId = Auth::id();
      $subscribedServiceIds = CustomerSubscription::where('user_id', $userId)
        ->pluck('vendor_service_id');
    } else {
      $subscribedServiceIds = [];
    }

    $query = VendorService::with('vendor:id,name')
      ->whereNotIn('id', $subscribedServiceIds);


    if ($request->has(['lat', 'lng'])) {
      $lat = $request->lat;
      $lng = $request->lng;
      $radius = $request->radius ?? 20;

      $query->nearby($lat, $lng, $radius);
    } else {
      $query->orderBy('posted_date', 'desc');
    }

    $services = $query->paginate(6)->withQueryString();

    return Inertia::render('Public/Services', [
      'services' => $services,
    ]);
  }


  public function show($slug)
  {

    // $userId = Auth::id();
    // $subscribedServiceIds = CustomerSubscription::where('user_id', $userId)
    //   ->pluck('vendor_service_id');


    $service = VendorService::with('vendor:id,name,email,phone')
      ->where('slug', $slug)
      ->firstOrFail()
      ->toArray();

    $isSubscribed = false;
    if (Auth::check()) {
      $userId = Auth::id();
      $isSubscribed = CustomerSubscription::where('user_id', $userId)
        ->where('vendor_service_id', $service['id'])
        ->where('status', 'active')
        ->exists();
    }
    // dd($vendor);
    return Inertia::render('Public/DetailedVendorServices', [
      'service' => $service,
      'isSubscribed' => $isSubscribed,
    ]);
  }
}
