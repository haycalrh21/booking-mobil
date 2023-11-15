<?php

namespace App\Models;

use App\Models\Mobil;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model
{
    use HasFactory;

    protected $table = 'mobil_images';

    protected $fillable = ['path'];

    public function mobil()
    {
        return $this->belongsTo(Mobil::class);
    }
}

