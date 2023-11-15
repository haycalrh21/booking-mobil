import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Box, Clock, Text } from 'grommet';
import { Kodesamping } from '@/Pages/User/Sidebar';
import { Inertia } from '@inertiajs/inertia-react';

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { auth } = usePage().props;
  const linkToHome = '/';

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest('.menu-btn') && !target.closest('.relative')) {
        setDropdownOpen(false);
      }
    };
  }, []);

  const handleLogout = () => {
    Inertia.post(route('logout').url()).then(() => {
        // Logika yang perlu dijalankan setelah logout berhasil
        // Contoh: Muat ulang halaman atau navigasi ke halaman lain
        Inertia.reload();
      });
  };

  return (
    <nav className={`pb-5 md:text-sm ${dropdownOpen ? 'shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0' : ''}`} style={{ backgroundColor: '#0576A7' }}>
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a href="">
            <img
              src="/images/iconBM1.png"
              style={{ marginRight: '1px', paddingLeft: '35px' }}
              width={100}
              height={50}
              alt="bin mahmud motor"
            />
            <div style={{ textAlign: 'left', paddingLeft: '10px' }}>
              <p>Bin Mahmoed Motors</p>
            </div>
          </a>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {dropdownOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <Kodesamping />
        <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${dropdownOpen ? 'block' : 'hidden'}`}>
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {auth.user ? (
              <>
                <Link href={linkToHome}>Home</Link>
                <Link href={route('datamobillengkap')}>Mobil</Link>
                <Link href={route('bookings')}>Riwayat</Link>
                {/* <Link href={route('booking.store')}>Booking</Link> */}
              </>
            ) : (
              <>
                <Link href={route('login')}>Login</Link>
                <Link href={route('register')}>Register</Link>
              </>
            )}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {auth.user && (
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {auth.user.name}
                  </button>
                </div>
                {dropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="py-1" role="none">
                    <Link href={route('logout')}  method="post" >Logout</Link>

                    </div>
                  </div>
                )}
              </div>
            )}
            <Clock type="digital" />
          </div>
        </div>
      </div>
    </nav>
  );
};
