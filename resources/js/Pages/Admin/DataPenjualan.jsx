import React, { useState, useEffect } from 'react';
import { Paginator } from '@/Pages/admin/Paginator';

const DataPenjualan = ({ penjualan,onMonthSelect }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHarga, setTotalHarga] = useState(0);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [canGoNext, setCanGoNext] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');

  const getCurrentPageData = () => {
    const filteredData = selectedMonth
      ? penjualan.filter(data => new Date(data.created_at).getMonth() === parseInt(selectedMonth, 10) - 1)
      : penjualan;

    return filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };

  const calculateTotalPages = () => {
    const filteredData = selectedMonth
      ? penjualan.filter(data => new Date(data.created_at).getMonth() === parseInt(selectedMonth, 10) - 1)
      : penjualan;

    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPreviousPage(currentPage);
      setCurrentPage(newPage);
      setCanGoNext(newPage < totalPages);
    }
  };

  const handleGoBack = () => {
    if (previousPage !== null) {
      setCurrentPage(previousPage);
      setPreviousPage(null);
      setCanGoNext(true);
    }
  };


  useEffect(() => {
    // Calculate total harga for the current page
    const totalPrice = getCurrentPageData().reduce((acc, curr) => acc + parseFloat(curr.hargaMobil), 0);
    setTotalHarga(totalPrice);
  }, [penjualan, currentPage, itemsPerPage, selectedMonth]);

  useEffect(() => {
    // Recalculate total pages when the selected month changes
    calculateTotalPages();
  }, [penjualan, selectedMonth, itemsPerPage]);

  return (
    <div className='bg-gray-800'>
     <label>Pilih Bulan: </label>
    <select onChange={(e) => { setSelectedMonth(e.target.value); onMonthSelect(e.target.value); }} value={selectedMonth}>
        <option value="">Semua Bulan</option>
        <option value="01">Januari</option>
        <option value="02">Februari</option>
        <option value="03">Maret</option>
        <option value="04">April</option>
        <option value="05">Mei</option>
        <option value="06">Juni</option>
        <option value="07">Juli</option>
        <option value="08">Agustus</option>
        <option value="09">September</option>
        <option value="10">Oktober</option>
        <option value="11">November</option>
        <option value="12">Desember</option>
        {/* Tambahkan opsi untuk bulan-bulan lainnya */}
      </select>
      <h2>Data Penjualan</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Booking ID</th>
            <th>Nama Pemesan</th>
            <th>Email</th>
            <th>Kode Mobil</th>
            <th>Harga Mobil</th>
            <th>Tanggal Konfirmasi Penjualan</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.booking_id}</td>
              <td>{data.namaPemesan}</td>
              <td>{data.email}</td>
              <td>{data.kodeMobil}</td>
              <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.hargaMobil)}</td>
              <td>{new Date(data.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display total harga for the current page */}
      <p>Total Harga: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalHarga)}</p>

      {/* Paginator component */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <button onClick={handleGoBack} className="btn p-2 m-3" disabled={previousPage === null}>
        Kembali
      </button>
    </div>
  );
};

export default DataPenjualan;
