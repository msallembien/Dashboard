<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationAdminController extends Controller
{
    public function index(): Response
    {
        $applications = Application::query()
            ->with('roles')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/applications/index', [
            'applications' => $applications,
        ]);
    }

    public function create(): Response
    {
        $categories = $this->getCategories();

        return Inertia::render('admin/applications/create', [
            'roles' => Role::query()
                ->orderBy('name')
                ->get(),
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateApplication($request);

        $iconPath = null;

        if ($request->hasFile('icon')) {
            $iconPath = $request->file('icon')->store(
                'applications',
                'public'
            );
        }

        $application = Application::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'url' => $validated['url'] ?? null,
            'icon' => $iconPath,
            'color' => $validated['color'] ?? null,
            'category' => $validated['category'] ?? null,
            'is_internal' => $validated['is_internal'] ?? false,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $application->roles()->sync($validated['roles'] ?? []);

        return redirect()
            ->route('admin.applications.index')
            ->with('success', 'Application créée avec succès.');
    }

    public function edit(Application $application): Response
    {
        return Inertia::render('admin/applications/edit', [
            'application' => $application->load('roles'),
            'roles' => Role::query()
                ->orderBy('name')
                ->get(),
            'categories' => $this->getCategories(),
        ]);
    }

    public function update(
        Request $request,
        Application $application
    ): RedirectResponse {
        $validated = $this->validateApplication($request);

        if ($request->hasFile('icon')) {
            if ($application->icon) {
                Storage::disk('public')->delete($application->icon);
            }

            $application->icon = $request->file('icon')->store(
                'applications',
                'public'
            );
        }

        $application->name = $validated['name'];
        $application->description = $validated['description'] ?? null;
        $application->url = $validated['url'] ?? null;
        $application->color = $validated['color'] ?? null;
        $application->category = $validated['category'] ?? null;
        $application->is_internal = $validated['is_internal'] ?? false;
        $application->is_active = $validated['is_active'] ?? true;

        $application->save();

        $application->roles()->sync($validated['roles'] ?? []);

        return redirect()
            ->route('admin.applications.index')
            ->with('success', 'Application modifiée avec succès.');
    }

    public function destroy(Application $application): RedirectResponse
    {
        if ($application->icon) {
            Storage::disk('public')->delete($application->icon);
        }

        $application->roles()->detach();

        $application->favorites()->delete();

        $application->delete();

        return redirect()
            ->route('admin.applications.index')
            ->with('success', 'Application supprimée avec succès.');
    }

    private function validateApplication(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'url' => ['nullable', 'string', 'max:500'],
            'icon' => ['nullable', 'image', 'max:2048'],
            'color' => ['nullable', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'category' => ['nullable', 'string', 'max:100'],
            'is_internal' => ['boolean'],
            'is_active' => ['boolean'],
            'roles' => ['array'],
            'roles.*' => ['integer', 'exists:roles,id'],
        ]);
    }

    private function getCategories()
    {
        return Application::query()
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->values();
    }
}