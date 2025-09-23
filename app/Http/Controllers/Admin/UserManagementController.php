<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagementController
{

  public function index(Request $request)
  {
    $query = User::query();

    if ($request->filled('role')) {
      $query->where('role', $request->role);
    }

    if ($request->filled('search')) {
      $search = $request->search;
      $query->where(function ($q) use ($search) {
        $q->where('name', 'like', "%{$search}%")
          ->orWhere('role', 'like', "%{$search}%")
          ->orWhere('email', 'like', "%{$search}%")
          ->orWhere('phone', 'like', "%{$search}%");
      });
    }

    $users = $query->latest()->paginate(10);

    return Inertia::render('Admin/Users/Index', [
      'users' => $users,
      'filters' => $request->only(['role', 'search']),
    ]);
  }


  public function show(User $user)
  {
    return Inertia::render('Admin/Users/Show', [
      'user' => $user,
    ]);
  }

  public function update(Request $request, User $user)
  {
    $validated = $request->validate([
      'role' => 'required|in:customer,vendor,admin',
      'phone' => 'nullable|string|max:15|unique:users,phone,' . $user->id,
      'status' => 'nullable|in:active,suspended',
    ]);

    $user->update($validated);

    return back()->with('success', 'User updated successfully.');
  }

  // Soft delete or ban user
  public function destroy(User $user)
  {
    $user->delete();

    return back()->with('success', 'User deleted successfully.');
  }
}
