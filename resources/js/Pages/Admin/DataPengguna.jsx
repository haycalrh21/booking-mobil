import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DataPengguna({ users }) {
  const [updatedUsers, setUpdatedUsers] = useState(users);

  useEffect(() => {
    // Perbarui updatedUsers saat nilai users berubah
    setUpdatedUsers(users);
  }, [users]);

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({
      head: [['Nama', 'Email' , 'Role']],
      body: updatedUsers.map((user) => [user.name, user.email ,user.role]),
    });

    pdf.save('data_pengguna.pdf');
  };

  // Filter users dengan role "user"
  const userOnly = updatedUsers.filter((user) => user.role );

  return (
    <div className='bg-gray-800'>
      <div className="flex">
        <div></div>
        <div className="bg-dark p-4 rounded-lg w-full">
          <div>
            <h1 className="text-3xl font-semibold text-center">
              Data Pengguna
            </h1>
          </div>
          <div>
            <button onClick={downloadPDF} className="btn p-2 m-3">
              Download as PDF
            </button>

            <div className="mx-auto text-center">
              <table className="min-w-full table-fixed border border-white ">
                <thead>
                  <tr>
                    <th className="border-b-2 border-r p-2 text-left">Nama</th>
                    <th className="border-b-2 p-2 text-left">Email</th>
                    <th className="border-b-2 p-2 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {userOnly.map((user) => (
                    <tr key={user.id}>
                      <td className="border-b border-r p-2 text-left">{user.name}</td>
                      <td className="border-b p-2 text-left">{user.email}</td>
                      <td className="border-b p-2 text-left">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataPengguna;
