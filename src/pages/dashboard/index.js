import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faMoneyBillWave, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Layout from '@/components/layout';
export default function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState('John Doe'); // Set the current user name here

  const handleLogout = () => {
    // Perform logout actions here, such as clearing session storage or cookies
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <Layout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <div className="flex flex-col items-center justify-center mt-8">
        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center"
            onClick={() => router.push('/partners')}
          >
            <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
            Partners
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center"
            onClick={() => router.push('/subscriptions')}
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Subscriptions
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center"
            onClick={() => router.push('/transactions')}
          >
            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
            Transactions
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center"
            onClick={() => router.push('/users')}
          >
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Users
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
}
