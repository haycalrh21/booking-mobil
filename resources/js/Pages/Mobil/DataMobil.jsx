import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from '@inertiajs/react';
import html2pdf from 'html2pdf.js'; // Make sure to import html2pdf.js
import { Paginator } from '@/Pages/admin/Paginator';
import html2canvas from 'html2canvas';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Textarea } from '@chakra-ui/react';


export function DataMobil({ mobils, role }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);
  const totalPages = Math.ceil(mobils.length / itemsPerPage);
  const [canGoNext, setCanGoNext] = useState(true);

  console.log(role);
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

//   const downloadPDF = async () => {
//     try {
//         const content = document.getElementById('pdf-content');
//         const tableContainer = document.getElementById('table-container');

//         const canvas = await html2canvas(tableContainer);
//       const pdf = new jsPDF({
//         unit: 'mm',
//         format: 'a4',
//         orientation: 'landscape',
//       });

//       pdf.addImage(canvas.toDataURL('image/png'), 'JPG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

//       pdf.save('mobil_data.pdf');
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

const downloadPDFSemua = () => {
    const pdf = new jsPDF();

    pdf.autoTable({
      head: [['Id', 'Nama', 'Brand', 'Harga', 'Tahun', 'Pajak', 'Deskripsi', 'Kategori']],
      body: mobils.map((mobil) => [
        mobil.id,
        mobil.nama,
        mobil.brand,
        formatRupiah(mobil.harga),
        mobil.tahun,
        mobil.pajak,
        mobil.deskripsi,
        mobil.kategori,
      ]),
    });

    pdf.save(`data_mobil_keseluruhan.pdf`);
  };

 const downloadPDF = (mobil) => {
    const pdf = new jsPDF();

    pdf.autoTable({
      head: [['Id', 'Nama', 'Brand', 'Harga', 'Tahun', 'Pajak', 'Deskripsi', 'Kategori']],
      body: [[
        mobil.id,
        mobil.nama,
        mobil.brand,
        mobil.harga,
        mobil.tahun,
        mobil.pajak,
        mobil.deskripsi,
        mobil.kategori,
      ]],
    });

    pdf.save(`data_mobil$(mobil.id).pdf`);
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
    <div style={{backgroundColor:'transparent'}}>
      <div className="flex" style={{backgroundColor:'',color:'#00000A'}}>
      <img src="/images/bgputihkebalik.jpg" style={{ minWidth:'100%',maxHeight:'200%', position:'absolute', position:'absolute',zIndex:'-15'}} alt="" />

        <div
         className="p-1 rounded-lg w-full flex flex-wrap"
        >
          <div >

            <h1 className="text-3xl font-semibold text-center">


            </h1>
            {role === 'manager' ? null : (
            <Link href={route('mobil.create')} className="btn btn-info glass p-2 m-3">
                Create data
              </Link>
              )}
              <button onClick={downloadPDFSemua} className="btn btn-success glass p-2 m-3">
                Download as PDF
              </button>
              <div id="table-container">
  <table className="min-w-full" style={{ borderCollapse: 'collapse', width: '100%',borderColor:'#00000'  }}>
    <thead>
      <tr>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>ID</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>Nama</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>Brand</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>Harga</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>Tahun</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>Pajak</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px', width:'100%'}}>Deskripsi</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>Gambar</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>Kategori</th>
        <th className="border border-black text-left text-orange-300" style={{ padding: '10px' }}>Aksi</th>

      </tr>
    </thead>
    <tbody>
      {Array.isArray(getCurrentPageData()) ? (
        getCurrentPageData().map((mobil) => (
          <tr key={mobil.id}>
            <td className="border border-black text-left" style={{ padding: '10px' }}>{mobil.id}</td>
            <td className="border border-black text-left" style={{ padding: '10px' }}>{mobil.nama}</td>
            <td className="border border-black text-left" style={{ padding: '10px' }}>{mobil.brand}</td>
            <td className="border border-black text-left" style={{ padding: '10px' }}>{formatRupiah(mobil.harga)}</td>
            <td className="border border-black text-left" style={{ padding: '10px' }}>{mobil.tahun}</td>
            <td className="border border-black text-left" style={{ padding: '10px' }}>{mobil.pajak}</td>
            <Textarea className="border text-left" style={{
            padding: '80px',
            marginBottom:'-8px',
            paddingTop:'50px',
            textAlign: 'left',
            minWidth:'290px',
            minHeight:'20px',
            backgroundColor:'transparent',
             }}>{mobil.deskripsi}</Textarea>
            <td className="border border-black text-left" style={{ padding: '10px' }}>
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
                  <span>Gambar Kosong</span>
                )}
              </div>
            </td>
            <td className="border border-black text-left" style={{ padding: '10px' }}>{mobil.kategori}</td>
            <td className="border border-black text-left" style={{ padding: '10px' }}>
              <div className='flex gap-1' >
                { role === 'manager' ? null : (
              <Link href={route('mobil.edit', { id: mobil.id })} className='btn btn-warning glass'>Edit</Link>
              )}
              { role === 'manager' ? null : (
              <InertiaLink
  href={route('mobil.delete', { id: mobil.id })}
  method="delete"
  as="button"
  className='btn btn-error glass'
>
  Delete
</InertiaLink>
)}
{ role != 'manager' ? null : (
 <div>---</div>
)}
            <button className='btn btn-success glass' onClick={() => downloadPDF(mobil)}>
                      Print
                    </button>

              </div>
            </td>
          </tr>
        ))
      ) : null}
    </tbody>
  </table>
</div>
        <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataMobil;
