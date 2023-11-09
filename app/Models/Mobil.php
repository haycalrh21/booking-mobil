<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mobil extends Model
{
    use HasFactory;

    protected $table = 'mobils'; // Sesuaikan dengan nama tabel di database

    protected $fillable = ['nama', 'brand', 'harga', 'tahun', 'pajak', 'deskripsi','kategori','image'];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'mobil_id', 'id');
    }
}
