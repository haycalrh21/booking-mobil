<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'id' => $this->generateUniqueId(), // Menggunakan generateUniqueId() untuk membuat ID acak
            'name' => 'Admin Name',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Gantilah 'password' dengan kata sandi yang sesuai
            'role' => 'admin', // Sesuaikan peran dengan 'admin'
        ]);
    }

    protected function generateUniqueId()
    {
        do {
            $uniqueId = Str::random(15);
        } while (User::where('id', $uniqueId)->exists());

        return $uniqueId;
    }
}
