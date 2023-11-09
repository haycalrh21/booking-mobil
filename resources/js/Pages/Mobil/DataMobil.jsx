import React, { useState, useEffect } from 'react';


import { Link } from '@inertiajs/react';
import { Paginator } from '@/Pages/admin/Paginator'; // Import komponen Pagination

export  function DataMobil({ mobils, pagination }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const itemsPerPage = 10;
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

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex">
        <div className="w-1/1">
          {/* <Sidebar /> */}
        </div>
        <div className="bg-gray-800 p-8 rounded-lg w-full flex flex-wrap">
          <div className="w-full md:container md:mx-auto">
            <h1 className="text-3xl font-semibold">
              Data Mobil{' '}
              <Link href={route('mobil.create')} className="btn p-2 m-3">
                Create data
              </Link>
            </h1>
            <div>
              <table className="min-w-full table-fixed">
              <thead>
                    <tr>
                        <th className="border text-left text-orange-300">Nama</th>
                        <th className="border text-left text-orange-300">Brand</th>
                        <th className="border text-left text-orange-300">Harga</th>
                        <th className="border text-left text-orange-300">Tahun</th>
                        <th className="border text-left text-orange-300">Pajak</th>
                        <th className="border text-left text-orange-300">Deskripsi</th>
                        <th className="border text-left text-orange-300">Gambar</th>
                        <th className="border text-left text-orange-300">Kategori</th> {/* Tambahkan kolom kategori */}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(getCurrentPageData()) ? (
  getCurrentPageData().map((mobil) => (
    <tr key={mobil.id}>
      <td className="border text-left">{mobil.nama}</td>
      <td className="border text-left">{mobil.brand}</td>
      <td className="border text-left">{mobil.harga}</td>
      <td className="border text-left">{mobil.tahun}</td>
      <td className="border text-left">{mobil.pajak}</td>
      <td className="border text-left">{mobil.deskripsi}</td>
      <td className="border text-left">
        <img src={`/storage/${mobil.image}`} alt={mobil.nama} style={{ maxWidth: '500px' }} />
      </td>
      <td className="border text-left">{mobil.kategori}</td>
    </tr>
  ))
) : (
  <tr>
    <td className="border text-left" colSpan="8">Tidak ada data yang ditemukan</td>
  </tr>
)}

                    </tbody>

              </table>
            </div>
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              canGoNext={canGoNext} // Gunakan state canGoNext
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataMobil;
