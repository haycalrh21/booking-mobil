<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mobil;
use Illuminate\Http\Request;


class MobilController extends Controller
{


    public function index()
    {
        $mobils = Mobil::with('images')
            ->where('stok', '>', 0)
            ->get();

        return Inertia::render('index/mobil1', ['mobils' => $mobils]);
    }


    public function datastok()
    {
        $mobils = Mobil::with('images')->get();
        return response()->json($mobils);
    }




//     public function mergeStock()
//     {
//         // Fetch all data from the Mobil model
//         $mobils = Mobil::all();

//         // Group the data by name and calculate the total stock for each name
//         $mergedData = $mobils->groupBy('nama')->map(function ($group) {
//             return [
//                 'nama' => $group->first()->nama,
//                 'total_stok' => $group->sum('stok'),
//             ];
//         })->values();

//         return response()->json(['mergedData' => $mergedData]);
//     }
// }
    public function datamobil()
    {
        $mobils = Mobil::with('images')->get();


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
        $request->validate([
            'nama' => 'required',
            'brand' => 'required',
            'harga' => 'required',
            'stok' => 'required',
            'tahun' => 'required',
            'pajak' => 'required',
            'deskripsi' => 'required',
            'kategori' => 'required',
            'images.*' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        if ($request->hasFile('images')) {
            $mobil = new Mobil([
                'nama' => $request['nama'],
                'brand' => $request['brand'],
                'harga' => $request['harga'],
                'tahun' => $request['tahun'],
                'stok' => $request['stok'],
                'pajak' => $request['pajak'],
                'deskripsi' => $request['deskripsi'],
                'kategori' => $request['kategori'],
            ]);

            $mobil->save();

            $imagePaths = [];

            foreach ($request->file('images') as $index => $image) {
                $imagePath = $image->store('product', 'public');
                $imagePaths[] = ['path' => $imagePath];
            }

            $mobil->images()->createMany($imagePaths);

            return Inertia::location(route('admin.dashboard'));
        } else {
            return back()->withInput()->withErrors(['images' => 'Gambar diperlukan.']);
        }
    }






protected function generateUniqueId()
{
    do {
        $uniqueId = strval(random_int(100000, 999999));
    } while (Mobil::where('id', $uniqueId)->exists());

    return $uniqueId;
}






    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $mobil = Mobil::findOrFail($id); // Assuming your Eloquent model is named Mobil
        $mobil = Mobil::find($id);
        $images = $mobil->images;
        return Inertia::render('User/DetailMobil', ['mobil' => $mobil]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $mobil = Mobil::findOrFail($id);

        return Inertia::render('Admin/Editmobil', [
            'mobil' => $mobil,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $mobil = Mobil::findOrFail($id);

        $request->validate([
            'nama' => 'required|string',
            'brand' => 'required|string',
            'harga' => 'required',
            'tahun' => 'required',
            'stok' => 'required',
            'pajak' => 'required',
            'deskripsi' => 'required',
            'kategori' => 'required',
            'images.*' => 'image|mimes:png,jpg,jpeg|max:2048',
        ]);

        // Handle gambar jika ada yang diunggah
        if ($request->hasFile('images')) {
            $imagePaths = [];

            foreach ($request->file('images') as $index => $image) {
                $imagePath = $image->store('product', 'public');
                $imagePaths[] = ['path' => $imagePath];
            }

            // Log untuk memastikan bahwa gambar benar-benar terkirim


            // Hapus gambar lama setelah gambar baru terunggah dan diverifikasi
            $mobil->images()->delete();

            // Tambahkan gambar baru
            $mobil->images()->createMany($imagePaths);
        }

        // Selain itu, update data mobil yang lain
        $mobil->update([
            'nama' => $request['nama'],
            'brand' => $request['brand'],
            'harga' => $request['harga'],
            'tahun' => $request['tahun'],
            'stok' => $request['stok'],
            'pajak' => $request['pajak'],
            'deskripsi' => $request['deskripsi'],
            'kategori' => $request['kategori'],
        ]);

        return redirect()->route('admin.dashboard')->with('success', 'Data mobil berhasil diperbarui.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Lakukan operasi penghapusan data berdasarkan ID
        // Contoh:
        $mobil = Mobil::find($id);

        if (!$mobil) {
            // Handle jika data tidak ditemukan
            return redirect()->back()->with('error', 'Data not found.');
        }

        $mobil->delete();

        // Redirect atau kirim respons sesuai kebutuhan aplikasi Anda
        return redirect()->back()->with('success', 'Data deleted successfully.');
    }


}
