import React, { useState, useEffect } from 'react';
import BeliMobil from '@/Pages/Admin/BeliMobil';

function DataPembelian({ pembelians }) {
  const [formData, setFormData] = useState({
    namaPembeli: '',
    noHp: '',
    namaMobil: '',
    brand: '',
    harga: '',
    tahun: '',
    pajak: '',
    kategori: '',
  });

  const [pembelianList, setPembelianList] = useState([]); // State untuk menyimpan daftar pembelian
  const [showForm, setShowForm] = useState(false); // State untuk menampilkan/menyembunyikan form
  const [totalPembelian, setTotalPembelian] = useState(0); // State untuk menyimpan total pembelian

  useEffect(() => {

    const total = pembelians.reduce((acc, pembelian) => {
      const harga = parseInt(pembelian.harga);

      return acc + (isNaN(harga) ? 0 : harga);
    }, 0);


    setTotalPembelian(total);
  }, [pembelians]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi formulir jika diperlukan

    // Gantilah dengan implementasi fungsi POST yang sesuai
    post('/admin/belimobil', formData)
      .then((response) => {
        console.log('Pembelian mobil berhasil:', response);

        // Setelah request selesai dan berhasil, baru tambahkan formData ke dalam pembelianList
        setPembelianList((prevList) => [...prevList, formData]);
        setShowForm(false); // Menyembunyikan form setelah pembelian berhasil
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
        // Lakukan sesuatu jika terjadi kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
      });
  };

  const handleShowForm = () => {
    setShowForm(true); // Menampilkan form ketika tombol diklik
  };

  return (
    <div className='bg-gray-800'>
            <h1 className="text-3xl font-semibold text-center" style={{ marginTop:'10px' , marginBottom:'5px' }}>
              Data Pembelian Mobil

            </h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid white', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Tanggal Pembelian</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Nama Penjual</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Nomor Hp</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Nama Mobil</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Brand</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Harga</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Tahun</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Pajak</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Kategori</th>
          </tr>
        </thead>
        <tbody>
          {pembelians.map((pembelian, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{pembelian.id}</td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{new Date(pembelian.created_at).toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{pembelian.namaPembeli}</td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{pembelian.noHp}</td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{pembelian.namaMobil}</td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{pembelian.brand}</td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(pembelian.harga)}
              </td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{pembelian.tahun}</td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{pembelian.pajak}</td>
              <td style={{ border: '1px solid white', padding: '8px', textAlign: 'center' }}>{pembelian.kategori}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-orange-300" style={{ marginTop: '10px' }}>
        Total Pembelian: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPembelian)}
      </div>
      {!showForm ? (
        <button onClick={handleShowForm}  className='btn'>Tambah Pembelian</button>
      ) : (
        <div>
          <BeliMobil onSubmit={handleSubmit} />
          <button onClick={() => setShowForm(false)} className='btn'>Batal</button>
        </div>
      )}
    </div>
  );
}

export default DataPembelian;
