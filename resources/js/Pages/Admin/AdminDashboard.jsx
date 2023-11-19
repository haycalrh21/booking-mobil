
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/Pages/admin/Navbar';
import DataMobil from '@/Pages/Mobil/DataMobil';
import DataPengguna from '@/Pages/Admin/DataPengguna';
import DataBooking from '@/Pages/Admin/DataBooking';
import Karyawan from '@/Pages/Admin/DataPegawai';
import DataPenjualan from '@/Pages/Admin/DataPenjualan';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('');
  const [mobilData, setMobilData] = useState([]);
  const [penggunaData, setPenggunaData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [karyawanData, setKaryawanData] = useState([]);
  const [penjualanData, setPenjualanData] = useState([]);
  const [isTestVisible, setIsTestVisible] = useState(true); // State untuk visibilitas elemen <div>
  const [chartTotalHarga, setChartTotalHarga] = useState(0); // State to store total harga for the chart

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
            const totalPrice = data.reduce((acc, curr) => acc + parseFloat(curr.hargaMobil), 0);
            console.log('Total Price:', totalPrice);
            setChartTotalHarga(totalPrice);

          })
          .catch((error) => {
            console.error('Error fetching data penjualan:', error);
          });
      }
    }, [activeTab]);


  // Define your chart data here (modify as needed)
  const chartData = {
    labels: ['Total Harga'],
    datasets: [
      {
        label: 'Total Harga',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [chartTotalHarga],
      },
    ],
  };

  // Define your chart options with scales
  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Specify the type of scale for x-axis (category for labels)
        labels: ['Total Harga'], // Provide labels for the categories
      },
      y: {
        beginAtZero: true, // Adjust as needed
      },
    },
  };

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
        {chartTotalHarga && (
  <Bar data={chartData} options={chartOptions} />
)}

    </div>
  );
}

export default AdminDashboard;
