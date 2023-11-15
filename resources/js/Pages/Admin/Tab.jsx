import React from 'react';

export const Tab = ({
  showDataMobil,
  showDataPengguna,
  showDataBooking, // Tambahkan prop untuk menampilkan Data Booking
  toggleDataMobil,
  toggleDataPengguna,
  toggleDataBooking, // Tambahkan prop untuk mengganti tampilan Data Booking
}) => {
  return (
    <div className="tabs">
      <a className={`tab tab-bordered ${showDataMobil ? 'tab-active' : ''}`} onClick={toggleDataMobil}>
        Data Mobil
      </a>
      <a className={`tab tab-bordered ${showDataPengguna ? 'tab-active' : ''}`} onClick={toggleDataPengguna}>
        Data Pengguna
      </a>
      <a className={`tab tab-bordered ${showDataBooking ? 'tab-active' : ''}`} onClick={toggleDataBooking}>
        Data Booking
      </a>
      <a className={`tab tab-bordered ${showDataPegawai ? 'tab-active' : ''}`} onClick={toggleDataBooking}>
        Data Pegawai
      </a>
      <a className={`tab tab-bordered ${showDataPembelian ? 'tab-active' : ''}`} onClick={toggleDataBooking}>
        Data Pembelian
      </a>
    </div>
  );
};
