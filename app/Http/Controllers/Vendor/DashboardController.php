<?php

namespace App\Http\Controllers\Vendor;

use App\Models\CustomerSubscription;
use App\Models\VendorService;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController
{
  public function index()
  {
    $vendorId = Auth::id();
    $service = VendorService::where('user_id', $vendorId)->first();
    
    if (!$service) {
      return Inertia::render('Vendor/Submission');
    }
    $subscriptions = CustomerSubscription::where('vendor_service_id', $service->id)->get();

    $totalCustomers = $subscriptions->count();
    $activeCustomers = $subscriptions->where('status', 'active')->count();
    $cancelledCustomers = $subscriptions->where('status', 'cancelled')->count();
    // $expiredCustomers = $subscriptions->where('status', 'expired')->count();

    // revenue
    $totalRevenue = $activeCustomers * $service->price;

    // Recent 5 subscribers
    $recentSubscribers = CustomerSubscription::with('customer')->where('vendor_service_id', $service->id)
      ->latest()
      ->take(5)
      ->get()
      ->map(function ($sub) {
        return [
          'customer_name' => $sub->customer->name,
          'customer_email' => $sub->customer->email,
          'subscribed_at' => $sub->subscribed_at->toDateString(),
          'next_billing_date' => $sub->next_billing_date->toDateString(),
          'status' => $sub->status,
        ];
      });

    $monthlyRevenue = CustomerSubscription::selectRaw('MONTH(subscribed_at) as month, YEAR(subscribed_at) as year, COUNT(*) as subscriptions')
      ->where('vendor_service_id', $service->id)
      ->where('status', 'active')
      ->where('subscribed_at', '>=', now()->subYear())
      ->groupBy('year', 'month')
      ->orderBy('year', 'asc')
      ->orderBy('month', 'asc')
      ->get();

    // Map the query result to the format needed for the chart
    $chartData = $monthlyRevenue->map(function ($item) use ($service) {
      return [
        'name' => \DateTime::createFromFormat('!m', $item->month)->format('M'),
        'total' => $item->subscriptions * $service->price,
      ];
    })->values();

    return Inertia::render('Vendor/Dashboard', [
      'vendorData' => [
        'service' => $service,
        'totalRevenue' => $totalRevenue,
        'totalCustomers' => $totalCustomers,
        'activeCustomers' => $activeCustomers,
        'cancelledCustomers' => $cancelledCustomers,
        'recentSubscribers' => $recentSubscribers,
        'chartData' => $chartData,
        'service' => $service
      ]
    ]);
  }
}
