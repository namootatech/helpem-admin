import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className='mr-2'>Loading...</span>
      <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.64a4.001 4.001 0 00-4 4h3.64zm5.052-.312A7.962 7.962 0 0119.528 12H16v4a8 8 0 01-8-8h4a4 4 0 004 4z"></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
