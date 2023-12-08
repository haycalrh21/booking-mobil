<?php

namespace App\Http\Controllers;

use App\Models\Pembelian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembelianController extends Controller
{


    public function index(){

        $pembelian = Pembelian::all();
        return response()->json($pembelian);

    }


    public function store(Request $request)
    {
        // Validasi data formulir jika diperlukan
        $request->validate([
            'namaPembeli' => 'required|string',
            'noHp' => 'required|string',
            'namaMobil' => 'required|string',
            'brand' => 'required|string',
            'harga' => 'required|string',
            'tahun' => 'required|string',
            'pajak' => 'required|string',
            'kategori' => 'required|string',
        ]);

        // Simpan data ke dalam database
        $pembelian = Pembelian::create($request->all());

        // Response sukses atau redirect ke halaman lain jika diperlukan
        // return response()->json(['message' => 'Pembelian mobil berhasil disimpan'], 200);
        return Inertia::location(route('admin.dashboard'));
    }
}
