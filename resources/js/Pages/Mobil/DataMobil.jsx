import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from '@inertiajs/react';
import { Paginator } from '@/Pages/admin/Paginator';

export function DataMobil({ mobils, pagination }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [previousPage, setPreviousPage] = useState(null); // Tambahkan state previousPage
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
    const pdf = new jsPDF();
    const columns = ['ID', 'Nama', 'Brand', 'Harga', 'Tahun', 'Pajak', 'Deskripsi', 'Gambar', 'Kategori'];

    const data = getCurrentPageData().map(async (mobil) => {
      const rowData = [
        mobil.id,
        mobil.nama,
        mobil.brand,
        mobil.harga,
        mobil.tahun,
        mobil.pajak,
        mobil.deskripsi,
        'No Image',
        mobil.kategori,
      ];

      if (mobil.images && mobil.images.length > 0) {
        const maxImagesToShow = 1; // Jumlah maksimal gambar yang ingin ditampilkan
        const imagesToShow = mobil.images.slice(0, maxImagesToShow);

        const imgDataPromises = imagesToShow.map((image) => {
          const imgPath = `/storage/${image.path}`;
          return getImageFromUrl(imgPath);
        });

        const imgDatas = await Promise.all(imgDataPromises);

        rowData[7] = imgDatas.map((img, index) => {
          const imgHeight = 5; // Sesuaikan tinggi gambar sesuai kebutuhan
          const imgWidth = (img.width * imgHeight) / img.height;
          pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight, 'FAST');
          return { width: imgWidth, height: imgHeight };
        });
      }

      return rowData;
    });

    const tableData = await Promise.all(data);

    pdf.autoTable({
      head: [columns],
      body: tableData,
      didDrawCell: (data) => {
        if (data.column.dataKey === 'Gambar' && Array.isArray(data.cell.raw)) {
          const cellHeight = data.cell.height;
          const imgDataArray = data.cell.raw;

          imgDataArray.forEach((imgData, index) => {
            const imgHeight = imgData.height;
            const imgWidth = imgData.width;

            // Tentukan posisi X dan Y agar gambar berada di tengah sel
            const x = data.cell.x + data.cell.padding('horizontal') + (data.cell.width - imgWidth) / 2;
            const y = data.cell.y + data.cell.padding('vertical') + (cellHeight - imgHeight) / 2;

            pdf.addImage(imgData, x, y, imgWidth, imgHeight);
          });
        }
      },
    });

    pdf.save('mobil_data.pdf');
  };

  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return formatter.format(angka);
  };

  const getImageFromUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
    });
  };

  useEffect(() => {
    setCurrentPage(1);
    setCanGoNext(mobils.length > itemsPerPage); // Set canGoNext berdasarkan apakah masih ada data yang bisa ke halaman berikutnya
  }, [mobils]);

  return (
    <div>
      <div className="flex">
        <div className="w-1/1"></div>
        <div className="bg-gray-800 p-8 rounded-lg w-full flex flex-wrap">
          <div className="w-full md:container md:mx-auto">
            <h1 className="text-3xl font-semibold">
              Data Mobil{' '}
              <Link href={route('mobil.create')} className="btn p-2 m-3">
                Create data
              </Link>
              <button onClick={downloadPDF} className="btn p-2 m-3">
                Download as PDF
              </button>
            </h1>
            <div>
              <table className="" style={{ marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th className="border text-left text-orange-300" style={{ padding: '10px' }}>ID</th>
                    <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Nama</th>
                    <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Brand</th>
                    <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Harga</th>
                    <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Tahun</th>
                    <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Pajak</th>
                    <th className="border text-left text-orange-300" style={{ padding: '10px',  width: '500px', }}>Deskripsi</th>
                    <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Gambar</th>
                    <th className="border text-left text-orange-300" style={{ padding: '10px' }}>Kategori</th>
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
                        <td className="border text-left" style={{ padding: '10px' }}>{mobil.tahun}</td>
                        <td className="border text-left" style={{ padding: '10px' }}>{mobil.pajak}</td>
                        <td className="border text-left" style={{ padding: '10px'  }}>
  {mobil.deskripsi}
</td>

                        <td className="border text-left" style={{ padding: '10px' }}>
                          <div style={{ display: 'flex' }}>
                            {mobil.images && mobil.images.length > 0 ? (
                              mobil.images.map((image) => (
                                <img
                                  key={image.id}
                                  src={`/storage/${image.path}`}
                                  alt={mobil.nama}
                                  style={{ maxWidth: '150px', maxHeight: '100px' }}
                                />
                              ))
                            ) : (
                              <span>No Image</span>
                            )}
                          </div>
                        </td>
                        <td className="border text-left" style={{ padding: '10px' }}>{mobil.kategori}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border text-left" colSpan="8">
                        Tidak ada data yang ditemukan
                      </td>
                    </tr>
                  )}
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
