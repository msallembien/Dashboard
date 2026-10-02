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
        'icon',
        'category',
        'internal',
        'active',
    ];

    protected $casts = [
        'internal' => 'boolean',
        'active' => 'boolean',
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