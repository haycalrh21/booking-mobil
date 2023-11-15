// DetailMobil.jsx
import { Navbar } from '@/Pages/User/Navbar';
import { InertiaLink } from '@inertiajs/inertia-react';

import React from 'react';

export const DetailMobil = ({ mobil }) => {
  console.log('mobil:', mobil);

  return (
    <div>
        <div>
            <Navbar/>
        </div>

      {mobil.images && mobil.images.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            {mobil.images.slice(0, 4).map((image) => (
              <img
                key={image.id}
                src={`/storage/${image.path}`}
                alt={mobil.nama}
                style={{ maxWidth: '200px', marginRight: '10px' }}
              />
            ))}
          </div>
          <h2>{mobil.nama}</h2>

          <p><strong>Brand:</strong> {mobil.brand}</p>
          <p><strong>Harga:</strong> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(mobil.harga)}</p>
          <p><strong>Deskripsi:</strong> {mobil.deskripsi}</p>
          <p><strong>Kategori:</strong> {mobil.kategori}</p>
          <InertiaLink
                      href={route('booking.create', { kodeMobil: mobil.id, Brand: mobil.brand, NamaMobil: mobil.nama, Gambar: mobil.image })}
                      className="bg-blue-500 text-white rounded-full hover-button p-2 mt-2"
                    >
                      Booking
                    </InertiaLink>
      <a href="/">Back to Car List</a>

        </div>
      )}

    </div>
  );
};

export default DetailMobil;
