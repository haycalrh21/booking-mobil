import { useState } from 'react';
import { Navbar } from '@/Pages/User/Navbar';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Textarea } from '@chakra-ui/react';

const Carousel = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', marginBottom: '10px', overflow: 'hidden', width: '600px' }}>
          <div style={{ display: 'flex', transition: 'transform 0.5s', transform: `translateX(-${currentImage * (200 + 20)}px)` }}>
            {images.map((image, index) => (
              <img
                key={image.id}
                src={`/storage/${image.path}`}
                alt={image.nama}
                style={{ maxWidth: '50%',maxHeight:'90%', marginRight: '50px', border: '1px solid #ddd' }}
              />
            ))}
          </div>
        </div>
        <button onClick={prevImage} style={{ alignSelf: 'center' }}>Previous</button>
        <button onClick={nextImage} style={{ alignSelf: 'center' }}>Next</button>
      </div>
    );
  };


export const DetailMobil = ({ mobil }) => {
  console.log('mobil:', mobil);
  return (
    <div>
      <div>
        <Navbar />
      </div>

      {mobil.images && mobil.images.length > 0 && (
        <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Carousel images={mobil.images.slice(0, 4)} />

          <table style={{ borderCollapse: 'collapse', width: '55%', border: '1px solid #ddd', marginTop: '20px' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Nama:</strong></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mobil.nama}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Brand:</strong></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mobil.brand}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Harga:</strong></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(mobil.harga)}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Deskripsi:</strong></td>
                <p style={{ border: '1px solid #ddd', padding: '8px' }}>
                <Textarea readOnly="true" style={{minWidth:'720px'
                ,minHeight:'320px'
                ,backgroundColor:'#1d232a'
                ,marginBottom:'-12px'
                ,marginLeft:'-6px'
                ,marginRight:'-5px'
                ,marginTop:'-6px'
            }}>{mobil.deskripsi}</Textarea></p>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Kategori:</strong></td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mobil.kategori}</td>
              </tr>
            </tbody>
          </table>

          <InertiaLink
            href={route('booking.create', {
              kodeMobil: mobil.id,
              Brand: mobil.brand,
              NamaMobil: mobil.nama,
              Gambar: mobil.images.map(image => image.path).join(','),
            })}
            className="bg-blue-500 text-white rounded-full hover-button p-2 mt-2"
          >
            Booking
          </InertiaLink>
          <InertiaLink href="/datamobil1" className="text-blue-500">
            Balik ke halaman mobil
          </InertiaLink>
        </div>
      )}
    </div>
  );
};

export default DetailMobil;
