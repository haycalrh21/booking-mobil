<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Karyawan extends Model
{

    protected $table = 'karyawans';
    protected $fillable = [
        // your other fields
        'nama', 'jabatan', 'nohp', 'alamat', 'tanggal_lahir',
    ];



}
