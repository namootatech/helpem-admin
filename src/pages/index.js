import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { IoMdHelpCircle } from 'react-icons/io';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [fontName, setFontName] = useState('');

  const handleFontLoad = () => {
    setFontName('poppins');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h1 className={`text-4xl mb-8`}>Helpem</h1>
        <p className='text-gray-600 mb-4'>
          Helpem is a platform that connects people who want to help with those
          who need help. We believe that everyone has something to offer, and
          that everyone can benefit from the help of others. Whether you're
          looking to volunteer, donate, or simply lend a helping hand, Helpem is
          here to help you make a difference.
        </p>
        <div className='flex space-x-4'>
          <Link
            href='/register'
            className='flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
          >
            <FontAwesomeIcon icon={faUserPlus} className='mr-2' />
            Register
          </Link>
          <Link
            href='/login'
            className='flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
          >
            <FontAwesomeIcon icon={faSignInAlt} className='mr-2' />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
