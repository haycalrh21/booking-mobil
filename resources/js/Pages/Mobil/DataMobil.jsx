import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from '@inertiajs/react';
import html2pdf from 'html2pdf.js'; // Make sure to import html2pdf.js
import { Paginator } from '@/Pages/admin/Paginator';
import html2canvas from 'html2canvas';
import { InertiaLink } from '@inertiajs/inertia-react';


export function DataMobil({ mobils, pagination }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);
  const totalPages = Math.ceil(mobils.length / itemsPerPage);
  const [canGoNext, setCanGoNext] = useState(true);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mobils.slice(startIndex, endIndex);
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

  const downloadPDF = async () => {
    try {
        const content = document.getElementById('pdf-content');
        const tableContainer = document.getElementById('table-container');

        // Use html2canvas to capture the content as a canvas
        const canvas = await html2canvas(tableContainer);
      // Create a PDF using jsPDF
      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'landscape',
      });

      // Add the canvas as an image to the PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'JPG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      // Save the PDF
      pdf.save('mobil_data.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };


  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return formatter.format(angka);
  };

  useEffect(() => {
    setCurrentPage(1);
    setCanGoNext(mobils.length > itemsPerPage);
  }, [mobils]);

  return (
    <div>
      <div className="flex">

        <div className="bg-gray-800 p-1 rounded-lg w-full flex flex-wrap">
          <div >
            <h1 className="text-3xl font-semibold text-center">
              Data Mobil
            </h1>
            <Link href={route('mobil.create')} className="btn p-2 m-3">
                Create data
              </Link>
              <button onClick={downloadPDF} className="btn p-2 m-3">
                Download as PDF
              </button>
              <div id="table-container">
  <table className="min-w-full" style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
      <tr>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>ID</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Nama</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Brand</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Harga</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>stok</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Tahun</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Pajak</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px', width: '100%' }}>Deskripsi</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Gambar</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Kategori</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(getCurrentPageData()) ? (
        getCurrentPageData().map((mobil) => (
          <tr key={mobil.id}>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.id}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.nama}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.brand}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{formatRupiah(mobil.harga)}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.stok}</td>

            <td className="border text-left" style={{ padding: '10px' }}>{mobil.tahun}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.pajak}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.deskripsi}</td>
            <td className="border text-left" style={{ padding: '10px' }}>
              <div style={{ display: 'flex' }}>
                {mobil.images && mobil.images.length > 0 ? (
                  mobil.images.map((image) => (
                    <img
                      key={image.id}
                      src={`/storage/${image.path}`}
                      alt={mobil.nama}
                      style={{ maxWidth: '50px', maxHeight: '50px' }}
                    />
                  ))
                ) : (
                  <span>No Image</span>
                )}
              </div>
            </td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.kategori}</td>
            <td className="border text-left" style={{ padding: '10px' }}>
              <div className='flex gap-1' >
              <Link href={route('mobil.edit', { id: mobil.id })} className='btn'>Edit</Link>
              <InertiaLink
  href={route('mobil.delete', { id: mobil.id })}
  method="delete"
  as="button"
  className='btn'
>
  Delete
</InertiaLink>


              </div>
            </td>
          </tr>
        ))
      ) : null}
    </tbody>
  </table>
</div>

            {canGoNext && (
                <Paginator
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  canGoNext={canGoNext}
                />
              )}
              <button onClick={handleGoBack} className="btn p-2 m-3" disabled={previousPage === null}>
                Kembali
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataMobil;
