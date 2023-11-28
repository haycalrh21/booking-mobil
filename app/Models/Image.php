<?php

namespace App\Models;

use App\Models\Mobil;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;



class Image extends Model
{
    use HasFactory;

    protected $table = 'mobil_images';

    protected $fillable = ['path'];

    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'mobil_id');
    }

    public function kodeMobil()
    {
        return $this->hasOneThrough(
            KodeMobil::class, // Gantilah ini dengan model yang sesuai
            Mobil::class,
            'id', // Kolom kunci primer di tabel KodeMobil
            'mobil_id', // Kolom kunci asing di tabel Mobil
            'mobil_id', // Kolom kunci primer di tabel MobilImage
            'kode_mobil' // Kolom kunci asing di tabel KodeMobil
        );
    }
}

