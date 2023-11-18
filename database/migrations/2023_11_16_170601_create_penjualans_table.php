<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penjualans', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('booking_id'); // Menambahkan kolom booking_id
            $table->foreign('booking_id')->references('id')->on('bookings');

            $table->string('namaPemesan');
            $table->string('email');
            $table->string('nomorHape');
            $table->unsignedBigInteger('kodeMobil'); // Ini adalah kunci asing ke tabel mobils
            $table->text('message')->nullable();
            $table->timestamps();
            $table->date('tanggal');
            $table->foreign('kodeMobil')->references('id')->on('mobils'); // Menambahkan kunci asing ke tabel mobils
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penjualans');
    }
};
