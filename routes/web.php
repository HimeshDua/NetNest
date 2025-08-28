<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Public routes
Route::get('/', [\App\Http\Controllers\Public\HomeController::class, 'index'])->name('home');
Route::get('/about', [\App\Http\Controllers\Public\AboutController::class, 'index'])->name('about');
Route::get('/contact', fn() => Inertia::render('Public/Contact'))->name('contact');
// Route::get('/vendors', fn() => Inertia::render('Public/Vendors'))->name('vendors');


// Route::patch('/role/update', [\App\Http\Controllers\Admin\DashboardController::class, 'updateCustomerRole'])
//     ->name('admin.role.update');


Route::get('/services', [\App\Http\Controllers\Public\ServicesController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [\App\Http\Controllers\Public\ServicesController::class, 'show'])->name('services.show');

// Auth routes (already in `auth.php`) 
Route::middleware(['auth', 'redirect.role'])->get('/dashboard', fn() => null)->name('dashboard');

// ---------------------------
// Customer Routes
// ---------------------------

Route::middleware(['auth', 'verified', 'role:customer'])->group(function () {
    // Route::get('/dashboard', [\App\Http\Controllers\Customer\DashboardController::class, 'index'])->name('customer.dashboard');

    // Route::get('/services', [\App\Http\Controllers\Customer\ConnectionController::class, 'services'])->name('customer.services');
    Route::get('/billing', [\App\Http\Controllers\Customer\BillingController::class, 'index'])->name('customer.billing');
    // support is in-app chat with vendors
    Route::get('/support', [\App\Http\Controllers\Customer\SupportTicketController::class, 'index'])->name('customer.support');
    Route::post('/support', [\App\Http\Controllers\Customer\SupportTicketController::class, 'store']);
    // Route::get('/connection-status', [\App\Http\Controllers\Customer\ConnectionController::class, 'status'])->name('customer.connection.status');

    // previous and current subscriptions management 
    Route::get('/subscription', [\App\Http\Controllers\Customer\SubscriptionController::class, 'index']);
    Route::post('/transaction', [\App\Http\Controllers\Customer\SubscriptionController::class, 'store'])->name('transaction.store');

    // Route::post('/Request', [\App\Http\Controllers\Customer\ProfileController::class, 'VendorRequest'])->name('customer.request');
    // Route::get('/profile', [\App\Http\Controllers\Customer\ProfileController::class, 'index'])->name('customer.profile');
});

// ---------------------------
// Vendor Routes
// ---------------------------
Route::middleware(['auth', 'verified', 'role:vendor'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Vendor\DashboardController::class, 'index'])->name('vendor.dashboard');
    Route::resource('/submission', \App\Http\Controllers\Vendor\SubmissionController::class)->only(['index', 'store', 'edit', 'update']);
    Route::get('/assigned-connections', [\App\Http\Controllers\Vendor\InstallationRequestController::class, 'index'])->name('vendor.assigned');
    Route::get('/installation-requests', [\App\Http\Controllers\Vendor\InstallationRequestController::class, 'requests'])->name('vendor.installation');
    Route::get('/support', [\App\Http\Controllers\Vendor\SupportTicketController::class, 'index'])->name('vendor.support');
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
    Route::resource('/plans', \App\Http\Controllers\Admin\PlanManagementController::class)->except(['edit', 'create']);
    Route::resource('/billing', \App\Http\Controllers\Admin\BillingManagementController::class)->only(['index', 'update']);
    Route::resource('/support', \App\Http\Controllers\Admin\SupportManagementController::class)->only(['index']);

    Route::get('/cms', [\App\Http\Controllers\Admin\CmsController::class, 'edit'])->name('admin.cms.edit');
    Route::post('/cms/post', [\App\Http\Controllers\Admin\CmsController::class, 'update'])->name('admin.cms.update');

    Route::get('/analytics', [\App\Http\Controllers\Admin\AnalyticsController::class, 'index'])->name('admin.analytics');
});
