<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VendorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceManagementController extends Controller
{
  /**
   * Display all services (active/inactive).
   */
  public function index(Request $request)
  {
    $query = VendorService::with('vendor:id,name,email')->withCount('subscribers');

    // Optional filtering
    if ($request->filled('search')) {
      $search = $request->input('search');
      $query->where(function ($q) use ($search) {
        $q->where('title', 'like', "%{$search}%")
          ->orWhere('city', 'like', "%{$search}%")
          ->orWhere('location', 'like', "%{$search}%");
      });
    }

    if ($request->filled('status')) {
      $status = $request->input('status') === 'active' ? 1 : 0;
      $query->where('is_active', $status);
    }

    $services = $query->orderBy('subscribers_count', 'desc')->paginate(10)->withQueryString();

    return Inertia::render('Admin/Services/Index', [
      'services' => $services,
      'filters' => $request->only(['search', 'status']),
    ]);
  }

  /**
   * Show details of a single service.
   */
  public function show(VendorService $service)
  {
    $service->load(['vendor:id,name,email', 'subscribers'])->loadCount('subscribers');
    // dd($service);
    return Inertia::render('Admin/Services/Show', [
      'service' => $service,
    ]);
  }

  public function showUser(VendorService $service, User $user)
  {

    if (! $service->subscribers()->where('user_id', $user->id)->exists()) {
      abort(403, 'This user has not purchased this service.');
    }
    $user->load(['transactions']);


    return Inertia::render('Admin/Services/User/Show', [
      'user' => $user,
      'service' => $service,
    ]);
  }


  /**
   * Toggle activation (active/inactive).
   */
  public function toggleStatus(VendorService $service)
  {
    $service->update(['is_active' => !$service->is_active]);

    return back()->with('success', 'Service status updated successfully.');
  }

  /**
   * Delete a service.
   */
  public function destroy(VendorService $service)
  {
    $service->delete();

    return back()->with('success', 'Service deleted successfully.');
  }
}
