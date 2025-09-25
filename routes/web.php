<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/channels.php';

// Public routes
Route::get('/', [\App\Http\Controllers\Public\HomeController::class, 'index'])->name('home');
Route::get('/about', [\App\Http\Controllers\Public\AboutController::class, 'index'])->name('about');
Route::get('/contact', fn() => Inertia::render('Public/Contact'))->name('contact');

Route::get('/services', [\App\Http\Controllers\Public\ServicesController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [\App\Http\Controllers\Public\ServicesController::class, 'show'])->name('services.show');

// Auth routes (already in `auth.php`)
Route::middleware(['auth', 'redirect.role'])->get('/dashboard', fn() => null)->name('dashboard');



// ---------------------------
// Customer Routes
// ---------------------------

Route::middleware(['auth', 'verified', 'role:customer'])->group(function () {

  // Route::get('/chat/v/{vendorId}', [ChatController::class, 'openWithVendor'])
  //   ->name('chat.open');


  Route::get('/subscriptions', [\App\Http\Controllers\Customer\SubscriptionController::class, 'index'])->name('customer.subscription');
  Route::post('/store-subscription', [\App\Http\Controllers\Customer\TransactionController::class, 'store'])->name('customer.subscription.store');

  Route::post('/request', [\App\Http\Controllers\Settings\ProfileController::class, 'request'])->name('customer.request');
});

// ---------------------------
// Vendor Routes
// ---------------------------
Route::middleware(['auth', 'verified', 'role:vendor'])->group(function () {
  Route::get('/vendor/dashboard', [\App\Http\Controllers\Vendor\DashboardController::class, 'index'])->name('vendor.dashboard');
  Route::resource('/submission', \App\Http\Controllers\Vendor\SubmissionController::class)->only(['index', 'store', 'edit', 'update']);

  Route::get('/conversations', [ChatController::class, 'vendorIndex'])->name('vendor.conversations');
  Route::get('/conversations/{conversation}', [ChatController::class, 'show'])->name('vendor.conversations.show');

  // Route::get('/assigned-connections', [\App\Http\Controllers\Vendor\InstallationRequestController::class, 'index'])->name('vendor.assigned');
  // Route::get('/installation-requests', [\App\Http\Controllers\Vendor\InstallationRequestController::class, 'requests'])->name('vendor.installation');

  // Route::get('/vendor/conversations', [\App\Http\Controllers\Vendor\ConversationController::class, 'index'])->name('vendor.conversations');
  // Route::get('/c/{conversation}', [ChatController::class, 'show'])->name('vendor.conversations.show');
  // Route::get('/profile', [\App\Http\Controllers\Vendor\ProfileController::class, 'index'])->name('vendor.profile');
});

// ---------------------------
// Admin Routes
// ---------------------------
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
  Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

  Route::patch('/role/update', [\App\Http\Controllers\Admin\DashboardController::class, 'updateCustomerRole'])
    ->name('admin.role.update');

  Route::resource('/users', \App\Http\Controllers\Admin\UserManagementController::class)->only(['index', 'show', 'update', 'destroy']);
  // Route::resource('/plans', \App\Http\Controllers\Admin\PlanManagementController::class)->except(['edit', 'create']);

  Route::get('/services', [\App\Http\Controllers\Admin\ServiceManagementController::class, 'index'])->name('admin.services.index');
  Route::get('/services/{service}', [\App\Http\Controllers\Admin\ServiceManagementController::class, 'show'])->name('admin.services.show');

  Route::get(
    '/services/{service}/users/{user}',
    [\App\Http\Controllers\Admin\ServiceManagementController::class, 'showUser']
  )->name('admin.services.users.show');

  Route::patch('/services/{service}/toggle', [\App\Http\Controllers\Admin\ServiceManagementController::class, 'toggleStatus'])->name('admin.services.toggle');
  Route::delete('/services/{service}', [\App\Http\Controllers\Admin\ServiceManagementController::class, 'destroy'])->name('admin.services.destroy');


  Route::get('/cms', [\App\Http\Controllers\Admin\CmsController::class, 'edit'])->name('admin.cms.edit');
  Route::post('/cms/post', [\App\Http\Controllers\Admin\CmsController::class, 'update'])->name('admin.cms.update');

  // Route::get('/analytics', [\App\Http\Controllers\Admin\AnalyticsController::class, 'index'])->name('admin.analytics');
});

// ---------------------------
// Chat Routes
// ---------------------------
// Route::middleware(['auth'])->group(function () {
//   // Shared API endpoints (both participants may use, controller will authorize)
//   Route::get('/conversations/{conversation}/messages', [ChatController::class, 'fetch'])
//     ->name('conversations.messages');
//   Route::post('/conversations/{conversation}/send', [ChatController::class, 'send'])
//     ->name('conversations.send');
// });

// ---------------------------
// Chat routes
// ---------------------------
Route::middleware(['auth'])->group(function () {
  // CUSTOMER: start/get a conversation with a vendor (only if purchased)
  Route::middleware(['role:customer'])->group(function () {
    Route::get('/support', [\App\Http\Controllers\Customer\SupportController::class, 'index'])->name('customer.support');

    Route::get('/chat/vendor/{vendorId}', [ChatController::class, 'openWithVendor'])
      ->name('chat.open'); // e.g. route('chat.open', $vendor->id)
  });

  // </  // VENDOR: vendor inbox + open a specific conversation
  // Route::middleware(['role:vendor'])->prefix('vendor')->group(function () {
  //   Route::get('/conversations', [ChatController::class, 'vendorIndex'])->name('vendor.conversations');
  //   Route::get('/conversations/{conversation}', [ChatController::class, 'show'])->name('vendor.conversations.show');
  // }); />

  // Shared API endpoints (both participants may use, controller will authorize)
  Route::get('/conversations/{conversation}/messages', [ChatController::class, 'fetch'])
    ->name('conversations.messages');
  Route::post('/conversations/{conversation}/send', [ChatController::class, 'send'])
    ->name('conversations.send');
});

// Route::get('/reverse-geocode', function (Request $request) {
//   dd('here');
//   $lat = $request->query('lat');
//   $lon = $request->query('lon');

//   $url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={$lat}&lon={$lon}";

//   $response = Http::withHeaders([
//     'User-Agent' => 'NetNest/1.0 (himeshdua22@gmail.com)',
//   ])->get($url);

//   return $response->json();
// });
