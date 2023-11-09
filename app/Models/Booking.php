<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'bookings'; // Sesuaikan dengan nama tabel di database

    protected $fillable = ['user_id', 'mobil_id', 'waktu_pemesanan', 'metode_pembayaran'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'mobil_id', 'id');
    }
}
