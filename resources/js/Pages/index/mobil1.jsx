// Mobil1.jsx
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/Pages/User/LoadingSpinner';
import { Navbar } from '@/Pages/User/Navbar';
import { InertiaLink } from '@inertiajs/inertia-react';
import {Booking} from '@/Pages/user/booking'; // Import BookingForm component
import { Paginator } from '@/Pages/admin/Paginator';// Import komponen Pagination


function Mobil1({ mobils }) {

  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const categories = ['All', 'Sedan', 'SUV', 'Coupe', 'Pick-up', 'Sport', 'Listrik', 'Keluarga', 'Klasik', 'Off-road'];
const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mobils.length / itemsPerPage);
  const [canGoNext, setCanGoNext] = useState(true); // Tambahkan state untuk melacak apakah bisa melanjutkan

  // Fungsi untuk mengambil data sesuai halaman saat ini
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mobils.slice(startIndex, endIndex);
  };

  // Fungsi untuk mengganti halaman
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setCanGoNext(true); // Setelah mengubah halaman, pengguna dapat melanjutkan lagi
    } else {
      setCanGoNext(false); // Jika mencoba melanjutkan ke halaman yang tidak ada, set canGoNext menjadi false
    }
  };

  // Update halaman saat komponen dimuat ulang
  useEffect(() => {
    setCurrentPage(1);
    setCanGoNext(true); // Saat komponen dimuat ulang, pengguna dapat melanjutkan lagi
  }, [mobils]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredMobils = selectedCategory === 'All' ? mobils : mobils.filter(mobil => mobil.kategori === selectedCategory);

  const handleBooking = (mobil) => {
    setBookingData({ mobil });
    setShowBookingForm(true);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="sidebar" style={{ flex: '0 0 5%' }}>
          <h3>Filter Kategori</h3>
          <ul>
            {categories.map(category => (
              <li key={category} onClick={() => setSelectedCategory(category)} style={{ cursor: 'pointer', fontWeight: category === selectedCategory ? 'bold' : 'normal' }}>
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="content" style={{ flex: '1', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            filteredMobils.map((mobil) => (
              <div key={mobil.id} className="bg-white rounded shadow-md p-2 mt-2" style={{ maxWidth: '300px', flexBasis: 'calc(33.33% - 10px)', margin: '5px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={`/storage/${mobil.image}`}
                    alt={mobil.nama}
                    className="w-auto h-full mt-5"
                    style={{ maxWidth: '50%', height: 'auto' }}
                  />
                  <strong className='flex justify-center'>Nama: {mobil.nama}</strong>
                  <p className='flex justify-center'><strong>Brand:</strong> {mobil.brand}</p>
                  <p className='flex justify-center'><strong>Harga:</strong> {mobil.harga}</p>
                  <p className='flex justify-center'><strong>Deksripsi:</strong> {mobil.deskripsi}</p>
                  <p className='flex justify-center'><strong>Kategori:</strong> {mobil.kategori}</p>
                  <InertiaLink


                    href={route('booking.create',
                     {
                        kodeMobil: mobil.id , Brand: mobil.brand , NamaMobil: mobil.nama , Gambar: mobil.image
                      },
                      )}
                    className="bg-blue-500 text-white rounded-full p-2 mt-2"
                    onClick={() => handleBooking(mobil)}
                  >
                    Booking
                  </InertiaLink>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              canGoNext={canGoNext} // Gunakan state canGoNext
            />
    </div>
  );
}

export default Mobil1;
