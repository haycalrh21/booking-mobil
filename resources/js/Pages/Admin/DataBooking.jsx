import React, { useRef, useState } from 'react';

const Databooking = ({ bookings }) => {
  const tableRef = useRef();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStartDate && selectedEndDate) {
      const bookingDate = new Date(booking.tanggal);
      return bookingDate >= new Date(selectedStartDate) && bookingDate <= new Date(selectedEndDate);
    }
    return true;
  });

  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };
  const handleConfirm = (booking) => {
    const formData = new FormData();
    formData.append('bookingId', booking.id);
    formData.append('namaPemesan', booking.namaPemesan);
    formData.append('email', booking.email);
    formData.append('nomorHape', booking.nomorHape);
    formData.append('kodeMobil', booking.kodeMobil);
    formData.append('message', booking.message);
    formData.append('tanggal', booking.tanggal);

    // Kirim permintaan ke server untuk menyimpan data ke dalam database
    fetch('/admin/datapenjualan/tambah', {
      method: 'POST',
      body: formData,
    });
  };







  return (
    <div className='bg-gray-800'>
      <h2>Data Booking</h2>
      <div>
        <label>Pilih Tanggal Awal: </label>
        <input type="date" onChange={handleStartDateChange} />
        <label>Pilih Tanggal Akhir: </label>
        <input type="date" onChange={handleEndDateChange} />
      </div>
      <table className="table" ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Pemesan</th>
            <th>Email</th>
            <th>Nomor Hape</th>
            <th>Kode Mobil</th>
            <th>Tanggal Pemesanan</th>
            <th>Message</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.namaPemesan}</td>
              <td>{booking.email}</td>
              <td>{booking.nomorHape}</td>
              <td>{booking.kodeMobil}</td>
              <td>{booking.tanggal}</td>
              <td>{booking.message}</td>
              <td>
                <button onClick={() => handleConfirm(booking)}>Konfirmasi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Databooking;
