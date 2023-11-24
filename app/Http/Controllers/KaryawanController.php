<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Mobil;
use App\Models\Karyawan;
use Illuminate\Http\Request;

class KaryawanController extends Controller
{
    public function index(){
        $karyawans = Karyawan::all();
        return response()->json($karyawans);
    }

    public function store(Request $request)
{
    $request->validate([
        'nama' => 'required|string',
        'jabatan' => 'required|string',
        'nohp' => 'required|string',
        'alamat' => 'required|string',
        'email' => 'required|unique:karyawans,email',
        'password' => 'required|string',
        'tanggal_lahir' => 'required|date',
    ]);

    Karyawan::create([
        'nama' => $request->nama,
        'jabatan' => $request->jabatan,
        'nohp' => $request->nohp,
        'email' => $request->email,
        'password' => Hash::make($request->password), // bcrypt the password
        'alamat' => $request->alamat,
        'tanggal_lahir' => $request->tanggal_lahir,
    ]);

    return redirect()->route('admin.dashboard')->with('success', 'Karyawan berhasil ditambahkan.');
}
}
