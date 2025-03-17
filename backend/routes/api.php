<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Admin routes
Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    
});

// Client routes
Route::prefix('client')->middleware(['auth:sanctum', 'role:client'])->group(function () {
    Route::get('/dashboard', [ClientController::class, 'dashboard']);
    
});

// routes/api.php
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return response()->json([
            'message' => 'Admin dashboard data',
            'data' => [
                'totalUsers' => \App\Models\User::count(),
                'newPosts' => \App\Models\Post::where('created_at', '>=', now()->subDays(7))->count(),
                'activeSessions' => \Illuminate\Support\Facades\DB::table('sessions')->where('last_activity', '>=', now()->subMinutes(15)->getTimestamp())->count(),
            ]
        ]);
    });
});

Route::middleware(['auth:sanctum', 'role:client'])->group(function () {
    Route::get('/client/dashboard', function () {
        $user = request()->user();
        return response()->json([
            'message' => 'Client dashboard data',
            'data' => [
                'yourPosts' => \App\Models\Post::where('user_id', $user->id)->count(),
                'notifications' => 5, // You would fetch actual notifications here
                'messages' => 8, // You would fetch actual messages here
            ]
        ]);
    });
});