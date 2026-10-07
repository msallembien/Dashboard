<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Application extends Model
{
    protected $fillable = [
        'name',
        'description',
        'url',
        'color',
        'icon',
        'category',
        'is_internal',
        'is_active',
    ];

    protected $casts = [
        'is_internal' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(
            Role::class,
            'application_roles'
        );
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }
}