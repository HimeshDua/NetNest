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
      return redirect()->route('submission.index')->with('warning', 'Please submit your service details first.');
      // return Inertia::render('Vendor/Submission');
    }
    $subscriptions = CustomerSubscription::where('vendor_service_id', $service->id)->get();

    $totalCustomers = $subscriptions->count();
    $activeCustomers = $subscriptions->where('status', 'active')->count();
    $cancelledCustomers = $subscriptions->where('status', 'cancelled')->count();
    // $expiredCustomers = $subscriptions->where('status', 'expired')->count();


    $totalRevenue = $service->transactions()->completed()->sum('amount');

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

    $monthlyRevenue = $service->transactions()
      ->where('customer_transactions.status', 'completed')
      ->where('payment_date', '>=', now()->subYear())
      ->selectRaw('YEAR(payment_date) as year, MONTH(payment_date) as month, SUM(amount) as revenue')
      ->groupBy('year', 'month', 'customer_subscriptions.vendor_service_id')
      ->orderBy('year')
      ->orderBy('month')
      ->get();


    $chartData = $monthlyRevenue->map(function ($item) {
      return [
        'name'  => \DateTime::createFromFormat('!m', $item->month)->format('M'),
        'total' => $item->revenue,
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
