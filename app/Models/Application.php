<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }
}