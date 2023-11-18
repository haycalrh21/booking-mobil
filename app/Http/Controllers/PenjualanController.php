<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Booking;
use App\Models\Penjualan;
use Illuminate\Http\Request;

class PenjualanController extends Controller
{
    public function index(){
        $penjualan = Penjualan::all();
        return response()->json($penjualan);
    }


    public function create(Request $request)
    {
        info('Request received:', $request->all());

        $penjualan = new Penjualan([
            'booking_id' => $request->input('bookingId'),
            'namaPemesan' => $request->input('namaPemesan'),
            'email' => $request->input('email'),
            'nomorHape' => $request->input('nomorHape'),
            'kodeMobil' => $request->input('kodeMobil'),
            'message' => $request->input('message'),
            'tanggal' => $request->input('tanggal'),
        ]);

        info('Penjualan data:', $penjualan->toArray());

        try {
            // Simpan data ke dalam database
            $penjualan->save();

            info('Penjualan saved successfully.');

            // Tambahkan respons yang sesuai, misalnya:
            return response()->json(['message' => 'Penjualan berhasil disimpan'], 200);
        } catch (\Exception $e) {
            // Log atau tangani pengecualian


            // Tambahkan respons yang sesuai untuk menanggapi kesalahan
            return response()->json(['message' => 'Terjadi kesalahan saat menyimpan data'], 500);
        }
    }

}
