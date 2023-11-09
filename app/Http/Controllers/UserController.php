<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mobil;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    //  public function show(String $id)
    //  {
    //      $mobil = Mobil::find($id); // Mengambil data mobil berdasarkan ID

    //      return Inertia::render('index/mobil', [
    //          'mobil' => $mobil, // Mengirim data mobil ke komponen React
    //      ]);
    //  }
    //  public function show()
    //  {
    //     $mobils = Mobil::all();

    //     return Inertia::render('index/mobil1', [
    //         'mobils' => $mobils,
    //     ]);
    // }
    public function show()
    {
       $mobils = Mobil::all();

       $mobils = \App\Models\Mobil::all(); // Ini adalah contoh, gantilah sesuai dengan model dan data yang sesuai.

    return response()->json($mobils);
   }






    // public function datamobil()
    // {
    //     $mobils = Mobil::all();

    //     return Inertia::render('index/mobil', [
    //         'mobils' => $mobils,
    //     ]);
    // }

//     public function show1()
//     {
//        $mobil = Mobil::all();

//        return Inertia::render('index/mobil1', [
//            'mobil' => $mobil,
//        ]);
//    }
    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */



    /**
     * Display the specified resource.
     */


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
