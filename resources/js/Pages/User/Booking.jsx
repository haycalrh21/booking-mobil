import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
import { Navbar } from '@/Pages/User/Navbar';
import { Footer } from '@/Pages/User/Footer';

const Booking = ({ user, mobilData, mobils }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const kodeMobil = urlParams.get('kodeMobil');
  const Brand = urlParams.get('Brand');
  const NamaMobil = urlParams.get('NamaMobil');
//   const currentDate = new Date();
//   const formattedDate = currentDate.toISOString().split('T')[0];
  const Gambar = urlParams.get('Gambar')?.split(',');


  const { data, setData, post } = useForm({
    namaPemesan: user.name,
    email: user.email,
    nomorHape: '',
    kodeMobil: mobilData ? mobilData.id : kodeMobil,
    waktu:'',
    tanggal: '',
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

    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Pesan Mobil</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex',marginLeft:'20%'  }}>
              <div style={{ flex: '1' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' , }}>
                  <label htmlFor="namaPemesan">Nama Pemesan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="namaPemesan"
                    name="namaPemesan"
                    value={data.namaPemesan}
                    onChange={(e) => setData('namaPemesan', e.target.value)}
                    required
                    disabled
                  />
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
                  <label htmlFor="nomorHape">Nomor Hape</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomorHape"
                    name="nomorHape"
                    value={data.nomorHape}
                    onChange={(e) => setData('nomorHape', e.target.value)}
                    required
                    maxLength={12}
                  />
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

                <div>
                Waktu Pemesanan
                <input
                    type="time"
                    id="waktu"
                    name="waktu"
                    value={data.waktu}
                    onChange={(e) => setData('waktu', e.target.value)}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Select a time"
                />
                </div>

                  <div>
                    Tanggal Pemesanan
                    <input
                      type="date"
                      id="tanggal"
                      name="tanggal"
                      value={data.tanggal}
                      onChange={(e) => setData('tanggal', e.target.value)}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      placeholder="Select a date"
                    />
                  </div>

                  <label htmlFor="message">Pesan</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                  ></textarea>
                </div>
                <br></br>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                  <button type="submit" className="btn btn-primary">
                    Pesan
                  </button>
                </div>
              </div>
              <div style={{ flex: '1' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  Mobil:
                  <div className="p-4">
                    <p>Nama Mobil: {NamaMobil}</p>
                    <p>Brand Mobil: {Brand}</p>
                  </div>
                  {Array.isArray(Gambar) && Gambar.length > 0 && (
                    <div>
                        {Gambar.map((imageName, index) => (
                        <img
                            key={index}
                            src={`/storage/${imageName}`}
                            alt={`Mobil Image ${index + 1}`}
                            style={{ maxWidth: '200px', maxHeight: '150px', marginRight: '10px' }}
                        />
                        ))}
                    </div>
                    )}

                </div>
              </div>
            </form>
          </div>
          <div className='d-flex align-items-center position-relative'>
            {/* Additional content if needed... */}
          </div>
        </div>
        <br></br><br></br><br></br>
      </div>
      <Footer/>
    </div>
  );
};

export default Booking;
