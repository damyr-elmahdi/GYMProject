<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class FavoriteExerciseController extends Controller
{
    public function toggleFavorite(Request $request, $id)
    {
        $user = $request->user();
        $exercise = Exercise::findOrFail($id);
        
        // Check if the exercise is already favorited
        if ($user->favoriteExercises()->where('exercise_id', $id)->exists()) {
            $user->favoriteExercises()->detach($id);
            return response()->json([
                'message' => 'Exercise removed from favorites',
                'isFavorite' => false
            ]);
        } else {
            $user->favoriteExercises()->attach($id);
            return response()->json([
                'message' => 'Exercise added to favorites',
                'isFavorite' => true
            ]);
        }
    }
    
    public function getFavorites(Request $request)
    {
        $user = $request->user();
        $favorites = $user->favoriteExercises;
        
        return response()->json($favorites);
    }
}