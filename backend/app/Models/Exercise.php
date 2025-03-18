<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'image',
        'urlVido',
        'niveauDifficult',
        'partieCorps',
        'partieCorpsPic',
    ];

    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorite_exercises', 'exercise_id', 'user_id')
            ->withTimestamps();
    }
}