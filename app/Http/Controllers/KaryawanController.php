<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Mobil;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class KaryawanController extends Controller
{
    public function index()
    {    $karyawans = User::whereIn('role', ['admin', 'sales', 'manager'])->get();
        return response()->json($karyawans);
    }

    public function generateUniqueId()
    {
        do {
            $uniqueId = Str::random(15);
        } while (User::where('id', $uniqueId)->exists());

        return $uniqueId;
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'role' => 'required|string',
        'email' => 'required|unique:karyawans,email',
        'password' => 'required|string',

    ]);

    $uniqueId = $this->generateUniqueId();

    $user = new User([
        'id' =>  $uniqueId,
        'name' => $request->name,
        'role' => $request->role,
        'email' => $request->email,
        'password' => Hash::make($request->password), // bcrypt the password
    ]);

    $user->save();

    return redirect()->route('admin.dashboard')->with('success', 'Karyawan berhasil ditambahkan.');
}
}
