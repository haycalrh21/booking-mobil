
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/Pages/admin/Navbar';
import DataMobil from '@/Pages/Mobil/DataMobil';
import DataPengguna from '@/Pages/Admin/DataPengguna';
import DataBooking from '@/Pages/Admin/DataBooking';
import DataPembelian from '@/Pages/Admin/Databeli';
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
  const [pembelianData, setPembelianData] = useState([]);
  const [isTestVisible, setIsTestVisible] = useState(true); // State untuk visibilitas elemen <div>
  const [chartTotalHarga, setChartTotalHarga] = useState(0); // State to store total harga for the chart
  const [monthlyTotalData, setMonthlyTotalData] = useState([]);
  const [chartTotalPembelian, setChartTotalPembelian] = useState(0); // State untuk menyimpan total pembelian
  const [monthlyTotalPembelianData, setMonthlyTotalPembelianData] = useState([]);


  const handleTabClick = (tab) => {
    if (tab === activeTab) {
      setActiveTab('');
      setIsTestVisible(true); // Menampilkan kembali elemen <div> ketika tab ditutup
    } else {
      setActiveTab(tab);
      setIsTestVisible(false); // Menyembunyikan elemen <div> ketika tab diklik
    }
  };

  const fetchData = (url, setDataCallback, processDataCallback) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataCallback(data);
        processDataCallback(data);
      })
      .catch((error) => {
        console.error(`Error fetching data from ${url}:`, error);
      });
  };

  const processPembelianData = (data) => {
    const totalPembelianData = {};
    for (let month = 1; month <= 12; month++) {
      totalPembelianData[month] = data
        .filter((item) => new Date(item.created_at).getMonth() + 1 === month)
        .reduce((acc, curr) => acc + parseFloat(curr.harga), 0);
    }
    setMonthlyTotalPembelianData(totalPembelianData);
    setChartTotalPembelian(Object.values(totalPembelianData).reduce((acc, curr) => acc + curr, 0));
  };

  const processPenjualanData = (data) => {
    const totalData = {};
    for (let month = 1; month <= 12; month++) {
      totalData[month] = data
        .filter((item) => new Date(item.created_at).getMonth() + 1 === month)
        .reduce((acc, curr) => acc + parseFloat(curr.hargaMobil), 0);
    }
    setMonthlyTotalData(totalData);
    setChartTotalHarga(Object.values(totalData).reduce((acc, curr) => acc + curr, 0));
  };

  useEffect(() => {
    if (activeTab === 'dataMobil') {
      fetchData('/admin/datamobil', setMobilData, () => {});
    } else if (activeTab === 'dataPengguna') {
      fetchData('/admin/datapengguna', setPenggunaData, () => {});
    } else if (activeTab === 'dataBooking') {
      fetchData('/admin/databooking', setBookingData, () => {});
    } else if (activeTab === 'dataPegawai') {
      fetchData('/admin/datapegawai', setKaryawanData, () => {});
    } else if (activeTab === 'dataPembelian') {
      fetchData('/admin/datapembelian', setPembelianData, processPembelianData);
    } else if (activeTab === 'dataPenjualan') {
      fetchData('/admin/datapenjualan', setPenjualanData, processPenjualanData);
    }
  }, [activeTab]);


  useEffect(() => {
    // Fetch data penjualan tanpa harus menunggu tab di klik
    fetch('/admin/datapenjualan')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data Penjualan:', data);
        setPenjualanData(data);

        const totalData = {};

        // Mengumpulkan total harga untuk setiap bulan
        for (let month = 1; month <= 12; month++) {
          totalData[month] = data
            .filter((item) => new Date(item.created_at).getMonth() + 1 === month)
            .reduce((acc, curr) => acc + parseFloat(curr.hargaMobil), 0);
        }

        console.log('Total Data:', totalData);
        setMonthlyTotalData(totalData);
        setChartTotalHarga(Object.values(totalData).reduce((acc, curr) => acc + curr, 0));
      })
      .catch((error) => {
        console.error('Error fetching data penjualan:', error);
      });

    // Fetch data pembelian
    fetch('/admin/datapembelian')
      .then((response) => response.json())
      .then((data) => {
        setPembelianData(data);

        const totalPembelianData = {};

        // Mengumpulkan total harga pembelian untuk setiap bulan
        for (let month = 1; month <= 12; month++) {
          totalPembelianData[month] = data
            .filter((item) => new Date(item.created_at).getMonth() + 1 === month)
            .reduce((acc, curr) => acc + parseFloat(curr.harga), 0);
        }

        setMonthlyTotalPembelianData(totalPembelianData);
        setChartTotalPembelian(Object.values(totalPembelianData).reduce((acc, curr) => acc + curr, 0));
      })
      .catch((error) => {
        console.error('Error fetching data pembelian:', error);
      });
  }, []); // Empty dependency array to run the effect only once



      const chartColors = [
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 159, 64, 0.4)',
        'rgba(255, 205, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(201, 203, 207, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 159, 64, 0.4)',
        'rgba(255, 205, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(54, 162, 235, 0.4)',
      ];




  // Define your chart data here (modify as needed)
  const chartData = {
    labels: Array.from({ length: 12 }, (_, index) => index + 1).map((month) => {
      return new Date(2022, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
    }),
    datasets: [
      {
        label: 'Total Penjualan',
        backgroundColor: chartColors,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(monthlyTotalData),
      },
    ],
  };

  const chartDataPembelian = {
    labels: Array.from({ length: 12 }, (_, index) => index + 1).map((month) => {
      return new Date(2022, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
    }),
    datasets: [
      {
        label: 'Total Pembelian',
        backgroundColor: chartColors,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(monthlyTotalPembelianData),
      },
    ],
  };


  // Define your chart options with scales
  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        labels: Array.from({ length: 12 }, (_, index) => index + 1).map((month) => {
          // Menyusun label dengan nama bulan (1-12)
          return new Date(2022, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
        }),
        ticks: {
          fontSize: 20,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    barThickness: 50,
    categorySpacing: 5,
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
        <a
          className={`tab tab-bordered ${activeTab === 'dataPembelian' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('dataPembelian')}
        >
          Data Pembelian
        </a>
      </div>
      {activeTab === 'dataMobil' && <DataMobil mobils={mobilData} />}
      {activeTab === 'dataPengguna' && <DataPengguna users={penggunaData} />}
      {activeTab === 'dataBooking' && <DataBooking bookings={bookingData} />}
      {activeTab === 'dataPegawai' && <Karyawan karyawans={karyawanData} />}
      {activeTab === 'dataPenjualan' && <DataPenjualan penjualan={penjualanData} />}
      {activeTab === 'dataPembelian' && <DataPembelian pembelians={pembelianData} />}

      {isTestVisible && <div>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Selamat Datang Di Dashboard Admin
    </h1>

   <b><h1 style={{ textAlign:'center' }}> Chart Penjualan Dan Pembelian Mobil</h1></b>
    <div style={{ display: 'flex' }}>
  {chartTotalHarga && (
    <div style={{ width: '50%', height: 'auto' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )}

  {chartTotalPembelian && (
    <div style={{ width: '50%', height: 'auto' }}>
      <Bar data={chartDataPembelian} options={chartOptions} />
    </div>
  )}
</div>

        </div>}



    </div>
  );
}

export default AdminDashboard;
