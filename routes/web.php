<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
Route::middleware(['auth'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/applications', [ApplicationController::class, 'index'])
    ->name('applications');
});

require __DIR__.'/settings.php';