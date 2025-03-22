<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SpecificAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Create the first admin
        User::updateOrCreate(
            ['email' => 'MohmmedElmahdi@gmail.com'],
            [
                'name' => 'Mohammed Elmahdi',
                'password' => Hash::make('AdminMohmmed'),
                'role' => 'admin',
            ]
        );

        // Create the second admin
        User::updateOrCreate(
            ['email' => 'ElmahdiDamyr@gmail.com'],
            [
                'name' => 'Elmahdi Damyr',
                'password' => Hash::make('AdminElmahdi'),
                'role' => 'admin',
            ]
        );
    }
}