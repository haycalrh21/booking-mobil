import React, { useState, useEffect } from 'react';
import { Navbar } from '@/Pages/admin/Navbar';
import DataMobil from '@/Pages/Mobil/DataMobil';
import DataPengguna from '@/Pages/Admin/DataPengguna';
import DataBooking from '@/Pages/Admin/DataBooking';
import Karyawan from '@/Pages/Admin/DataPegawai';
import DataPenjualan from '@/Pages/Admin/DataPenjualan';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('');
  const [mobilData, setMobilData] = useState([]);
  const [penggunaData, setPenggunaData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [karyawanData, setKaryawanData] = useState([]);
  const [penjualanData, setPenjualanData] = useState([]);
  const [isTestVisible, setIsTestVisible] = useState(true); // State untuk visibilitas elemen <div>

  const handleTabClick = (tab) => {
    if (tab === activeTab) {
      setActiveTab('');
      setIsTestVisible(true); // Menampilkan kembali elemen <div> ketika tab ditutup
    } else {
      setActiveTab(tab);
      setIsTestVisible(false); // Menyembunyikan elemen <div> ketika tab diklik
    }
  };

  useEffect(() => {
    if (activeTab === 'dataMobil') {
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
      fetch('/admin/databooking')
        .then((response) => response.json())
        .then((data) => {
          setBookingData(data);
        })
        .catch((error) => {
          console.error('Error fetching data booking:', error);
        });
    }

    if (activeTab === 'dataPegawai') {
      fetch('/admin/datapegawai')
        .then((response) => response.json())
        .then((data) => {
          setKaryawanData(data);
        })
        .catch((error) => {
          console.error('Error fetching data pegawai:', error);
        });
    }

    if (activeTab === 'dataPenjualan') {
      fetch('/admin/datapenjualan')
        .then((response) => response.json())
        .then((data) => {
          setPenjualanData(data);
        })
        .catch((error) => {
          console.error('Error fetching data penjualan:', error);
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
          Data Pemesan
        </a>
        <a
          className={`tab tab-bordered ${activeTab === 'dataPegawai' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('dataPegawai')}
        >
          Data Pegawai
        </a>
        <a
          className={`tab tab-bordered ${activeTab === 'dataPenjualan' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('dataPenjualan')}
        >
          Data Penjualan
        </a>
      </div>
      {activeTab === 'dataMobil' && <DataMobil mobils={mobilData} />}
      {activeTab === 'dataPengguna' && <DataPengguna users={penggunaData} />}
      {activeTab === 'dataBooking' && <DataBooking bookings={bookingData} />}
      {activeTab === 'dataPegawai' && <Karyawan karyawans={karyawanData} />}
      {activeTab === 'dataPenjualan' && <DataPenjualan penjualan={penjualanData} />}

      {isTestVisible && <div>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Selamat Datang Di Dashboard Admin
    </h1>
        </div>}
    </div>
  );
}

export default AdminDashboard;
