<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MobilController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;

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
// role admin
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');




// Role admin
Route::group(['middleware' => ['role:admin,manager,supervisor']], function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/AdminDashboard');
    })->name('admin.dashboard');

    Route::get('/admin/datapengguna', [AdminController::class, 'dataPengguna'])->name('datapengguna');
    Route::get('/admin/datamobil', [MobilController::class, 'datamobil'])->name('datamobil');

    Route::get('/admin/mobil/tambahmobil', [MobilController::class, 'create'])->name('mobil.create');
    // Route::post('/mobil', [MobilController::class, 'store'])->name('mobil.store');
    Route::put('/change-role/{userId}', [AdminController::class, 'changeRole'])->name('change-role');
    Route::get('/admin/databooking', [BookingController::class, 'index'])->name('databooking');

    Route::post('/admin/mobil', [MobilController::class, 'store'])->name('mobil.store');
});





// role user
Route::middleware(['role:user'])->group(function () {

    Route::get('/testing', function () {
        return Inertia::render('testing');
    })->name('testing');
    Route::get('/datamobil1', [MobilController::class,'index'])->name('datamobillengkap');
    Route::get('/booking', [BookingController::class, 'create'])->name('booking');
    Route::post('/booking', [BookingController::class, 'store'])->name('booking');
    // Rute profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
