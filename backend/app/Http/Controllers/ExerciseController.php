<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
    }

    public function show($id)
    {
        $exercise = Exercise::findOrFail($id);
        return response()->json($exercise);
    }

    public function update(Request $request, $id)
    {
        $exercise = Exercise::findOrFail($id);
        
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
            if ($exercise->image) {
                Storage::disk('public')->delete($exercise->image);
            }
            $path = $request->file('image')->store('exercise_images', 'public');
            $exercise->image = $path;
        }

        if ($request->hasFile('partieCorpsPic')) {
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
    }

    public function destroy($id)
    {
        $exercise = Exercise::findOrFail($id);
        
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
    }
}