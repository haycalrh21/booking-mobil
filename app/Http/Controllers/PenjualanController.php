<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Mobil;
use App\Models\Booking;
use App\Models\Penjualan;
use Illuminate\Http\Request;

use function Laravel\Prompts\error;

class PenjualanController extends Controller
{
    public function index()
    {
        $penjualan = Penjualan::all();

        $formattedData = $penjualan->map(function ($item) {
            $booking = $item->booking; // Ambil relasi booking
            $mobil = $booking->mobil; // Ambil relasi mobil dari booking

            return [
                'id' => $item->id,
                'booking_id' => $item->booking_id,
                'namaPemesan' => $item->namaPemesan,
                'email' => $item->email,
                'kodeMobil' => $item->kodeMobil,
                'hargaMobil' => $mobil->harga, // Ambil harga mobil dari relasi booking->mobil
                'created_at' => $item->created_at,


            ];
        });

        return response()->json($formattedData);
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

        // Kurangi stok mobil
        $mobil = Mobil::find($request->input('kodeMobil'));

        if ($mobil) {
            $mobil->stok -= 1; // Kurangi stok satu unit
            if ($mobil->stok < 0) {
                return false;
            }

            $mobil->save();
            info('Stok mobil berhasil dikurangi.');
        } else {
            // Handle jika mobil tidak ditemukan
            info('Mobil not found.');
        }

        info('Penjualan saved successfully.');

        // Tambahkan respons yang sesuai, misalnya:
        return response()->json(['message' => 'Penjualan berhasil disimpan'], 200);
    } catch (\Exception $e) {
        // Log atau tangani pengecualian

        // Tambahkan respons yang sesuai untuk menanggapi kesalahan
        return response()->json(['message' => 'Terjadi kesalahan saat menyimpan data'], 500);
    }
}
        public function deleteDataPenjualan($id)
        {
            try {
                // Find the Penjualan record by ID
                $pesanan = Booking::find($id);

                if (!$pesanan) {
                    return response()->json(['message' => 'Penjualan not found'], 404);
                }

                // Delete the Penjualan record
                $pesanan->delete();

                return response()->json(['message' => 'Penjualan deleted successfully'], 200);
            } catch (\Exception $e) {
                // Log or handle the exception
                return response()->json(['message' => 'Error deleting Penjualan'], 500);
            }
        }


}
