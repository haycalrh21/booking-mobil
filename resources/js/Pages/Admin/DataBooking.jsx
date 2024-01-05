import React, { useRef, useState ,useEffect} from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const Databooking = ({ bookings }) => {
  const tableRef = useRef();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [confirmedBookings, setConfirmedBookings] = useState([]);

  useEffect(() => {
    const storedConfirmedBookings = localStorage.getItem('confirmedBookings');
    if (storedConfirmedBookings) {
      setConfirmedBookings(JSON.parse(storedConfirmedBookings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('confirmedBookings', JSON.stringify(confirmedBookings));
  }, [confirmedBookings]);


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
        // Tampilkan SweetAlert 2 sesuai dengan respons dari server
        Swal.fire({
          title: 'Konfirmasi',
          text: 'Anda yakin ingin mengkonfirmasi data ini?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
        }).then((result) => {
            // if (data === 'errornih') {

            //     console.log(data);

            //   }
          if (result.isConfirmed) {
            setConfirmedBookings((prevConfirmedBookings) => [...prevConfirmedBookings, booking.id]);

            // Lakukan sesuatu jika pengguna menekan tombol Ya
            // ...
            // Setelah sukses, kirim permintaan ke server untuk menghapus data pemesan
            fetch('/admin/datapenjualan/tambah', {
                method: 'POST',
                body: formData,
              })
              .catch((deleteError) => {
                console.error('Error deleting data:', deleteError);
              });
          } else {
            // Lakukan sesuatu jika pengguna menekan tombol Tidak
            Swal.fire({
              title: 'Konfirmasi Dibatalkan',
              text: 'Anda membatalkan konfirmasi data.',
              icon: 'info',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
          }
        });

  };


const isBookingConfirmed = (bookingId) => confirmedBookings.includes(bookingId);

  return (
    <div className='text-black'>
             <img src="/images/bgputihkebalik.jpg" style={{ minWidth:'100%',maxHeight:'200%', position:'absolute',zIndex:'-1'}} alt="" />

            <h1 className="text-3xl font-semibold text-center" >
              Data Pemesan

            </h1>
    <div style={{ marginBottom:'20px' ,marginLeft:'20px' }}>
      <label>Pilih Tanggal Awal: </label>
      <input type="date" onChange={handleStartDateChange}
      className='ml-4 normal-case text-sm bg-orange-100 '
      style={{colorScheme:'black'}}
      />
      <label className='ml-4'>Pilih Tanggal Akhir: </label>
      <input type="date"
      style={{colorScheme:'black'}}
      className='ml-4 normal-case text-sm bg-orange-100 '
      onChange={handleEndDateChange} />
    </div>
    <table className="table" ref={tableRef} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead className='text-black '>
        <tr>
          <th style={{ border: '1px solid black' }}>ID</th>
          <th style={{ border: '1px solid black' }}>Nama Pemesan</th>
          <th style={{ border: '1px solid black' }}>Email</th>
          <th style={{ border: '1px solid black' }}>Nomor Hape</th>
          <th style={{ border: '1px solid black' }}>Kode Mobil</th>
          <th style={{ border: '1px solid black' }}>Waktu Pemesanan</th>
          <th style={{ border: '1px solid black' }}>Tanggal Pemesanan</th>
          <th style={{ border: '1px solid black' }}>Message</th>
          <th style={{ border: '1px solid black' }}>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {filteredBookings.map((booking) => (
          <tr key={booking.id}>
            <td style={{ border: '1px solid black' }}>{booking.id}</td>
            <td style={{ border: '1px solid black' }}>{booking.namaPemesan}</td>
            <td style={{ border: '1px solid black' }}>{booking.email}</td>
            <td style={{ border: '1px solid black' }}>{booking.nomorHape}</td>
            <td style={{ border: '1px solid black' }}>{booking.kodeMobil}</td>
            <td style={{ border: '1px solid black' }}>{booking.waktu}</td>
            <td style={{ border: '1px solid black' }}>{booking.tanggal}</td>
            <td style={{ border: '1px solid black' }}>{booking.message}</td>
            <td style={{ border: '1px solid black' }}>
              <button onClick={() => handleConfirm(booking)}
               disabled={isBookingConfirmed(booking.id)} // Disable the button if booking is confirmed
               className='btn'
               style={{
                 width: 'auto',
                 padding: '8px',
                 backgroundColor: isBookingConfirmed(booking.id) ? 'grey' : '#4CAF50',
                 color: 'white',
                 border: 'none',
                 borderRadius: '4px',
                 cursor: 'pointer',
               }}
             >
               {isBookingConfirmed(booking.id) ? 'Berhasil Terjual' : 'Konfirmasi penjualan'}
             </button>
           </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default Databooking;
