import React, { useState, useEffect } from 'react';

const DataPenjualan = () => {
  const [penjualan, setPenjualan] = useState([]);

  useEffect(() => {
    // Lakukan permintaan ke endpoint /penjualan
    fetch('/admin/datapenjualan')
      .then((response) => response.json())
      .then((data) => {
        // Setel data penjualan yang diterima ke state
        setPenjualan(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Effect akan dijalankan hanya sekali setelah komponen dipasang

  return (
    <div>
      <h2>Data Penjualan</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Booking ID</th>
            <th>Nama Pemesan</th>
            <th>Email</th>
            <th>Kode Mobil</th>
            <th>Tanggal Konfirmasi Penjualan</th>
          </tr>
        </thead>
        <tbody>
          {penjualan.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.booking_id}</td> {/* Menampilkan booking_id */}
              <td>{data.namaPemesan}</td>
              <td>{data.email}</td>
              <td>{data.kodeMobil}</td>
              <td>{new Date(data.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPenjualan;
