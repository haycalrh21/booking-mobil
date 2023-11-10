import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/Pages/User/LoadingSpinner';
import { Navbar } from '@/Pages/User/Navbar';
import { InertiaLink } from '@inertiajs/inertia-react';

function Mobil1({ mobils }) {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBookingForm, setShowBookingForm] = useState(false); // State untuk menampilkan/menyembunyikan form booking
  const [bookingData, setBookingData] = useState({}); // State untuk data booking
  const categories = ['All', 'Sedan', 'SUV', 'Coupe', 'Pick-up', 'Sport', 'Listrik', 'Keluarga', 'Klasik', 'Off-road'];

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredMobils = selectedCategory === 'All' ? mobils : mobils.filter(mobil => mobil.kategori === selectedCategory);

  // Handle booking action
  const handleBooking = (mobil) => {
    setBookingData({ mobil });
    setShowBookingForm(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here, for example, sending booking data to the server.
    console.log("Booking data:", bookingData);
    // Reset the form and hide it
    setBookingData({});
    setShowBookingForm(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="sidebar" style={{ flex: '0 0 5%' }}>
          <h3>Filter Kategori</h3>
          <ul>
            {categories.map(category => (
              <li key={category} onClick={() => setSelectedCategory(category)} style={{ cursor: 'pointer', fontWeight: category === selectedCategory ? 'bold' : 'normal' }}>
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="content" style={{ flex: '1', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            filteredMobils.map((mobil) => (
              <div key={mobil.id} className="bg-white rounded shadow-md p-2 mt-2" style={{ maxWidth: '300px', flexBasis: 'calc(33.33% - 10px)', margin: '5px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={`/storage/${mobil.image}`}
                    alt={mobil.nama}
                    className="w-auto h-full mt-5"
                    style={{ maxWidth: '50%', height: 'auto' }}
                  />
                  <strong className='flex justify-center'>{mobil.nama}</strong>
                  <p className='flex justify-center'><strong>Brand:</strong> {mobil.brand}</p>
                  <p className='flex justify-center'><strong>Harga:</strong> {mobil.harga}</p>
                  <p className='flex justify-center'><strong>Kategori:</strong> {mobil.kategori}</p>

                  {/* Use InertiaLink to navigate to Booking page with mobil data */}
                  <InertiaLink
                    href={route('booking', { kodeMobil: mobil.id })} // Set the route for Booking page with kodeMobil as a parameter
                    className="bg-blue-500 text-white rounded-full p-2 mt-2"
                  >
                    Booking
                  </InertiaLink>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showBookingForm && (
        <div>
          <h2>Booking Form</h2>
          <form onSubmit={handleSubmit}>
            {/* Add input fields for booking details here */}
            <button type="submit">Submit Booking</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Mobil1;
