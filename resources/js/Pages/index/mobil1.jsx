import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/Pages/User/LoadingSpinner';
import { Navbar } from '@/Pages/User/Navbar';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Paginator } from '@/Pages/admin/Paginator';

import { Footer } from '@/Pages/User/Footer';
import { DetailMobil} from '@/Pages/User/DetailMobil';

function Mobil1({ mobils }) {
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState(['All']); // Gunakan array untuk menyimpan kategori yang dipilih
  const categories = ['All', 'Sedan', 'SUV', 'Coupe', 'Pick-up', 'Sport', 'Listrik', 'Keluarga', 'Klasik', 'Off-road'];
  const totalPages = Math.ceil(mobils.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter data based on the selected categories
    let filteredData = mobils;
    if (!selectedCategories.includes('All')) {
      filteredData = mobils.filter((mobil) => selectedCategories.includes(mobil.kategori));
    }

    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === 'All' && selectedCategories.length > 1) {
      // Jika 'All' dipilih dan kategori lain dipilih sebelumnya, hapus kategori lainnya
      setSelectedCategories(['All']);
    } else {
      // Jika kategori lainnya dipilih, tambahkan atau hapus dari array selectedCategories
      setSelectedCategories((prevSelectedCategories) => {
        if (prevSelectedCategories.includes(category)) {
          return prevSelectedCategories.filter((cat) => cat !== category);
        } else {
          return [...prevSelectedCategories, category];
        }
      });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [mobils]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <style>
        {`
          /* Gaya efek hover untuk elemen kartu (card) */
          .hover-effect:hover {
            background-color: #0e5776;
            transform: translateY(-10px);
          }

          /* Gaya efek hover untuk tombol "Booking" */
          .hover-button:hover {
            background-color: black;
            color: white;
          }
        `}
      </style>

      <div>
        <Navbar />
        <div className="flex">
        <div className="sidebar" style={{ flex: '0 5 10%', backgroundColor: 'white', marginLeft: '6px', marginTop: '6px', maxHeight: '50vh', overflowY: '0vh' }}>
  <h3 style={{ marginLeft: '20px' }}>Filter Kategori:</h3>
  <ul style={{ marginLeft: '40px' }}>
    {categories.map((category) => (
      <li key={category}>
        <label>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={handleCategoryChange}
          />
          {category}
        </label>
      </li>
    ))}
  </ul>
</div>



          <div className="content" style={{ flex: '1', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              getCurrentPageData().map((mobil) => (
                <div key={mobil.id} className="bg-white rounded shadow-md p-2 mt-2 hover-effect" style={{ maxWidth: '300px', flexBasis: 'calc(33.33% - 10px)', margin: '5px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center'  }}>
                  {mobil.images.length > 0 && (
  <img
    key={mobil.images[0].id}
    src={`/storage/${mobil.images[0].path}`}
    alt={mobil.nama}
    style={{ maxWidth: '100px' }}
  />
)}


                    <strong className='flex justify-center'>Nama: {mobil.nama}</strong>
                    <p className='flex justify-center'  ><strong>Brand:</strong> {mobil.brand}</p>
                    <p className='flex justify-center'>
  <strong>Harga:</strong> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(mobil.harga)}
</p>
<p className='flex justify-center' style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}><strong>Deksripsi:</strong> {mobil.deskripsi}</p>
                    <p className='flex justify-center'><strong>Kategori:</strong> {mobil.kategori}</p>
                    <InertiaLink
  href={route('booking.create', {
    kodeMobil: mobil.id,
    Brand: mobil.brand,
    NamaMobil: mobil.nama,
    Gambar: mobil.images.map(image => image.path).join(','), // Concatenate all image paths
  })}
  className="bg-blue-500 text-white rounded-full hover-button p-2 mt-2"
>
  Booking
</InertiaLink>

        <InertiaLink
  href={route('detailmobil', { id: mobil.id })}
  className="bg-green-500 text-white rounded-full hover-button p-2 mt-2"
>
  Detail
</InertiaLink>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Paginator
          currentPage={currentPage}
          lastPage={totalPages}
          onPageChange={handlePageChange}
        /><br></br><br></br><br></br>
      </div>
      <Footer/>
    </div>
  );
}

export default Mobil1;
