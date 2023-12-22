<?php

use App\Http\Controllers\StokController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MobilController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\PembelianController;
use App\Http\Controllers\PenjualanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [


    ]);
});
// // role admin
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->name('dashboard');

Route::get('/datamobil1', [MobilController::class,'index'])->name('datamobillengkap');



// Role admin
Route::group(['middleware' => ['role:admin,manager,sales']], function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/AdminDashboard');
    })->name('admin.dashboard');
    Route::get('/admin/datapengguna', [AdminController::class, 'dataPengguna'])->name('datapengguna');
    Route::get('/admin/datamobil', [MobilController::class, 'datamobil'])->name('datamobil');
    Route::get('/admin/datastok', [StokController::class, 'datastok'])->name('datastok');
    Route::get('/admin/mobil/tambahmobil', [MobilController::class, 'create'])->name('mobil.create');
    // Route::post('/mobil', [MobilController::class, 'store'])->name('mobil.store');
    Route::put('/change-role/{userId}', [AdminController::class, 'changeRole'])->name('change-role');
    Route::get('/admin/databooking', [BookingController::class, 'index'])->name('databooking');
    Route::delete('/admin/databooking/hapus/${id}', [BookingController::class, 'destroy'])->name('booking.delete');
    Route::post('/admin/mobil', [MobilController::class, 'store'])->name('mobil.store');
    Route::get('/admin/datapegawai', [KaryawanController::class, 'index'])->name('datapegawai');
    // Route::get('/admin/datapegawai/tambah', [KaryawanController::class, 'create'])->name('tambahdatapegawai');

    Route::post('/admin/datapegawai', [KaryawanController::class, 'store'])->name('tambahdatapegawai');
    Route::post('/admin/datapenjualan/tambah', [PenjualanController::class, 'create'])->name('tambahdatapenjualan');

    Route::get('/admin/datapenjualan', [PenjualanController::class, 'index'])->name('datapenjualan');
    Route::post('/admin/belimobil', [PembelianController::class, 'store'])->name('belimobil');
    Route::get('/admin/datapembelian', [PembelianController::class, 'index'])->name('datapembelian');
    Route::get('/admin/datamobil/{id}/edit', [MobilController::class, 'edit'])->name('mobil.edit');
    Route::put('admin/datamobil/{id}', [MobilController::class, 'update'])->name('mobil.update');
    Route::delete('admin/datamobil/{id}', [MobilController::class, 'destroy'])->name('mobil.delete');
});





// role user
Route::middleware(['role:user'])->group(function () {

    Route::get('/testing', function () {
        return Inertia::render('testing');
    })->name('testing');
    // Route::get('/datamobil1', [MobilController::class,'index'])->name('datamobillengkap');
    Route::get('/riwayat_booking', [BookingController::class,'tampilanriwayat'])->name('bookings');
    Route::get('/booking', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
    // Rute profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/mobil/{id}',[MobilController::class,'show'])->name('detailmobil');
});

require __DIR__.'/auth.php';
