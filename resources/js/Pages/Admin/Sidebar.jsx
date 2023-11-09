import React from 'react';
// import { InertiaLink } from '@inertiajs/inertia-react';

export const Sidebar = ({ showDataMobilOnClick }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Buka Sidebar</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
          <li>
            <InertiaLink href={route('datamobil')}>Data Mobil</InertiaLink>
          </li>
          <li><InertiaLink href={route('datapengguna')}>Data Pengguna</InertiaLink></li>
          {/* ... (lainnya) */}
        </ul>
      </div>
    </div>
  );
};
