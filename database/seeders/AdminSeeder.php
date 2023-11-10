<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin Name',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Gantilah 'password' dengan kata sandi yang sesuai
            'role' => 'admin', // Sesuaikan peran dengan 'admin'
        ]);
    }
}
