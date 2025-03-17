<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        if (empty($roles) || in_array($request->user()->role, $roles)) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized. Insufficient permissions.'], 403);
    }
}