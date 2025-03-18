<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ExerciseController extends Controller
{
    public function index()
    {
        $exercises = Exercise::all();
        return response()->json($exercises);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'urlVido' => 'nullable|string|max:255',
            'niveauDifficult' => 'required|string|max:255',
            'partieCorps' => 'required|string|max:255',
            'partieCorpsPic' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $exercise = new Exercise();
            $exercise->nom = $request->nom;
            $exercise->description = $request->description;
            $exercise->urlVido = $request->urlVido;
            $exercise->niveauDifficult = $request->niveauDifficult;
            $exercise->partieCorps = $request->partieCorps;

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('exercise_images', 'public');
                $exercise->image = $path;
            }

            if ($request->hasFile('partieCorpsPic')) {
                $path = $request->file('partieCorpsPic')->store('body_part_images', 'public');
                $exercise->partieCorpsPic = $path;
            }

            $exercise->save();

            return response()->json([
                'message' => 'Exercise created successfully',
                'exercise' => $exercise
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating exercise: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create exercise',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $exercise = Exercise::where('idExercice', $id)->firstOrFail();
            return response()->json($exercise);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Exercise not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $exercise = Exercise::where('idExercice', $id)->firstOrFail();
            
            $request->validate([
                'nom' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'urlVido' => 'nullable|string|max:255',
                'niveauDifficult' => 'required|string|max:255',
                'partieCorps' => 'required|string|max:255',
                'partieCorpsPic' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $exercise->nom = $request->nom;
            $exercise->description = $request->description;
            $exercise->urlVido = $request->urlVido;
            $exercise->niveauDifficult = $request->niveauDifficult;
            $exercise->partieCorps = $request->partieCorps;

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($exercise->image) {
                    Storage::disk('public')->delete($exercise->image);
                }
                $path = $request->file('image')->store('exercise_images', 'public');
                $exercise->image = $path;
            }

            if ($request->hasFile('partieCorpsPic')) {
                // Delete old image if exists
                if ($exercise->partieCorpsPic) {
                    Storage::disk('public')->delete($exercise->partieCorpsPic);
                }
                $path = $request->file('partieCorpsPic')->store('body_part_images', 'public');
                $exercise->partieCorpsPic = $path;
            }

            $exercise->save();

            return response()->json([
                'message' => 'Exercise updated successfully',
                'exercise' => $exercise
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating exercise: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update exercise',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $exercise = Exercise::where('idExercice', $id)->firstOrFail();
            
            // Delete associated files
            if ($exercise->image) {
                Storage::disk('public')->delete($exercise->image);
            }
            
            if ($exercise->partieCorpsPic) {
                Storage::disk('public')->delete($exercise->partieCorpsPic);
            }
            
            $exercise->delete();
            
            return response()->json([
                'message' => 'Exercise deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting exercise: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete exercise',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}