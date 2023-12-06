import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from '@inertiajs/react';
import html2pdf from 'html2pdf.js'; // Make sure to import html2pdf.js
import { Paginator } from '@/Pages/admin/Paginator';
import html2canvas from 'html2canvas';
import { InertiaLink } from '@inertiajs/inertia-react';


export function DataStok({ mobils, pagination }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGroupBy, setSelectedGroupBy] = useState(''); // Default value
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

  const handleGroupByChange = (event) => {
    setSelectedGroupBy(event.target.value);
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
  console.log(mobils);

console.log();
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
              Data Stok
            </h1>
            {/* <Link href={route('mobil.create')} className="btn p-2 m-3">
                Create data
              </Link> */}
              <button onClick={downloadPDF} className="btn p-2 m-3">
                Download as PDF
              </button>
              <div id="table-container">
  <table className="min-w-full" style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
    <select name="group_by" value={selectedGroupBy} onChange={handleGroupByChange}>
              <option name="group_by" value="nama">Nama</option>
              <option name="group_by" value="tahun">Tahun</option>
              </select>
      <tr>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>ID</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Nama</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Stok</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Brand</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Kategori</th>
        <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Tahun</th>
      </tr>
    </thead>
    <tbody>
  {Array.isArray(getCurrentPageData()) ? (
    getCurrentPageData().map((yearData) => (
      Object.keys(yearData).map((year) => {
        const mobil = yearData[year];
        return (
          <tr>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.id}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.nama}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.stok}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.brand}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.kategori}</td>
            <td className="border text-left" style={{ padding: '10px' }}>{mobil.tahun}</td>
          </tr>
        );
      })
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

export default DataStok;
