import React from 'react';

const Databooking = ({ bookings }) => {
  return (
    <div>
      <h2>Data Booking</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Pemesan</th>
            <th>Email</th>
            <th>Nomor Hape</th>
            <th>Kode Mobil</th>
            <th>Tanggal Pemesanan</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.namaPemesan}</td>
              <td>{booking.email}</td>
              <td>{booking.nomorHape}</td>
              <td>{booking.kodeMobil}</td>
              <td>{booking.tanggal}</td>
              <td>{booking.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Databooking;
