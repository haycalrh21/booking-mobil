<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Karyawan extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nama', 'jabatan', 'nohp', 'alamat', 'tanggal_lahir', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $attributes = [
        'password' => '', // Set default value to empty string
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
