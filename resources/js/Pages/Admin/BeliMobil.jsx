import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const BeliMobil = ({ onSubmit }) => {
  const { data, setData, post, errors, reset } = useForm({
    namaPembeli: '',
    noHp: '',
    namaMobil: '',
    brand: '',
    harga: '',
    tahun: '',
    pajak: '',
    kategori: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/admin/belimobil', data)
      .then((response) => {
        console.log('Pembelian mobil berhasil:', response);
        window.location.href = '/admin/dashboard'; // Redirect ke halaman setelah berhasil
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
        // Lakukan sesuatu jika terjadi kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'left', maxWidth: '300px', margin: '0 ' }}>
      {/* Formulir Pembelian Mobil */}
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Nama Pembeli:</label>
        <input type="text" name="namaPembeli" value={data.namaPembeli} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        {errors.namaPembeli && <div className="text-red-500">{errors.namaPembeli}</div>}
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>No. HP:</label>
        <input type="text" name="noHp" value={data.noHp} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        {errors.noHp && <div className="text-red-500">{errors.noHp}</div>}
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Nama Mobil:</label>
        <input type="text" name="namaMobil" value={data.namaMobil} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        {errors.namaMobil && <div className="text-red-500">{errors.namaMobil}</div>}
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Brand:</label>
        <input type="text" name="brand" value={data.brand} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        {errors.brand && <div className="text-red-500">{errors.brand}</div>}
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Harga:</label>
        <input type="text" name="harga" value={data.harga} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        {errors.harga && <div className="text-red-500">{errors.harga}</div>}
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Tahun:</label>
        <input type="text" name="tahun" value={data.tahun} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        {errors.tahun && <div className="text-red-500">{errors.tahun}</div>}
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Pajak:</label>
        <div>
          <input
            type="radio"
            name="pajak"
            value="Hidup"
            checked={data.pajak === 'Hidup'}
            onChange={handleChange}
          />
          <label className="ml-2 text-orange-300">Hidup</label>
        </div>
        <div>
          <input
            type="radio"
            name="pajak"
            value="Mati"
            checked={data.pajak === 'Mati'}
            onChange={handleChange}
          />
          <label className="ml-2 text-orange-300">Mati</label>
        </div>
        {errors.pajak && <div className="text-red-500">{errors.pajak}</div>}
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Kategori:</label>
        <div>
          {["Sedan", "SUV", "Coupe", "Pick-up", "Sport", "Listrik", "Keluarga", "Klasik", "Off-road"].map((kategori) => (
            <div key={kategori}>
              <input
                type="radio"
                name="kategori"
                value={kategori}
                checked={data.kategori === kategori}
                onChange={handleChange}
              />
              <label className="ml-2 text-orange-300">{kategori}</label>
            </div>
          ))}
        </div>
        {errors.kategori && <div className="text-red-500">{errors.kategori}</div>}
      </div><br></br>
      <div>
        <button type="submit" style={{ width: '100%', padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Beli Mobil</button>
      </div>
    </form>
  );
};

export default BeliMobil;