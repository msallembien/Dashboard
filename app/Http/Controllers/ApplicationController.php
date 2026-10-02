<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $applications = Application::query()
            ->whereHas('roles', function ($query) use ($user) {
                $query->where('roles.id', $user->role_id);
            })
            ->with([
                'favorites' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
            ])
            ->orderBy('name')
            ->get();

        return Inertia::render('applications', [
            'applications' => $applications,
        ]);
    }
}