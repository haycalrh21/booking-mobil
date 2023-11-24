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
            <h1 className="text-3xl font-semibold text-center" style={{ marginTop:'10px' }}>
              Data Pemesan

            </h1>
    <div>
      <label>Pilih Tanggal Awal: </label>
      <input type="date" onChange={handleStartDateChange} />
      <label>Pilih Tanggal Akhir: </label>
      <input type="date" onChange={handleEndDateChange} />
    </div>
    <table className="table" ref={tableRef} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid white' }}>ID</th>
          <th style={{ border: '1px solid white' }}>Nama Pemesan</th>
          <th style={{ border: '1px solid white' }}>Email</th>
          <th style={{ border: '1px solid white' }}>Nomor Hape</th>
          <th style={{ border: '1px solid white' }}>Kode Mobil</th>
          <th style={{ border: '1px solid white' }}>Tanggal Pemesanan</th>
          <th style={{ border: '1px solid white' }}>Message</th>
          <th style={{ border: '1px solid white' }}>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {filteredBookings.map((booking) => (
          <tr key={booking.id}>
            <td style={{ border: '1px solid white' }}>{booking.id}</td>
            <td style={{ border: '1px solid white' }}>{booking.namaPemesan}</td>
            <td style={{ border: '1px solid white' }}>{booking.email}</td>
            <td style={{ border: '1px solid white' }}>{booking.nomorHape}</td>
            <td style={{ border: '1px solid white' }}>{booking.kodeMobil}</td>
            <td style={{ border: '1px solid white' }}>{booking.tanggal}</td>
            <td style={{ border: '1px solid white' }}>{booking.message}</td>
            <td style={{ border: '1px solid white' }}>
              <button onClick={() => handleConfirm(booking)}  className='btn' style={{ width: '50%', padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Konfirmasi</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default Databooking;
