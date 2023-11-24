<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{

    public $incrementing = false;

    protected $fillable =['id','namaPemesan','email','nomorHape','kodeMobil','message','tanggal','waktu'];


    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'kodeMobil', 'id', 'nama'  ); // Mobil::class adalah model mobil
    }

    public function penjualan()
    {
        return $this->hasOne(Penjualan::class);
    }
}
