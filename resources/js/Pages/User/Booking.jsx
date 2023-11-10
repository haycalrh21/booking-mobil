import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Booking = ({ user }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const kodeMobil = urlParams.get('kodeMobil');

  const { data, setData, post } = useForm({
    namaPemesan: user.name, // Isi dengan nama pengguna
    email: user.email, // Isi dengan email pengguna
    nomorHape: '',
    kodeMobil: kodeMobil,
    tanggal: '', // Tambahkan field tanggal
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('booking'), data);
  };

  return (
    <div className="container">
      <h2>Pesan Mobil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="namaPemesan">Nama Pemesan</label>
          <input
            type="text"
            className="form-control"
            id="namaPemesan"
            name="namaPemesan"
            value={data.namaPemesan}
            onChange={(e) => setData('namaPemesan', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nomorHape">Nomor Hape</label>
          <input
            type="text"
            className="form-control"
            id="nomorHape"
            name="nomorHape"
            value={data.nomorHape}
            onChange={(e) => setData('nomorHape', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kodeMobil">Kode Mobil</label>
          <input
            type="text"
            className="form-control"
            id="kodeMobil"
            name="kodeMobil"
            value={data.kodeMobil}
            onChange={(e) => setData('kodeMobil', e.target.value)}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="tanggal">Tanggal Pemesanan</label>
          <input
            type="date"
            className="form-control"
            id="tanggal"
            name="tanggal"
            value={data.tanggal}
            onChange={(e) => setData('tanggal', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Pesan</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            value={data.message}
            onChange={(e) => setData('message', e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Pesan
        </button>
      </form>
    </div>
  );
};

export default Booking;
