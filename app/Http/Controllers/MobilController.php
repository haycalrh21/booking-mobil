<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mobil;
use Illuminate\Http\Request;

class MobilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mobils = Mobil::all();
        return Inertia::render('index/mobil1', [
            'mobils' => $mobils,
        ]);
    }



    public function datamobil()
    {
        $mobils = Mobil::all();

       return response()->json($mobils);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia::render('Mobil/TambahMobil');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data form jika diperlukan
        $request->validate([
            'nama' => 'required',
            'brand' => 'required',
            'harga' => 'required',
            'tahun' => 'required',
            'pajak' => 'required',
            'deskripsi' => 'required',
            'kategori' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($request->hasFile('image')) {
            // Proses penyimpanan gambar dan data mobil
        } else {
            return back()->withInput()->withErrors(['image' => 'Gambar diperlukan.']);
        }

        $imagePath = $request->file('image')->store('product', 'public');
        // Simpan data mobil baru ke dalam database
        $mobil = new Mobil([
            'nama' => $request['nama'],
            'brand' => $request['brand'],
            'harga' => $request['harga'],
            'tahun' => $request['tahun'],
            'pajak' => $request['pajak'],
            'deskripsi' => $request['deskripsi'],
            'kategori' => $request['kategori'],
            'image' => $imagePath,
        ]);

        $mobil->save();

        return Inertia::location(route('admin.dashboard'));
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
