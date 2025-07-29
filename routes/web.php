<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
// // 📦 Plans
// Route::get('/plans', [PlanController::class, 'index']);
// Route::get('/plans/{id}', [PlanController::class, 'show']);

// // 🌐 Connection Requests
// Route::post('/connection-request', [ConnectionRequestController::class, 'store']);

// // 💰 Billing
// Route::get('/billing', [BillingController::class, 'index']);
// Route::get('/billing/{id}', [BillingController::class, 'show']);
// Route::post('/payment/verify', [PaymentController::class, 'verify']);

// // 🧾 Support
// Route::post('/support', [SupportTicketController::class, 'store']);
// Route::get('/support', [SupportTicketController::class, 'index']);
// });

// Public CMS Route
// Route::get('/cms/{section}', [CMSController::class, 'show']);

// // 🛠️ Admin Routes
// Route::middleware(['auth', 'verified', 'isAdmin'])->prefix('admin')->group(function () {
//     // Route::get('/dashboard', [DashboardController::class, 'index']);

//     // Route::resource('/users', UserManagementController::class)->only(['index', 'show', 'update', 'destroy']);
//     // Route::resource('/plans', PlanManagementController::class)->except(['edit', 'create']);
//     // Route::resource('/connection-requests', ConnectionRequestAdminController::class)->only(['index', 'update']);
//     // Route::resource('/billing', BillingAdminController::class)->only(['index', 'update']);
//     // Route::resource('/support', SupportAdminController::class)->only(['index']);
//     Route::get('/cms', [CMSAdminController::class, 'index']);
//     Route::put('/cms/{section}', [CMSAdminController::class, 'update']);
// });

//cms 
// content managment system
// 



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
