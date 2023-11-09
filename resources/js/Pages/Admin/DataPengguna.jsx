import React, { useState } from 'react';
// import { Navbar } from '@/Pages/admin/Navbar';
// import { Sidebar } from '@/Pages/admin/Sidebar';
// import { Inertia } from '@inertiajs/inertia';

function DataPengguna({ users }) {
  const [updatedUsers, setUpdatedUsers] = useState(users);

  const handleRoleChange = (userId, newRole) => {
    const updatedUserIndex = updatedUsers.findIndex((user) => user.id === userId);
    if (updatedUserIndex !== -1) {
      const updatedUsersCopy = [...updatedUsers];
      updatedUsersCopy[updatedUserIndex].role = newRole;
      setUpdatedUsers(updatedUsersCopy);
    }

    // Hapus permintaan Inertia.put yang membuat refresh halaman
    // Inertia.put(`/change-role/${userId}`, { newRole });
  };



  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex">
        <div className="w-1/6">
          {/* <Sidebar /> */}
        </div>
        <div className="bg-dark p-4 rounded-lg w-full">
          <div className="">
            <h1 className="text-2xl font-semibold">Selamat datang di Data Pengguna</h1>
          </div>
          <section>
            <div>
              <h2>Data Pengguna</h2>
              <table className="min-w-full table-fixed">
                <thead>
                  <tr>
                    <th className="border-b-2 p-2 text-left">Nama</th>
                    <th className="border-b-2 p-2 text-left">Email</th>
                    <th className="border-b-2 p-2 text-left">Role</th>
                    <th className="border-b-2 p-2 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                {updatedUsers && updatedUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="border-b p-2 text-left">{user.name}</td>
                      <td className="border-b p-2 text-left">{user.email}</td>
                      <td className="border-b p-2 text-left">{user.role}</td>
                      <td className="border-b p-2 text-left">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="admin">admin</option>
                          <option value="user">user</option>
                           <option value="supervisor">supervisor</option>
                          <option value="manager">manager</option>
                        </select>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DataPengguna;
