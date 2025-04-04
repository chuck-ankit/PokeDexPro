import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
          currentPage === 1
            ? 'bg-mantis-100 text-mantis-400 cursor-not-allowed'
            : 'bg-mantis-500 text-white hover:bg-mantis-600 transform hover:scale-105'
        }`}
      >
        <svg
          className="w-5 h-5 inline-block mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
            page === currentPage
              ? 'bg-mantis-500 text-white transform scale-110 shadow-lg'
              : 'bg-mantis-100 text-mantis-700 hover:bg-mantis-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
          currentPage === totalPages
            ? 'bg-mantis-100 text-mantis-400 cursor-not-allowed'
            : 'bg-mantis-500 text-white hover:bg-mantis-600 transform hover:scale-105'
        }`}
      >
        Next
        <svg
          className="w-5 h-5 inline-block ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination; 