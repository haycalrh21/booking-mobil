import React, { useState, useEffect } from 'react';
import { Paginator } from '@/Pages/admin/Paginator'; // Adjust the import path based on your project structure

const DataPenjualan = ({ penjualan }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHarga, setTotalHarga] = useState(0);
  const [previousPage, setPreviousPage] = useState(null);
  const totalPages = Math.ceil(penjualan.length / itemsPerPage);
  const [canGoNext, setCanGoNext] = useState(true);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return penjualan.slice(startIndex, endIndex);
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
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPrice = getCurrentPageData().reduce((acc, curr) => acc + parseFloat(curr.hargaMobil), 0);
    setTotalHarga(totalPrice);
  }, [penjualan, currentPage, itemsPerPage]);

  return (
    <div>
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
