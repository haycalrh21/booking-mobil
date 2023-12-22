import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Navbar } from '@/Pages/User/Navbar';
import { Footer } from '@/Pages/User/Footer';

export const BookingPage = ({ bookings }) => {
  return (
    <div className='text-black'>

      <Navbar/>

    <div className='' style={{}}>
                <img src="/images/bgputih.jpg" style={{ width:'100%'}} alt="" />
                <div className="" style={{maxWidth:1080 }}>
                    <div className='' >
          <h2 style={{ textAlign: 'center' }}>Riwayat Booking</h2>
          {bookings.length > 0 ? (
            <table className="table text-xl" style={{ maxWidth:1080, marginTop:'-720px'}}>
              <thead className='text-black text-xl'>
                <tr>
                  <th>Nama Pemesan</th>
                  <th>Email</th>
                  <th>Nomor Hape</th>
                  <th>Kode Mobil</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.namaPemesan}</td>
                    <td>{booking.email}</td>
                    <td>{booking.nomorHape}</td>
                    <td>{booking.kodeMobil}</td>
                    <td>{booking.tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div >
              Tidak ada data booking yang tersedia.
            </div>
          )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BookingPage;
