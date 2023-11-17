import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DataPengguna({ users }) {
  const [updatedUsers, setUpdatedUsers] = useState(users);



  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({
      head: [['Nama', 'Email']],
      body: updatedUsers.map((user) => [user.name, user.email]),
    });

    pdf.save('data_pengguna.pdf');
  };

  // Filter users dengan role "user"
  const userOnly = updatedUsers.filter((user) => user.role === 'user');

  return (
    <div  className='bg-gray-800'>
      <div className="flex">
        <div className="w-1/6"></div>
        <div className="bg-dark p-4 rounded-lg w-full">
          <div>
            <h1 className="text-2xl font-semibold"> Data Pengguna </h1>
          </div>
          <div>
            <h2></h2>
            <table className="min-w-full table-fixed">
              <thead>
                <tr>
                  <th className="border-b-2 p-2 text-left">Nama</th>
                  <th className="border-b-2 p-2 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {userOnly.map((user) => (
                  <tr key={user.id}>
                    <td className="border-b p-2 text-left">{user.name}</td>
                    <td className="border-b p-2 text-left">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={downloadPDF} className="btn p-2 m-3">
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataPengguna;
