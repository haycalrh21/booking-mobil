<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mobil;

class StokController extends Controller
{

    public function datastok()
    {
        $mobils = Mobil::with('images')->get();

        // Group the collection by 'name' and sum the 'stok' values within each group
        $groupedMobils = $mobils->groupBy('nama')->map(function ($group) {
            return [
                'id' => $group->first()->id,
                'nama' => $group->first()->nama,
                'stok' => $group->sum('stok'),
                'images' => $group->pluck('images')->flatten(),
                'kategori' => $group->first()->kategori,
                'brand' => $group->first()->brand,
                // Add other fields you want to include in the result
            ];
        });

        return response()->json($groupedMobils->values());
    }

}
