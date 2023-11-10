<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function create()
    {
        // Menampilkan formulir pemesanan menggunakan Inertia.js
        return Inertia::render('User/Booking', [
            'user' => Auth::user(), // Mengambil data pengguna yang sedang login
        ]);
    }

    public function store(Request $request)
    {
        // Validasi data yang dikirimkan oleh formulir
        $request->validate([
            'namaPemesan' => 'required',
            'email' => 'required|email',
            'nomorHape' => 'required',
            'kodeMobil' => 'required',
            'message' => 'required',
            'tanggal' => 'required',

        ]);

        // Simpan data pemesanan ke dalam database
        Booking::create($request->all());

        // Redirect ke halaman yang sesuai setelah penyimpanan sukses
        return Inertia::location(route('datamobillengkap'));

    }

    public function index()
    {
        $bookings = Booking::all(); // Mengambil semua data booking dari tabel

        // return inertia('Admin/DataBooking', compact('bookings'));
       return response()->json($bookings);
       // Mengirim data booking ke tampilan
    }

}
