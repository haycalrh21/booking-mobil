import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Navbar } from '@/Pages/User/Navbar';
import { Footer } from '@/Pages/User/Footer';

export const BookingPage = ({ bookings }) => {
  return (
    <div>
      <Navbar />
      <div>
        <div>
          <h2 style={{ textAlign: 'center' }}>Riwayat Booking</h2>
          {bookings.length > 0 ? (
            <table className="table" style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
              <thead>
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
            <div style={{ margin: '20px', textAlign: 'center' }}>
              Tidak ada data booking yang tersedia.
            </div>
          )}
        </div>
        <Footer />
      </div>
      {/* Konten tambahan */}

    </div>
  );
};

export default BookingPage;
