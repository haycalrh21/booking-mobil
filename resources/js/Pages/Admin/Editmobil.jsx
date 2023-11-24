import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Edit = ({ mobil }) => {
    const [images, setImages] = useState([]);
  const { data, setData, put, errors } = useForm({
    nama: mobil.nama,
    brand: mobil.brand,
    harga: mobil.harga,
    tahun: mobil.tahun,
    stok: mobil.stok,
    pajak: mobil.pajak,
    deskripsi: mobil.deskripsi,
    kategori: mobil.kategori,
    images: [],

  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nama', data.nama);
    formData.append('brand', data.brand);
    formData.append('harga', data.harga);
    formData.append('tahun', data.tahun);
    formData.append('stok', data.stok);
    formData.append('pajak', data.pajak);
    formData.append('deskripsi', data.deskripsi);
    formData.append('kategori', data.kategori);

    // Tambahkan gambar ke FormData jika ada yang dipilih
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append(`images[${i}]`, images[i]);
      }
    }

    const response = await put(route('mobil.update', mobil.id), formData);

    console.log('Response:', response);

    if (response && response.error) {
      // Tampilkan pesan kesalahan di sini
      console.error(response.error);
    } else {
      // Lanjutkan dengan tindakan setelah berhasil
    }
  };
const handleImageChange = (e) => {
  const files = e.target.files;
  if (files) {
    const filesArray = Array.from(files);
    setImages([...(mobil.images || []), ...filesArray]);  // Menambahkan gambar baru ke state
  }
};


// Sebelum
useEffect(() => {
    setImages(mobil.images || []);
  }, [mobil]);


  return (
    <div>
      <h1>Edit Mobil</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="nama">Nama:</label>
          <input
            type="text"
            id="nama"
            value={data.nama}
            onChange={(e) => setData('nama', e.target.value)}
          />
          {errors.nama && <span>{errors.nama}</span>}
        </div>

        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            value={data.brand}
            onChange={(e) => setData('brand', e.target.value)}
          />
          {errors.brand && <span>{errors.brand}</span>}
        </div>

        <div>
          <label htmlFor="harga">Harga:</label>
          <input
            type="text"
            id="harga"
            value={data.harga}
            onChange={(e) => setData('harga', e.target.value)}
          />
          {errors.harga && <span>{errors.harga}</span>}
        </div>

        <div>
          <label htmlFor="tahun">Tahun:</label>
          <input
            type="text"
            id="tahun"
            value={data.tahun}
            onChange={(e) => setData('tahun', e.target.value)}
          />
          {errors.tahun && <span>{errors.tahun}</span>}
        </div>

        <div>
          <label htmlFor="stok">Stok:</label>
          <input
            type="text"
            id="stok"
            value={data.stok}
            onChange={(e) => setData('stok', e.target.value)}
          />
          {errors.stok && <span>{errors.stok}</span>}
        </div>

        <div>
          <label htmlFor="pajak">Pajak:</label>
          <input
            type="text"
            id="pajak"
            value={data.pajak}
            onChange={(e) => setData('pajak', e.target.value)}
          />
          {errors.pajak && <span>{errors.pajak}</span>}
        </div>

        <div>
          <label htmlFor="deskripsi">Deskripsi:</label>
          <textarea
            id="deskripsi"
            value={data.deskripsi}
            onChange={(e) => setData('deskripsi', e.target.value)}
          />
          {errors.deskripsi && <span>{errors.deskripsi}</span>}
        </div>

        <div>
          <label htmlFor="kategori">Kategori:</label>
          <input
            type="text"
            id="kategori"
            value={data.kategori}
            onChange={(e) => setData('kategori', e.target.value)}
          />
          {errors.kategori && <span>{errors.kategori}</span>}
        </div>

        {/* Tampilkan gambar yang sudah ada */}
        <div>
          <label>Images:</label>
          <div>
          {mobil.images && mobil.images.map((image) => (
  <img
    key={image.id}
    src={`/storage/${image.path}`}
    alt={mobil.nama}
    style={{ maxWidth: '50px', maxHeight: '50px' }}
  />
))}
          </div>
        </div>
        <div>
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
          />
          {errors.images && <span>{errors.images}</span>}
        </div>

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default Edit;
