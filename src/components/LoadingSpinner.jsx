import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-mantis-50 to-white">
      <div className="w-20 h-20 border-4 border-mantis-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-6 text-lg text-mantis-700 font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner; 