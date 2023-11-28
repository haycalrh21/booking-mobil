import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const EmployeeForm = ({ onSuccess }) => {
  const { data, setData, post, errors, reset } = useForm({
    name: '',
    role: '',
    email: '', // Add email field
    password: '', // Add password field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/admin/datapegawai', {
      onSuccess: () => window.location.href = '/admin/dashboard', // Redirect to the page after successful submission
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama:</label>
        <input type="text" name="name" value={data.name} onChange={handleChange} required />
        {errors.name && <div className="text-red-500">{errors.name}</div>}
      </div>
      <div>
        <label>Jabatan:</label>
        <select name="role" value={data.role} onChange={handleChange} required >
        <option value=''>PILIH JABATAN</option>
        <option value="sales">SALES</option>
        <option value="manager">MANAGER</option>
        </select>
        {errors.role && <div className="text-red-500">{errors.role}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={data.email} onChange={handleChange} required />
        {errors.email && <div className="text-red-500">{errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={data.password} onChange={handleChange} required />
        {errors.password && <div className="text-red-500">{errors.password}</div>}
      </div>
      <div>
        <button type="submit">Tambah Karyawan</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
