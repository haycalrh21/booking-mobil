<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembelian extends Model
{
    protected $fillable = [
        'namaPembeli',
        'noHp',
        'namaMobil',
        'brand',
        'harga',
        'tahun',
        'pajak',
        'kategori',
    ];
}
