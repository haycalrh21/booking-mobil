import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DataPengguna({users,role}) {
  const [updatedUsers, setUpdatedUsers] = useState(users);

console.log(role);

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
    <div >
             <img src="/images/bgputihkebalik.jpg" style={{ minWidth:'100%',maxHeight:'200%', position:'absolute', position:'absolute',zIndex:'-15'}} alt="" />

      <div className="flex">
        <div></div>
        <div className="bg-dark p-4 rounded-lg w-full">
          {/* <div>
            <h1 className="text-3xl font-semibold text-center mt-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-800">
              Data Pengguna
            </h1>
          </div> */}
          <div>
            {role != 'manager' ? null : (
            <button onClick={downloadPDF} className="btn btn-success bg-teal-200  p-2 m-3">
              Download as PDF
            </button>
)}
            <div className="mx-auto text-black " >
              <table className="min-w-full table-fixed border" style={{minHeight:'340px' , textIndent:'20px'  }}>
                <thead>
                  <tr  className='text-left'>
                    <th style={{ border: '1px solid black' }} >Nama</th>
                    <th style={{ border: '1px solid black' }} >Email</th>
                    <th style={{ border: '1px solid black' }} >Role</th>
                  </tr>
                </thead>
                <tbody >
                  {userOnly.map((user) => (
                    <tr key={user.id}>
                      <td style={{ border: '1px solid black' }}>{user.name}</td>
                      <td style={{ border: '1px solid black' }}>{user.email}</td>
                      <td style={{ border: '1px solid black' }}>{user.role}</td>
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
