import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import EmployeeForm from '@/Pages/Admin/TambahPegawai';

function Karyawan({ karyawans }) {
  const [updatedPegawais, setUpdatedPegawais] = useState(karyawans || []);
  const [showForm, setShowForm] = useState(false);

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({
      head: [['Nama', 'Jabatan', 'No. HP', 'Alamat', 'Tanggal Lahir']],
      body: updatedPegawais.map((karyawan) => [
        karyawan.nama,
        karyawan.jabatan,
        karyawan.nohp,
        karyawan.alamat,
        karyawan.tanggal_lahir,
      ]),
    });

    pdf.save('data_pegawai.pdf');
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='bg-gray-800'>
      <div className="flex flex-col items-center">

        <div className="bg-dark p-4 rounded-lg w-full">
        <h1 className="text-3xl font-semibold text-center" style={{ marginTop:'10px' }}>
              Data Pegawai

            </h1>

          <button onClick={toggleForm} className="btn p-2 m-3">
          Tambah Karyawan
        </button>
        <button onClick={downloadPDF} className="btn p-2 m-3">
            Download as PDF
          </button>
          <table className="min-w-full table-fixed border border-white">
            <thead>
              <tr>
                <th className="border-b-2 p-2 text-left">Nama</th>
                <th className="border-b-2 p-2 text-left">Jabatan</th>
                <th className="border-b-2 p-2 text-left">No. HP</th>
                <th className="border-b-2 p-2 text-left">Alamat</th>
                <th className="border-b-2 p-2 text-left">Tanggal Lahir</th>
              </tr>
            </thead>
            <tbody>
              {updatedPegawais.map((karyawan) => (
                <tr key={karyawan.id}>
                  <td className="border-b p-2 text-left">{karyawan.nama}</td>
                  <td className="border-b p-2 text-left">{karyawan.jabatan}</td>
                  <td className="border-b p-2 text-left">{karyawan.nohp}</td>
                  <td className="border-b p-2 text-left">{karyawan.alamat}</td>
                  <td className="border-b p-2 text-left">{karyawan.tanggal_lahir}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        {showForm && <EmployeeForm />}
      </div>
    </div>
  );
}

export default Karyawan;
