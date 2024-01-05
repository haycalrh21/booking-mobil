import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import EmployeeForm from '@/Pages/Admin/TambahPegawai';

function Karyawan({ karyawans }) {
  const [updatedPegawais, setUpdatedPegawais] = useState(karyawans || []);
  const [showForm, setShowForm] = useState(false);

  // To update the component when karyawans change
  useEffect(() => {
    setUpdatedPegawais(karyawans);
  }, [karyawans]);

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({
      head: [['Nama', 'Email', 'Role']], // Adjusted column headers
      body: updatedPegawais.map((karyawan) => [
        karyawan.name, // Adjusted field names
        karyawan.email,
        karyawan.role,
      ]),
    });

    pdf.save('data_pegawai.pdf');
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='text-black'>
             <img src="/images/bgputihkebalik.jpg" style={{ minWidth:'100%',maxHeight:'200%', position:'absolute', position:'absolute',zIndex:'-15'}} alt="" />

      <div className="flex flex-col items-center">
        <div className="bg-dark p-4 rounded-lg w-full">
          <h1 className="text-3xl font-semibold text-center" >
            Data Pegawai
          </h1>

          <button onClick={toggleForm} className="btn bg-blue-500 text-white rounded-full hover-button p-2 m-3">
            Tambah Karyawan
          </button>
          <button onClick={downloadPDF} className="btn bg-teal-500 text-white rounded-full hover-button p-2 m-3">
            Download as PDF
          </button>
          <table className="min-w-full table-fixed border border-white">
            <thead>
              <tr>
                <th className="border-b-2 p-2 text-left">Nama</th>
                <th className="border-b-2 p-2 text-left">Email</th>
                <th className="border-b-2 p-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {updatedPegawais.map((karyawan) => (
                <tr key={karyawan.id}>
                  <td className="border-b p-2 text-left">{karyawan.name}</td>
                  <td className="border-b p-2 text-left">{karyawan.email}</td>
                  <td className="border-b p-2 text-left">{karyawan.role}</td>
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
