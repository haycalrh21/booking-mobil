<?php

namespace Database\Seeders;
use App\Models\Mobil;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class MobilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 1; $i <= 25; $i++) {
            DB::table('mobils')->insert([
                'id' => $this->generateUniqueId(),
                'nama' => $faker->word,
                'brand' => $faker->company,
                'harga' => $faker->randomFloat(2, 5000, 50000),
                'kategori' => $faker->randomElement(['Sedan', 'SUV', 'Coupe', 'Pick-up', 'Sport', 'Listrik', 'Keluarga', 'Klasik', 'Off-road']),
                'tahun' => $faker->numberBetween(1990, 2022),
                'pajak' => $faker->randomElement(['Hidup', 'Mati']),
                'deskripsi' => $faker->paragraph,
                'image' => 'sample.jpg', // Replace with the actual image file name
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    }}
    protected function generateUniqueId()
    {
        do {
            $uniqueId = Str::random(15);
        } while (Mobil::where('id', $uniqueId)->exists());

        return $uniqueId;
    }
}
