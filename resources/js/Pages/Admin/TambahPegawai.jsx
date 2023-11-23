import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const EmployeeForm = ({ onSuccess }) => {
  const { data, setData, post, errors, reset } = useForm({
    nama: '',
    jabatan: '',
    nohp: '',
    alamat: '',
    tanggal_lahir: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/admin/datapegawai', {
      onSuccess: () => window.location.href = '/admin/dashboard', // Redirect ke halaman setelah berhasil
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama:</label>
        <input type="text" name="nama" value={data.nama} onChange={handleChange} required/>
        {errors.nama && <div className="text-red-500">{errors.nama}</div>}
      </div>
      <div>
        <label>Jabatan:</label>
        <input type="text" name="jabatan" value={data.jabatan} onChange={handleChange} required/>
        {errors.jabatan && <div className="text-red-500">{errors.jabatan}</div>}
      </div>
      <div>
        <label>No. HP:</label>
        <input type="text" name="nohp" value={data.nohp} onChange={handleChange} required/>
        {errors.nohp && <div className="text-red-500">{errors.nohp}</div>}
      </div>
      <div>
        <label>Alamat:</label>
        <input type="text" name="alamat" value={data.alamat} onChange={handleChange} required/>
        {errors.alamat && <div className="text-red-500">{errors.alamat}</div>}
      </div>
      <div>
        <label>Tanggal Lahir:</label>
        <input type="date" name="tanggal_lahir" value={data.tanggal_lahir} onChange={handleChange} required />
        {errors.tanggal_lahir && <div className="text-red-500">{errors.tanggal_lahir}</div>}
      </div>
      <div>
        <button type="submit">Tambah Karyawan</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
