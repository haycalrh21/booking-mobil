import React, { useState, useEffect } from 'react';
import { Navbar } from '@/Pages/admin/Navbar';
import DataMobil from '@/Pages/Mobil/DataMobil';
import DataPengguna from '@/Pages/Admin/DataPengguna';
import DataBooking from '@/Pages/Admin/DataBooking'; // Pastikan Anda mengimpor komponen DataBooking

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('');
  const [mobilData, setMobilData] = useState([]);
  const [penggunaData, setPenggunaData] = useState([]);
  const [bookingData, setBookingData] = useState([]); // Tambahkan state untuk data booking

  const handleTabClick = (tab) => {
    if (tab === activeTab) {
      setActiveTab('');
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (activeTab === 'dataMobil') {
      // Fetch data mobil
      fetch('/admin/datamobil')
        .then((response) => response.json())
        .then((data) => {
          setMobilData(data);
        })
        .catch((error) => {
          console.error('Error fetching data mobil:', error);
        });
    }

    if (activeTab === 'dataPengguna') {
      // Fetch data pengguna
      fetch('/admin/datapengguna')
        .then((response) => response.json())
        .then((data) => {
          setPenggunaData(data);
        })
        .catch((error) => {
          console.error('Error fetching data pengguna:', error);
        });
    }

    if (activeTab === 'dataBooking') {
      // Fetch data booking
      fetch('/admin/databooking')
        .then((response) => response.json())
        .then((data) => {
          setBookingData(data); // Mengatur data booking
        })
        .catch((error) => {
          console.error('Error fetching data booking:', error);
        });
    }
  }, [activeTab]);

  return (
    <div>
      <Navbar />
      <div className="tabs">
        <a
          className={`tab tab-bordered ${activeTab === 'dataMobil' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('dataMobil')}
        >
          Data Mobil
        </a>
        <a
          className={`tab tab-bordered ${activeTab === 'dataPengguna' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('dataPengguna')}
        >
          Data Pengguna
        </a>
        <a
          className={`tab tab-bordered ${activeTab === 'dataBooking' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('dataBooking')}
        >
          Data Booking
        </a>
      </div>
      {activeTab === 'dataMobil' && <DataMobil mobils={mobilData} />}
      {activeTab === 'dataPengguna' && <DataPengguna users={penggunaData} />}
      {activeTab === 'dataBooking' && <DataBooking bookings={bookingData} />}
    </div>
  );
}

export default AdminDashboard;
