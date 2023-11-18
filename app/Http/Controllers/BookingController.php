<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Image;
use App\Models\Mobil;
use App\Models\Booking;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function create()
    {
        $mobils = Mobil::with('images')->get();

        return Inertia::render('User/Booking', [
            'user' => Auth::user(),
            'mobils' => $mobils, // Pass the mobils data to the Booking component
        ]);
    }



    public function datamobil1($id)
    {
        $mobils = Mobil::find($id);

       return response()->json($mobils);
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
        'tanggal' => 'required|date',
    ]);

    // Generate ID unik berdasarkan timestamp dan beberapa karakter acak
//    $codeawal = 'kd_';
   $dates = 'd-m-y';
   $waktu = date($dates);
   $randomInteger = random_int(100000, 999999);
    $uniqueId = $randomInteger;
    // .'@'.$waktu

    // Simpan data pemesanan ke dalam database
    Booking::create([
        'id' => $uniqueId,
        'namaPemesan' => $request->namaPemesan,
        'email' => $request->email,
        'nomorHape' => $request->nomorHape,
        'kodeMobil' => $request->kodeMobil,
        'message' => $request->message,
        'tanggal' => $request->tanggal, // Set 'tanggal' to the current date in 'YYYY-MM-DD' format
    ]);

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


    public function tampilanriwayat()
    {
        $userEmail = auth()->user()->email;
        $bookings = Booking::where('email', $userEmail)->get();
        return Inertia::render('User/riwayat', [
            'bookings' => $bookings,
        ]);
    }

}
