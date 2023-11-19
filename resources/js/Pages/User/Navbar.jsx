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
      Inertia.reload();
    });
  };

  return (
    <nav className={`pb-5 md:text-sm ${dropdownOpen ? 'text-black text-center' : ''}`} style={{ background: 'linear-gradient(113deg, rgba(1,134,191,1) 30%, rgba(12,100,138,1) 100%)' }}>
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a href="/">
            <img
              className='justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0'
              src="/images/iconBM1.png"
              style={{ marginRight: '1px', paddingLeft: '35px' }}
              width={100}
              height={50}
              alt="BMLOGO"
            />
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

        <div style={{ marginLeft: '-29px', color: '#ffffff' }}>
          <p>BIN MAHMOED MOTOR</p>
        </div>

        <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${dropdownOpen ? 'block' : 'hidden'}`}>
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {auth.user ? (
              <>
                <Link style={{ color: '#ffffff' }} href={linkToHome}>Beranda</Link>
                <Link style={{ color: '#ffffff' }} href={route('datamobillengkap')}>Mobil</Link>
                <Link style={{ color: '#ffffff' }} href={route('bookings')}>Riwayat</Link>
              </>
            ) : (
              <>
                <Link className='inline-flex justify-center absolute right-9 mb-2 w-28 h-8 round-md shadow-lg bg-white ring-2 ring-black ring-opacity-9' style={{ color: '#048853', fontWeight: 900, fontSize: '16px', paddingTop: '5px', theme: '' }} href={route('login')}>MASUK</Link>
                <Link className='inline-flex justify-center absolute right-9 mb-2 w-28 h-8 ' href={route('register')} style={{ color: '#ffffff', fontWeight: 500, fontSize: '16px', paddingTop: '2px', right: '200px' }}>DAFTAR</Link>
              </>
            )}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {auth.user && (
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none"
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {auth.user.name}
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-2 mt-2 w-35 rounded-md shadow-lg bg-white ring-0 ring-opacity-0">
                    <div className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" role="none">
                      <Link href={route('logout')} method="post">Logout</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            {auth.user && <Clock type="digital" className="text-white" />}
          </div>
        </div>
      </div>
    </nav>
  );
};
