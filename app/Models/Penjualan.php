<?php

// app/Models/Penjualan.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penjualan extends Model
{
    protected $table = 'penjualans';

    protected $fillable = [
        'booking_id',
        'namaPemesan',
        'email',
        'nomorHape',
        'kodeMobil',
        'message',
        'tanggal',
    ];

    // Definisikan relasi dengan model Booking jika diperlukan
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'kodeMobil');
    }
}
