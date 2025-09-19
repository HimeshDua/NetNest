<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\CustomerRequest;
use App\Models\User;
use App\Models\VendorService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
  /**
   * Show the user's profile settings page.
   */
  public function edit(Request $request): Response
  {
    $userId = Auth::user()->id;
    $isRequestSend = CustomerRequest::where('user_id', $userId)->get('id');

    return Inertia::render('settings/profile', [
      'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
      'status' => $request->session()->get('status'),
      'isRequestSend' => $isRequestSend ?? []
    ]);
  }

  /**
   * Update the user's profile settings.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse
  {
    $user  = $request->user();
    $user->fill($request->validated());

    if ($user->isDirty('email')) {
      $user->email_verified_at = null;
    }

    $user->save();

    return to_route('profile.edit');
  }

  /**
   * Delete the user's account.
   */
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
  }
  public function request(Request $request)
  {

    // dd($request->all());
    Log::info('Vendor request received:', $request->all());

    $request->validate([
      'email' => ['required', 'email'],
      'phone' => ['required', 'string', 'min:10'],
      'location' => ['required', 'string', 'max:255'],
      'latitude' => ['required', 'numeric', 'between:-90,90'],
      'longitude' => ['required', 'numeric', 'between:-180,180'],
      'description' => ['required', 'string', 'max:1000'],
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
      return back()->with('error', "No user found with this email. Please log in and try again.");
    }

    if ($user->role !== "customer") {
      return back()->with('error', "Only customers can request to become a vendor.");
    }

    CustomerRequest::firstOrCreate(
      ['email' => $request->email],
      [
        'user_id' => $user->id,
        'role' => $user->role,
        'phone' => $request->phone,
        'location' => $request->location,
        'latitude' => $request->latitude,
        'longitude' => $request->longitude,
        'description' => $request->description,
      ]
    );

    return back()->with('success', "Your request has been sent successfully! You’ll be contacted within 24 hours.");
  }
}
