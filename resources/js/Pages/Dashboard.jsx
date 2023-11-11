import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Dashboard({ auth, isLoading }) {
  const showAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Woot!',
      text: 'I did it!',
    }).then((result) => {
      // Your logic when the user confirms the alert
      if (result.isConfirmed) {
        // Handle confirmation, for example, navigate to another page
        // You can use the Inertia.js `visit` method to navigate to another page
        // Example: visit(route('your.route.name'));
        console.log('User confirmed the alert');
      } else {
        // Handle rejection, for example, do something else
        console.log('User rejected the alert');
      }
    });
  };

  useEffect(() => {
    // Call showAlert when the component mounts
    showAlert();

    // You can also clean up the SweetAlert when the component unmounts
    return () => {
      Swal.close();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
      >
        <Head title="Dashboard" />

        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">You're logged in!</div>
              </div>
            </div>
          </div>
        )}
      </AuthenticatedLayout>
    </div>
  );
}
