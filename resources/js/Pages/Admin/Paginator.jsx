import React from 'react';

export const Paginator = ({ currentPage, lastPage, onPageChange }) => {

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      onPageChange(newPage);

      // setting url anjing
      const newURL = window.location.pathname + `?page=${newPage}`;
      window.history.pushState({ path: newURL }, '', newURL);
    }
  };

  return (
    <div className="join flex justify-center">
      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        « Sebelumnya
      </button>
      <button className="join-item btn">Page {currentPage}</button>
      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Selanjutnya »
      </button>
    </div>
  );
};

export default Paginator;
