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
        Schema::create('mobils', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('brand');
            $table->decimal('harga', 10, 2);
            $table->enum('kategori', ['Sedan','SUV','Coupe','Pick-up', 'Sport', 'Listrik', 'Keluarga','Klasik','Off-road']);

            $table->integer('tahun');
            $table->enum('pajak', ['Hidup', 'Mati']);
            $table->text('deskripsi')->nullable();
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mobils');
    }
};
