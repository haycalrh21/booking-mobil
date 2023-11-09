import React from 'react';

export const Tab = ({
  showDataMobil,
  showDataPengguna,
  toggleDataMobil,
  toggleDataPengguna,
}) => {
  return (
    <div className="tabs">
      <a className={`tab tab-bordered ${showDataMobil ? 'tab-active' : ''}`} onClick={toggleDataMobil}>
        Data Mobil
      </a>
      <a className={`tab tab-bordered ${showDataPengguna ? 'tab-active' : ''}`} onClick={toggleDataPengguna}>
        Data Pengguna
      </a>
    </div>
  );
};
