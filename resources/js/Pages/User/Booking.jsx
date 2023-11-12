import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
import { Navbar } from '@/Pages/User/Navbar';


export const Booking = ({ user, mobilData ,mobil}) => {
  const urlParams = new URLSearchParams(window.location.search);
  const kodeMobil = urlParams.get('kodeMobil');
  const Brand = urlParams.get('Brand');
  const NamaMobil = urlParams.get('NamaMobil');
<<<<<<< HEAD
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
=======
  const Gambar = urlParams.get('Gambar');

>>>>>>> 5ee36c19015816b6b5afd274915c29b488389502



  const { data, setData, post } = useForm({
    namaPemesan: user.name,
    email: user.email,
    nomorHape: '',
    kodeMobil: mobilData ? mobilData.id : kodeMobil ,

    tanggal: formattedDate,
    message: '',

  });

  const showAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Berhasil Booking!',
      text: 'Silahkan ditunggu ya!',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('User confirmed the alert');
      } else {
        console.log('User rejected the alert');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobilData?.id && !data.kodeMobil) {
        Swal.fire({
          icon: 'warning',
          title: 'Pilih Mobil Terlebih Dahulu',
          text: 'Silahkan kembali ke halaman sebelumnya dan pilih mobil untuk booking.',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/datamobil1';
          }
        });
        return;
      }


    showAlert();

    const response = await post(route('booking.create'));

    if (response.ok) {
      console.log('Booking successful');
    } else {
      console.log('Booking failed');
    }
  };

  return (
    <div><Navbar/>
    <div className="container flex justify-content-center align-items-center min-h-100">
      <div className="card p-8 ">
        <h2 className="text-center mb-4">Pesan Mobil</h2>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="form-group row justify-content-center">
            <label htmlFor="namaPemesan" className="col-sm-2 col-form-label text-center">
              Nama Pemesan
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control "
                id="namaPemesan"
                name="namaPemesan"
                value={data.namaPemesan}
                onChange={(e) => setData('namaPemesan', e.target.value)}
                required
              disabled

              />
            </div>
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
              disabled

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
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Pesan
            </button>
          </div>
          <div className="col-md-6">
            <img
             src={`/storage/${Gambar}`}
              alt="Mobil Image"
              className="img-fluid"
            />
             <p>Nama Mobil: {NamaMobil} </p>
              <p>Brand Mobil: {Brand}</p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Booking;
