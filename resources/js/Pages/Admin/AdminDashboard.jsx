import React, { useState, useEffect } from 'react';
import { Navbar } from '@/Pages/admin/Navbar';
import DataMobil from '@/Pages/Mobil/DataMobil';
import DataPengguna from '@/Pages/Admin/DataPengguna';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState([]);
  const [mobilData, setMobilData] = useState([]);
  const [penggunaData, setPenggunaData] = useState([]);

  const handleTabClick = (tab) => {
    if (tab === activeTab) {
      setActiveTab('');
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (activeTab === 'dataMobil') {
      fetch('/admin/datamobil')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setMobilData(data);
        })
        .catch((error) => {
          console.error('Error fetching data mobil:', error);
        });
    }

    if (activeTab === 'dataPengguna') {
      fetch('/admin/datapengguna')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data pengguna:', data);
          setPenggunaData(data);
        })
        .catch((error) => {
          console.error('Error fetching data pengguna:', error);
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
      </div>
      {activeTab === 'dataMobil' && <DataMobil mobils={mobilData} />}
      {activeTab === 'dataPengguna' && <DataPengguna users={penggunaData} />}
    </div>
  );
}

export default AdminDashboard;
