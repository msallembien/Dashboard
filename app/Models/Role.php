<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function applications(): BelongsToMany
    {
        return $this->belongsToMany(
            Application::class,
            'application_roles'
        );
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(
            Permission::class,
            'role_permissions'
        );
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}