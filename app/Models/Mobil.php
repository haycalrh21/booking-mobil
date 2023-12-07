<?php

namespace App\Models;


use App\Models\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mobil extends Model
{
    use HasFactory;

    protected $fillable = [
        // your other fields
        'id','nama', 'brand', 'harga', 'tahun', 'stok', 'pajak', 'deskripsi', 'kategori',
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}


