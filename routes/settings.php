<?php

use App\Http\Controllers\Settings\CardController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile')->name('profile.show');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    // Route::middleware(['auth', 'verified', 'role:customer'])->get('settings/card', [CardController::class, 'edit'])->name('card.edit');

    // Route::middleware(['auth', 'verified', 'role:customer'])->post('settings/card', [CardController::class, 'store'])->name('card.store');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});
