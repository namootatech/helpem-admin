import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faChartBar,
  faMoneyBillWave,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { HiHome } from 'react-icons/hi';
import Layout from '@/components/layout';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState('John Doe'); // Set the current user name here

  const handleLogout = () => {
    // Perform logout actions here, such as clearing session storage or cookies
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <Layout>
      <div className='flex flex-col items-center justify-start min-h-screen bg-gray-100'>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mt-20">
        <div className='flex flex-col items-center justify-center mt-8'>
          <h1 className='text-3xl font-semibold mb-4'>
            <span className='flex flex-row'>
              <Image
                src='/logo.png'
                alt='Helpem Logo'
                width={50}
                height={50}
                className='mr-3'
              />
               Helpem Admin 
               </span>
            </h1>
          <p>
            Explore the power of your dashboard where you can effortlessly
            manage users, subscriptions, and transactions. Gain insights, make
            decisions, and keep your platform running smoothly. Your control,
            your success
          </p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <button
              className='bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center'
              onClick={() => router.push('/dashboard/partners')}
            >
              <FontAwesomeIcon icon={faUserFriends} className='mr-2' />
              Partners
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center'
              onClick={() => router.push('/dashboard/subscriptions')}
            >
              <FontAwesomeIcon icon={faChartBar} className='mr-2' />
              Subscriptions
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center'
              onClick={() => router.push('/dashboard/transactions')}
            >
              <FontAwesomeIcon icon={faMoneyBillWave} className='mr-2' />
              Transactions
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center'
              onClick={() => router.push('/dashboard/users')}
            >
              <FontAwesomeIcon icon={faUsers} className='mr-2' />
              Users
            </button>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
}
