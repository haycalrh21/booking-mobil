<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // public function dashboard()
    // {
    //     return Inertia::render('Admin/AdminDashboard');
    // }
    // ini kalo mau pake controller di admindashboard ubah web.php nya biar rendering lewat controller


    public function dataPengguna()
    {
        // $users = User::where('role', 'user')->get();
    $users= User::all();
    return response()->json($users);


    }


    public function changeRole(Request $request, $userId)
{
    // Validasi permintaan, misalnya, pastikan rolenya adalah "Admin" atau "User".
    $validatedData = $request->validate([
        'newRole' => 'required|in:admin,user,manager,supervisor',
    ]);

    // Temukan pengguna berdasarkan ID.
    $user = User::find($userId);

    if (!$user) {
        return response()->json(['message' => 'Pengguna tidak ditemukan'], 404);
    }

    // Simpan perubahan role ke database.
    $user->role = $validatedData['newRole'];
    $user->save();
    return Inertia::location(route('datapengguna'));
    // return response()->json(['message' => 'Role pengguna berhasil diperbarui']);
}
}
