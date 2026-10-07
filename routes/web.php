<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Admin\ApplicationAdminController;

Route::middleware(['auth'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/applications', [ApplicationController::class, 'index'])
    ->name('applications');
    Route::get('/admin/applications', [ApplicationAdminController::class, 'index'])
        ->name('admin.applications.index');

    Route::get('/admin/applications/create', [ApplicationAdminController::class, 'create'])
        ->name('admin.applications.create');

    Route::post('/admin/applications', [ApplicationAdminController::class, 'store'])
        ->name('admin.applications.store');

    Route::get('/admin/applications/{application}/edit', [ApplicationAdminController::class, 'edit'])
        ->name('admin.applications.edit');

    Route::put('/admin/applications/{application}', [ApplicationAdminController::class, 'update'])
        ->name('admin.applications.update');

    Route::delete('/admin/applications/{application}', [ApplicationAdminController::class, 'destroy'])
        ->name('admin.applications.destroy');
});

require __DIR__.'/settings.php';