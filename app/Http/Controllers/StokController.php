<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mobil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StokController extends Controller
{

    public function datastok()
    {
        $mobils = Mobil::get();

        $groupedMobils = $mobils
            ->groupBy('nama')
            ->map(function ($group) {
                return $group->groupBy('tahun')->map(function ($subGroup) {
                    $firstMobil = $subGroup->first();

                    return [
                        'id' => $firstMobil ? $firstMobil->id : null,
                        'nama' => $firstMobil ? $firstMobil->nama : null,
                        'tahun' => $firstMobil ? $firstMobil->tahun : null,
                        'stok' => $subGroup->sum('stok'),
                        'kategori' => $firstMobil ? $firstMobil->kategori : null,
                        'brand' => $firstMobil ? $firstMobil->brand : null,
                        // Add other fields you want to include in the result
                    ];
                });
            });

        return response()->json($groupedMobils->values());
    }


}
