<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $announcements = Announcement::query()
            ->where(function ($query) {
                $query->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            })
            ->latest('published_at')
            ->get();

        $favorites = Favorite::query()
            ->where('user_id', $user->id)
            ->with('application')
            ->get()
            ->pluck('application')
            ->values();

        return Inertia::render('dashboard', [
            'announcements' => $announcements,
            'favorites' => $favorites,
        ]);
    }
}