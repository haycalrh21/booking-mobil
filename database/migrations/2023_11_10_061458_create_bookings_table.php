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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('namaPemesan');
            $table->string('email');
            $table->string('nomorHape');
            $table->unsignedBigInteger('kodeMobil'); // Ini adalah kunci asing ke tabel mobils
            $table->text('message')->nullable();
            $table->timestamps();
            $table->date('tanggal')->nullable();
            $table->foreign('kodeMobil')->references('id')->on('mobils'); // Menambahkan kunci asing ke tabel mobils
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
